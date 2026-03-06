import OpenAI from "openai";
import type { ManagementPlan, CropStageType, SoilData } from "@/types/farming";
import { fetchWeatherAlerts } from "@/lib/weatherService";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
    dangerouslyAllowBrowser: true,
});

interface PlanInput {
    cropName: string;
    plantationDate: string;
    soilData: SoilData;
    irrigationMethod: string;
    farmSize: number;
    sizeUnit: string;
    location?: string;  // farm location for live weather
}

export async function generateManagementPlan(input: PlanInput): Promise<ManagementPlan> {
    const plantDate = new Date(input.plantationDate);

    const prompt = `You are an expert agricultural advisor. Generate a detailed crop management plan for a farmer.

Crop: ${input.cropName}
Plantation Date: ${input.plantationDate}
Soil Type: ${input.soilData.type}
Soil NPK: N=${input.soilData.nitrogen} kg/ha, P=${input.soilData.phosphorus} kg/ha, K=${input.soilData.potassium} kg/ha
Soil pH: ${input.soilData.ph}
Water Holding Capacity: ${input.soilData.waterHoldingCapacity}
Irrigation Method: ${input.irrigationMethod}
Farm Size: ${input.farmSize} ${input.sizeUnit}

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "stages": [
    { "type": "germination", "daysFromPlanting": 0, "durationDays": 14, "progress": 0 },
    { "type": "seedling", "daysFromPlanting": 14, "durationDays": 21, "progress": 0 },
    { "type": "vegetative", "daysFromPlanting": 35, "durationDays": 40, "progress": 0 },
    { "type": "flowering", "daysFromPlanting": 75, "durationDays": 20, "progress": 0 },
    { "type": "maturity", "daysFromPlanting": 95, "durationDays": 25, "progress": 0 },
    { "type": "harvest", "daysFromPlanting": 120, "durationDays": 10, "progress": 0 }
  ],
  "irrigationPlans": [
    { "stage": "germination", "frequency": "Every 3-4 days", "quantityPerHectare": "30-40 mm", "notes": ["Note 1", "Note 2"] }
  ],
  "fertilizerPlans": [
    {
      "stage": "germination",
      "fertilizerType": "Di-ammonium Phosphate (DAP)",
      "brand": "IFFCO DAP",
      "npkRatio": "18-46-0",
      "quantity": "100 kg/ha",
      "applicationMethod": "Basal soil incorporation",
      "timing": "1-2 days before sowing",
      "guidelines": [
        "Broadcast evenly on ploughed field before final harrowing",
        "Incorporate into top 10-15 cm of soil using cultivator",
        "Irrigate lightly within 24 hours to activate nutrients"
      ],
      "precautions": [
        "Do not mix with urea - apply separately with 3-4 day gap",
        "Store in dry place to prevent caking"
      ]
    }
  ],
  "weatherAlerts": [],
  "expectedYield": { "min": 3.0, "max": 5.0, "unit": "tonnes" },
  "generalRecommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
}

CRITICAL FERTILIZER RULES:
1. Use REAL Indian fertilizer brands: IFFCO, Coromandel, Tata Chemicals, NFL, Chambal Fertilisers, Narmada, GSFC, Zuari Agro, PPL.
2. Every fertilizerPlan MUST include: brand, npkRatio, guidelines (3-4 steps), precautions (2-3 tips).
3. Adjust quantities based on soil NPK: N=${input.soilData.nitrogen} kg/ha, P=${input.soilData.phosphorus} kg/ha, K=${input.soilData.potassium} kg/ha.
4. Provide fertilizer plans for at least 4 growth stages.
5. Include irrigation plans for at least 4 stages. Provide 4-5 specific recommendations for ${input.cropName} on ${input.soilData.type} soil.`;

    try {
        const [response, weatherAlerts] = await Promise.all([
            openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3,
                max_tokens: 2000,
            }),
            input.location ? fetchWeatherAlerts(input.location) : Promise.resolve([]),
        ]);

        const content = response.choices[0]?.message?.content ?? "";
        const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(jsonStr);

        const plan = buildPlanFromParsed(parsed, plantDate, input.cropName);
        // Prefer live weather alerts if we got any; otherwise keep AI-generated ones
        if (weatherAlerts.length > 0) {
            plan.weatherAlerts = weatherAlerts;
        }
        return plan;
    } catch (err) {
        console.error("AI plan generation failed, using fallback plan:", err);
        const fallback = buildFallbackPlan(input.cropName, plantDate);
        if (input.location) {
            fallback.weatherAlerts = await fetchWeatherAlerts(input.location).catch(() => []);
        }
        return fallback;
    }
}

