import type { Farm, Crop, ManagementPlan, CropStage, IrrigationPlan, FertilizerPlan, WeatherAlert } from "@/types/farming";

// Helper to calculate days between dates
const daysBetween = (date1: Date, date2: Date) => {
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
};

export const mockWheatStage: CropStage = {
  type: "vegetative",
  startDate: new Date("2025-01-15"),
  endDate: new Date("2025-02-28"),
  progress: 65,
  daysRemaining: 12,
};

export const mockRiceStage: CropStage = {
  type: "seedling",
  startDate: new Date("2025-01-20"),
  endDate: new Date("2025-02-15"),
  progress: 80,
  daysRemaining: 5,
};

export const mockWheatIrrigationPlans: IrrigationPlan[] = [
  {
    stage: "germination",
    frequency: "Every 3-4 days",
    quantityPerHectare: "30-40 mm",
    notes: [
      "Keep soil consistently moist but not waterlogged",
      "Light, frequent irrigation is better than heavy watering",
    ],
  },
  {
    stage: "vegetative",
    frequency: "Every 7-10 days",
    quantityPerHectare: "50-60 mm",
    notes: [
      "Increase water as tillering begins",
      "Monitor for signs of water stress (leaf rolling)",
      "Early morning irrigation reduces evaporation losses",
    ],
  },
  {
    stage: "flowering",
    frequency: "Every 5-7 days",
    quantityPerHectare: "60-70 mm",
    notes: [
      "Critical stage - maintain adequate moisture",
      "Water stress now will reduce grain formation",
    ],
  },
];

export const mockWheatFertilizerPlans: FertilizerPlan[] = [
  {
    stage: "germination",
    fertilizerType: "DAP (18-46-0)",
    quantity: "100 kg/ha",
    applicationMethod: "Basal application before sowing",
    timing: "At sowing",
  },
  {
    stage: "vegetative",
    fertilizerType: "Urea (46-0-0)",
    quantity: "65 kg/ha",
    applicationMethod: "Top dressing",
    timing: "21-25 days after sowing",
  },
  {
    stage: "flowering",
    fertilizerType: "Urea (46-0-0)",
    quantity: "40 kg/ha",
    applicationMethod: "Foliar spray or top dressing",
    timing: "At boot stage",
  },
];

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    type: "frost",
    severity: "medium",
    message: "Light frost expected in your region next week. Young wheat crops may be affected.",
    preventiveMeasures: [
      "Apply light irrigation in the evening before frost",
      "Avoid nitrogen application during frost period",
      "Consider using frost covers for vulnerable areas",
    ],
  },
];

export const mockWheatManagementPlan: ManagementPlan = {
  cropId: "wheat-1",
  stages: [
    { type: "germination", startDate: new Date("2025-01-01"), endDate: new Date("2025-01-14"), progress: 100, daysRemaining: 0 },
    { type: "vegetative", startDate: new Date("2025-01-15"), endDate: new Date("2025-02-28"), progress: 65, daysRemaining: 12 },
    { type: "flowering", startDate: new Date("2025-03-01"), endDate: new Date("2025-03-20"), progress: 0, daysRemaining: 35 },
    { type: "maturity", startDate: new Date("2025-03-21"), endDate: new Date("2025-04-15"), progress: 0, daysRemaining: 60 },
    { type: "harvest", startDate: new Date("2025-04-16"), endDate: new Date("2025-04-30"), progress: 0, daysRemaining: 75 },
  ],
  irrigationPlans: mockWheatIrrigationPlans,
  fertilizerPlans: mockWheatFertilizerPlans,
  weatherAlerts: mockWeatherAlerts,
  expectedYield: {
    min: 3.5,
    max: 5.0,
    unit: "tonnes",
  },
  generalRecommendations: [
    "Monitor for aphids and rust disease during vegetative stage",
    "Maintain field drainage to prevent waterlogging",
    "Scout for weeds weekly and control early",
    "Apply foliar micronutrients (Zn, Fe) if deficiency symptoms appear",
  ],
};

export const mockFarm: Farm = {
  id: "farm-1",
  name: "Green Valley Farm",
  location: {
    lat: 18.5204,
    lng: 73.8567,
    address: "pune, maharashtra",
    region: "Western India",
  },
  size: 5,
  sizeUnit: "hectares",
  irrigationMethod: "flood",
  crops: [
    {
      id: "wheat-1",
      name: "Wheat",
      plantationDate: new Date("2025-01-01"),
      farmId: "farm-1",
      soilData: {
        type: "loamy",
        nitrogen: 45,
        phosphorus: 25,
        potassium: 35,
        ph: 7.2,
        waterHoldingCapacity: "medium",
      },
      currentStage: mockWheatStage,
      managementPlan: mockWheatManagementPlan,
    },
    {
      id: "rice-1",
      name: "Rice (Paddy)",
      plantationDate: new Date("2025-01-20"),
      farmId: "farm-1",
      soilData: {
        type: "clay",
        nitrogen: 55,
        phosphorus: 30,
        potassium: 40,
        ph: 6.5,
        waterHoldingCapacity: "high",
      },
      currentStage: mockRiceStage,
    },
  ],
};

export const mockCropRecommendations = [
  {
    cropName: "Wheat",
    suitabilityScore: 92,
    reasons: [
      "Ideal soil pH range (6.5-7.5) matches your soil",
      "Loamy soil provides good drainage and nutrients",
      "Region has suitable winter temperatures",
    ],
    expectedYield: { min: 3.5, max: 5.0, unit: "tonnes/ha" },
    waterRequirements: "medium" as const,
    nutrientRequirements: "NPK balanced with emphasis on nitrogen",
  },
  {
    cropName: "Mustard",
    suitabilityScore: 88,
    reasons: [
      "Well-suited to semi-arid conditions",
      "Low water requirement matches your irrigation capacity",
      "Good market demand in the region",
    ],
    expectedYield: { min: 1.2, max: 1.8, unit: "tonnes/ha" },
    waterRequirements: "low" as const,
    nutrientRequirements: "Moderate nitrogen, high sulfur",
  },
  {
    cropName: "Chickpea",
    suitabilityScore: 85,
    reasons: [
      "Nitrogen-fixing legume improves soil health",
      "Tolerant to your soil conditions",
      "Good rotation crop after rice",
    ],
    expectedYield: { min: 1.5, max: 2.2, unit: "tonnes/ha" },
    waterRequirements: "low" as const,
    nutrientRequirements: "Low nitrogen (fixes own), moderate P and K",
  },
];
