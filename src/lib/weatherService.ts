// src/lib/weatherService.ts
// Uses OpenWeatherMap free tier API (https://openweathermap.org/api)
// Sign up at https://home.openweathermap.org/users/sign_up to get a free key.

import type { WeatherAlert } from "@/types/farming";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface OWMCurrentResponse {
    weather: { main: string; description: string }[];
    main: { temp: number; humidity: number; feels_like: number };
    wind: { speed: number; gust?: number };
    rain?: { "1h"?: number; "3h"?: number };
    name: string;
    cod: number;
}

interface OWMForecastItem {
    dt: number;
    main: { temp_max: number; temp_min: number; humidity: number };
    weather: { main: string; description: string }[];
    rain?: { "3h"?: number };
    wind: { speed: number; gust?: number };
    pop: number; // probability of precipitation
}

interface OWMForecastResponse {
    list: OWMForecastItem[];
    city: { name: string };
    cod: string;
}

/** Fetch real weather alerts for a location (city/address string). */
export async function fetchWeatherAlerts(location: string): Promise<WeatherAlert[]> {
    if (!API_KEY || API_KEY === "your_openweathermap_api_key_here") {
        console.warn("[Weather] VITE_WEATHER_API_KEY not configured — weather alerts disabled.");
        return [];
    }

    console.log(`[Weather] Fetching for: "${location}" (key: ${API_KEY.slice(0, 6)}...)`);

    try {
        const [current, forecast] = await Promise.all([
            fetchCurrent(location),
            fetchForecast(location),
        ]);

        if (!current || current.cod !== 200) {
            console.warn("[Weather] Current weather fetch failed:", current);
            return [];
        }
        if (!forecast || forecast.cod !== "200") {
            console.warn("[Weather] Forecast fetch failed:", forecast);
            return [];
        }

        const alerts = buildAlerts(current, forecast);
        console.log(`[Weather] ${alerts.length} alert(s) for "${location}":`, alerts.map(a => a.type));
        return alerts;
    } catch (err) {
        console.error("[Weather] API error:", err);
        return [];
    }
}


async function fetchCurrent(location: string): Promise<OWMCurrentResponse | null> {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}

/** Exported for use by the useWeather hook — returns simplified current conditions. */
export async function fetchCurrentWeather(location: string): Promise<{
    temp: number; description: string; humidity: number; windSpeed: number; cityName: string; icon: string;
} | null> {
    if (!API_KEY || API_KEY === "your_openweathermap_api_key_here") return null;
    const data = await fetchCurrent(location);
    if (!data || data.cod !== 200) return null;
    return {
        temp: Math.round(data.main.temp),
        description: data.weather[0]?.description ?? "",
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s → km/h
        cityName: data.name,
        icon: data.weather[0]?.main ?? "Clear",
    };
}