function buildPlanFromParsed(parsed: any, plantDate: Date, cropId: string): ManagementPlan {
    const today = new Date();

    const stages = (parsed.stages ?? []).map((s: any) => {
        const startDate = addDays(plantDate, s.daysFromPlanting);
        const endDate = addDays(startDate, s.durationDays);
        const totalDuration = s.durationDays;
        const elapsedDays = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / 86400000));
        const progress = Math.min(100, Math.round((elapsedDays / totalDuration) * 100));
        const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / 86400000));

        return {
            type: s.type as CropStageType,
            startDate,
            endDate,
            progress,
            daysRemaining,
        };
    });

    return {
        cropId,
        stages,
        irrigationPlans: parsed.irrigationPlans ?? [],
        fertilizerPlans: parsed.fertilizerPlans ?? [],
        weatherAlerts: parsed.weatherAlerts ?? [],
        expectedYield: parsed.expectedYield ?? { min: 2, max: 4, unit: "tonnes" },
        generalRecommendations: parsed.generalRecommendations ?? [],
    };
}

function buildFallbackPlan(cropName: string, plantDate: Date): ManagementPlan {
    const today = new Date();

    const stageConfig: { type: CropStageType; start: number; duration: number }[] = [
        { type: "germination", start: 0, duration: 14 },
        { type: "vegetative", start: 14, duration: 40 },
        { type: "flowering", start: 54, duration: 20 },
        { type: "maturity", start: 74, duration: 30 },
        { type: "harvest", start: 104, duration: 14 },
    ];

    const stages = stageConfig.map(({ type, start, duration }) => {
        const startDate = addDays(plantDate, start);
        const endDate = addDays(startDate, duration);
        const elapsed = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / 86400000));
        const progress = Math.min(100, Math.round((elapsed / duration) * 100));
        const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / 86400000));
        return { type, startDate, endDate, progress, daysRemaining };
    });

    return {
        cropId: cropName,
        stages,
        irrigationPlans: [
            {
                stage: "germination",
                frequency: "Every 3–4 days",
                quantityPerHectare: "30–40 mm",
                notes: ["Keep soil moist", "Avoid waterlogging"],
            },
            {
                stage: "vegetative",
                frequency: "Every 7–10 days",
                quantityPerHectare: "50–60 mm",
                notes: ["Increase water as plant grows", "Early morning irrigation preferred"],
            },
            {
                stage: "flowering",
                frequency: "Every 5–7 days",
                quantityPerHectare: "60–70 mm",
                notes: ["Critical stage — maintain adequate moisture"],
            },
        ],
        fertilizerPlans: [
            {
                stage: "germination",
                fertilizerType: "Di-ammonium Phosphate (DAP)",
                brand: "IFFCO DAP",
                npkRatio: "18-46-0",
                quantity: "100 kg/ha",
                applicationMethod: "Basal soil incorporation before sowing",
                timing: "1–2 days before sowing",
                guidelines: [
                    "Broadcast evenly on the ploughed field before final harrowing",
                    "Incorporate into the top 10–15 cm of soil using a cultivator or rotavator",
                    "Irrigate lightly (20–25 mm) within 24 hours to activate nutrient release",
                ],
                precautions: [
                    "Never mix directly with urea — apply with a 3–4 day gap between them",
                    "Store in a dry, cool place to prevent caking and potency loss",
                ],
            },
            {
                stage: "vegetative",
                fertilizerType: "Urea (Nitrogenous fertilizer)",
                brand: "NFL Urea (Nangal)",
                npkRatio: "46-0-0",
                quantity: "65 kg/ha",
                applicationMethod: "Top dressing — broadcast between rows",
                timing: "21–25 days after sowing",
                guidelines: [
                    "Split into two applications: 35 kg/ha at 21 days and 30 kg/ha at 40 days after sowing",
                    "Broadcast between plant rows, keeping it away from direct stem contact",
                    "Lightly incorporate with a hoe and irrigate within 12 hours of application",
                    "Apply in early morning or evening to minimize ammonia volatilization",
                ],
                precautions: [
                    "Never apply to waterlogged soil — risk of nitrogen loss through denitrification",
                    "Do not exceed the recommended dose; over-application causes lodging in cereal crops",
                    "Wear gloves and a mask when handling bulk quantities",
                ],
            },
            {
                stage: "flowering",
                fertilizerType: "Muriate of Potash (MOP)",
                brand: "Coromandel MOP",
                npkRatio: "0-0-60",
                quantity: "40 kg/ha",
                applicationMethod: "Soil application at root zone or diluted foliar spray",
                timing: "At initiation of flowering / boot stage",
                guidelines: [
                    "For soil: broadcast at root zone and immediately water in with 25 mm irrigation",
                    "For foliar: dissolve 5 kg MOP in 200 litres water, spray on leaves in early morning",
                    "Repeat foliar spray after 10 days if potassium deficiency signs (yellowish leaf margins) persist",
                ],
                precautions: [
                    "Do not spray during midday — high temperature causes leaf scorch",
                    "Keep away from eyes and skin during handling; rinse immediately with water if contact occurs",
                ],
            },
        ],
        weatherAlerts: [],
        expectedYield: { min: 2.5, max: 4.5, unit: "tonnes" },
        generalRecommendations: [
            "Monitor for pests and diseases weekly",
            "Maintain field drainage to prevent waterlogging",
            "Scout for weeds and control early",
            "Apply foliar micronutrients if deficiency symptoms appear",
        ],
    };
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
