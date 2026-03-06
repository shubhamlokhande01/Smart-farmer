// src/lib/irrigationSchedule.ts
// Computes a day-by-day irrigation schedule from plantation date + AI plan frequency,
// adjusted for weather forecast (skips days with significant rainfall forecast).

import type { IrrigationPlan, CropStage } from "@/types/farming";

export type IrrigationDayStatus = "irrigate" | "skip_rain" | "done" | "none";

export interface IrrigationDay {
    date: Date;
    dateLabel: string;    // "Mon 3 Mar"
    status: IrrigationDayStatus;
    quantity: string;
    note: string;
    rainMm: number;
}

export interface ForecastDay {
    date: Date;
    rainMm: number;
    pop: number;  // probability of precipitation 0–1
}

/**
 * Parses a frequency string like "Every 7–10 days" → midpoint (e.g. 8).
 * Falls back to 7 if it can't parse.
 */
export function parseFrequencyDays(frequency: string): number {
    // Match "every N days" or "every N-M days" or "every N–M days"
    const rangeMatch = frequency.match(/(\d+)\s*[–\-]\s*(\d+)/);
    if (rangeMatch) {
        return Math.round((parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2);
    }
    const singleMatch = frequency.match(/(\d+)/);
    if (singleMatch) return parseInt(singleMatch[1]);
    return 7;
}

/**
 * Find which irrigation plan applies today based on crop stages.
 */
function getCurrentPlan(stages: CropStage[], plans: IrrigationPlan[]): IrrigationPlan | null {
    const today = new Date();
    const activeStage = stages.find(s => today >= s.startDate && today <= s.endDate);
    if (activeStage) {
        return plans.find(p => p.stage === activeStage.type) ?? plans[0] ?? null;
    }
    return plans[0] ?? null;
}

/**
 * Build a 14-day irrigation calendar.
 */
export function buildIrrigationCalendar(
    plantationDate: Date,
    stages: CropStage[],
    plans: IrrigationPlan[],
    forecast: ForecastDay[],
    daysAhead = 14,
): IrrigationDay[] {
    const plan = getCurrentPlan(stages, plans);
    if (!plan) return [];

    const intervalDays = parseFrequencyDays(plan.frequency);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find last irrigation date before today (working backwards from today by interval)
    const msPlanted = plantationDate.getTime();
    const msToday = today.getTime();
    const daysSincePlanting = Math.floor((msToday - msPlanted) / 86400000);
    const lastCycleOffset = daysSincePlanting % intervalDays;
    const lastIrrigationDate = new Date(today.getTime() - lastCycleOffset * 86400000);

    const days: IrrigationDay[] = [];

    for (let i = 0; i < daysAhead; i++) {
        const date = new Date(today.getTime() + i * 86400000);
        date.setHours(0, 0, 0, 0);

        const daysSinceLast = Math.round((date.getTime() - lastIrrigationDate.getTime()) / 86400000);
        const isIrrigationDay = daysSinceLast % intervalDays === 0;

        // Check forecast for this date
        const forecastEntry = forecast.find(f => {
            const fd = new Date(f.date);
            fd.setHours(0, 0, 0, 0);
            return fd.getTime() === date.getTime();
        });

        const rainMm = forecastEntry?.rainMm ?? 0;
        const pop = forecastEntry?.pop ?? 0;
        const heavyRain = rainMm > 5 || pop > 0.7;

        const isPast = date.getTime() < today.getTime();

        let status: IrrigationDayStatus = "none";
        let note = "";

        if (isIrrigationDay) {
            if (isPast) {
                status = "done";
                note = "Irrigation completed";
            } else if (heavyRain) {
                status = "skip_rain";
                note = `Skip — ${rainMm.toFixed(1)}mm rain expected (${Math.round(pop * 100)}% chance)`;
            } else {
                status = "irrigate";
                note = rainMm > 0
                    ? `Light rain (${rainMm.toFixed(1)}mm) — still irrigate as planned`
                    : "No rain expected — irrigate as planned";
            }
        } else if (!isPast && rainMm > 10) {
            // Heavy rain on a non-irrigation day is still worth noting
            status = "none";
        }

        const dateLabel = date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

        days.push({
            date,
            dateLabel,
            status,
            quantity: isIrrigationDay && status !== "skip_rain" ? plan.quantityPerHectare : "—",
            note,
            rainMm,
        });
    }

    return days;
}

/** Find the next upcoming irrigation date from the calendar */
export function getNextIrrigationDay(calendar: IrrigationDay[]): IrrigationDay | null {
    return calendar.find(d => d.status === "irrigate") ?? null;
}