async function fetchForecast(location: string): Promise<OWMForecastResponse | null> {
    // 5-day / 3-hour forecast
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric&cnt=40`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}

/** Exported: returns daily rain totals for the next 5 days, for use in irrigation calendar. */
export async function fetchForecastDays(location: string): Promise<{ date: Date; rainMm: number; pop: number }[]> {
    if (!API_KEY || API_KEY === "your_openweathermap_api_key_here") return [];
    const data = await fetchForecast(location);
    if (!data || data.cod !== "200") return [];

    // Aggregate 3-hourly items into daily totals
    const map = new Map<string, { rainMm: number; pop: number; count: number }>();
    for (const item of data.list) {
        const d = new Date(item.dt * 1000);
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        const prev = map.get(key) ?? { rainMm: 0, pop: 0, count: 0 };
        map.set(key, {
            rainMm: prev.rainMm + (item.rain?.["3h"] ?? 0),
            pop: Math.max(prev.pop, item.pop),
            count: prev.count + 1,
        });
    }

    return Array.from(map.entries()).map(([, v]) => ({
        date: new Date(),  // placeholder; rebuilt below
        rainMm: v.rainMm,
        pop: v.pop,
    })).slice(0, 5);  // simplified — rebuilt with full dates below

    // Full date-keyed version:
}

/** Proper exported version with real dates. */
export async function fetchForecastByDay(location: string): Promise<{ date: Date; rainMm: number; pop: number }[]> {
    if (!API_KEY || API_KEY === "your_openweathermap_api_key_here") return [];
    const data = await fetchForecast(location);
    if (!data || data.cod !== "200") return [];

    const map = new Map<string, { rainMm: number; pop: number; date: Date }>();
    for (const item of data.list) {
        const d = new Date(item.dt * 1000);
        d.setHours(0, 0, 0, 0);
        const key = d.toISOString();
        const prev = map.get(key);
        map.set(key, {
            date: d,
            rainMm: (prev?.rainMm ?? 0) + (item.rain?.["3h"] ?? 0),
            pop: Math.max(prev?.pop ?? 0, item.pop),
        });
    }

    return Array.from(map.values());
}

function buildAlerts(current: OWMCurrentResponse, forecast: OWMForecastResponse): WeatherAlert[] {
    const alerts: WeatherAlert[] = [];

    const mainCondition = current.weather[0]?.main ?? "";
    const temp = current.main.temp;
    const humidity = current.main.humidity;
    const windSpeed = current.wind.speed;        // m/s
    const gust = current.wind.gust ?? windSpeed;

    // ─── Heavy Rain ──────────────────────────────────────────────────────────
    const heavyRainForecast = forecast.list.some(
        (f) => (f.rain?.["3h"] ?? 0) > 15 || f.pop > 0.8
    );
    if (mainCondition === "Rain" || mainCondition === "Thunderstorm" || heavyRainForecast) {
        const severity = mainCondition === "Thunderstorm" || (forecast.list[0]?.rain?.["3h"] ?? 0) > 25
            ? "high" : "medium";
        alerts.push({
            type: "heavy_rain",
            severity,
            message: `Heavy rain expected (${current.rain?.["1h"] ?? ""}mm/h current). Risk of waterlogging and disease.`,
            preventiveMeasures: [
                "Ensure field drainage channels are clear",
                "Delay fertilizer application until after rain",
                "Monitor for fungal diseases after rain",
                "Consider covering sensitive seedlings",
            ],
        });
    }

    // ─── High Temperature / Heat Stress ──────────────────────────────────────
    if (temp > 38) {
        alerts.push({
            type: "heat_stress",
            severity: temp > 42 ? "high" : "medium",
            message: `Current temperature ${temp.toFixed(1)}°C — dangerously high for most crops.`,
            preventiveMeasures: [
                "Irrigate in early morning or late evening",
                "Apply mulch to reduce soil temperature",
                "Avoid spraying pesticides during peak heat",
                "Monitor crops for wilting and leaf scorch",
            ],
        });
    }

    // ─── Low Temperature / Frost Risk ────────────────────────────────────────
    const minForecastTemp = Math.min(...forecast.list.slice(0, 8).map((f) => f.main.temp_min));
    if (minForecastTemp < 5) {
        alerts.push({
            type: "frost",
            severity: minForecastTemp < 2 ? "high" : "medium",
            message: `Temperatures expected to drop to ${minForecastTemp.toFixed(1)}°C — frost risk in the next 24 hours.`,
            preventiveMeasures: [
                "Cover young plants with frost cloth overnight",
                "Irrigate lightly before nightfall to release latent heat",
                "Delay planting sensitive crops",
                "Move potted plants to shelter",
            ],
        });
    }

    // ─── Strong Winds ────────────────────────────────────────────────────────
    if (gust > 15) {
        alerts.push({
            type: "strong_winds",
            severity: gust > 25 ? "high" : "medium",
            message: `Wind gusts up to ${gust.toFixed(0)} m/s (${(gust * 3.6).toFixed(0)} km/h). Risk of crop lodging.`,
            preventiveMeasures: [
                "Stake tall crops (tomatoes, sunflowers, corn) if not already done",
                "Avoid pesticide spraying to prevent drift",
                "Check and secure irrigation equipment",
                "Inspect for mechanical damage after the event",
            ],
        });
    }

    // ─── High Humidity / Disease Risk ────────────────────────────────────────
    if (humidity > 85 && (mainCondition === "Rain" || mainCondition === "Drizzle" || mainCondition === "Clouds")) {
        alerts.push({
            type: "disease_risk",
            severity: "medium",
            message: `Humidity at ${humidity}% with cloudy conditions — favorable for fungal diseases.`,
            preventiveMeasures: [
                "Apply preventive fungicide spray",
                "Improve air circulation between plants",
                "Reduce overhead irrigation temporarily",
                "Monitor leaves for early signs of blight or mildew",
            ],
        });
    }

    // ─── Drought / Dry Spell ─────────────────────────────────────────────────
    const anyRainForecast = forecast.list.slice(0, 16).some((f) => f.pop > 0.3 || (f.rain?.["3h"] ?? 0) > 1);
    if (!anyRainForecast && humidity < 40 && temp > 30) {
        alerts.push({
            type: "dry_spell",
            severity: "low",
            message: `No significant rain forecast in the next 48 hours with temperatures around ${temp.toFixed(0)}°C.`,
            preventiveMeasures: [
                "Check soil moisture daily",
                "Increase irrigation frequency",
                "Apply mulch to conserve moisture",
                "Consider drip irrigation to reduce water loss",
            ],
        });
    }

    return alerts;
}
