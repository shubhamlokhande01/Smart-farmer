// src/lib/emailReminder.ts
// Sends emails via EmailJS (browser-side, no backend needed).

import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const WELCOME_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export function isEmailConfigured(): boolean {
    return !!(
        SERVICE_ID && SERVICE_ID !== "your_service_id_here" &&
        TEMPLATE_ID && TEMPLATE_ID !== "your_template_id_here" &&
        PUBLIC_KEY && PUBLIC_KEY !== "your_public_key_here"
    );
}

export function isWelcomeEmailConfigured(): boolean {
    return !!(
        SERVICE_ID && SERVICE_ID !== "your_service_id_here" &&
        WELCOME_TEMPLATE_ID && WELCOME_TEMPLATE_ID !== "your_welcome_template_id_here" &&
        PUBLIC_KEY && PUBLIC_KEY !== "your_public_key_here"
    );
}

// ─── Irrigation Reminder ────────────────────────────────────────────────────

interface ReminderParams {
    toEmail: string;
    farmerName: string;
    cropName: string;
    farmName: string;
    irrigationDate: string;
    quantity: string;
    cropStage: string;
    weatherNote: string;
    tips: string;
}

export async function sendIrrigationReminder(params: ReminderParams): Promise<boolean> {
    if (!isEmailConfigured()) {
        console.warn("[EmailJS] Reminder not configured.");
        return false;
    }
    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: params.toEmail,
            farmer_name: params.farmerName,
            crop_name: params.cropName,
            farm_name: params.farmName,
            irrigation_date: params.irrigationDate,
            quantity: params.quantity,
            crop_stage: params.cropStage,
            weather_note: params.weatherNote,
            tips: params.tips,
        }, PUBLIC_KEY);
        console.log(`[EmailJS] Reminder sent to ${params.toEmail} ✓`);
        return true;
    } catch (err) {
        console.error("[EmailJS] Reminder failed:", err);
        return false;
    }
}

// ─── Welcome Email ──────────────────────────────────────────────────────────

interface WelcomeParams {
    toEmail: string;
    farmerName: string;
}

export async function sendWelcomeEmail(params: WelcomeParams): Promise<boolean> {
    if (!isWelcomeEmailConfigured()) {
        console.warn("[EmailJS] Welcome template not configured — skipping welcome email.");
        return false;
    }
    try {
        await emailjs.send(SERVICE_ID, WELCOME_TEMPLATE_ID, {
            to_email: params.toEmail,
            farmer_name: params.farmerName || params.toEmail.split("@")[0],
        }, PUBLIC_KEY);
        console.log(`[EmailJS] Welcome email sent to ${params.toEmail} ✓`);
        return true;
    } catch (err) {
        console.error("[EmailJS] Welcome email failed:", err);
        return false;
    }
}
