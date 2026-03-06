import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp,
    query,
    where,
    Timestamp,
    type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Farm, Crop, ManagementPlan, SoilData } from "@/types/farming";

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function saveUserProfile(uid: string, email: string | null, displayName?: string | null) {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        const storedLang = localStorage.getItem("agriwise_language") ?? "en";
        await setDoc(userRef, {
            email: email ?? "",
            displayName: displayName ?? "",
            preferredLanguage: storedLang,
            createdAt: serverTimestamp(),
        });
    }
}

export async function updateUserLanguage(uid: string, language: string): Promise<void> {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { preferredLanguage: language });
}

export async function getUserLanguage(uid: string): Promise<string | null> {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
        return (snap.data().preferredLanguage as string) ?? null;
    }
    return null;
}

// ─── Farms ────────────────────────────────────────────────────────────────────

export interface FarmInput {
    name: string;
    location: string;
    size: number;
    sizeUnit: "hectares" | "acres";
    irrigationMethod: "drip" | "sprinkler" | "flood" | "furrow" | "rainfed";
}

export async function createFarm(userId: string, data: FarmInput): Promise<string> {
    const farmsRef = collection(db, "users", userId, "farms");
    const newDoc = await addDoc(farmsRef, {
        ...data,
        userId,
        createdAt: serverTimestamp(),
    });
    return newDoc.id;
}

export async function getUserFarms(userId: string): Promise<Farm[]> {
    const farmsRef = collection(db, "users", userId, "farms");
    const snap = await getDocs(farmsRef);

    const farms: Farm[] = [];
    for (const farmDoc of snap.docs) {
        const farmData = farmDoc.data();
        const cropsRef = collection(db, "users", userId, "farms", farmDoc.id, "crops");
        const cropsSnap = await getDocs(cropsRef);

        const crops: Crop[] = cropsSnap.docs.map((cropDoc) => {
            const c = cropDoc.data();
            return {
                id: cropDoc.id,
                name: c.name,
                plantationDate: (c.plantationDate as Timestamp).toDate(),
                farmId: farmDoc.id,
                soilData: c.soilData,
                currentStage: c.currentStage ?? undefined,
                managementPlan: c.managementPlan ?? undefined,
            } as Crop;
        });

        farms.push({
            id: farmDoc.id,
            name: farmData.name,
            location: {
                lat: 0,
                lng: 0,
                address: farmData.location,
                region: "",
            },
            size: farmData.size,
            sizeUnit: farmData.sizeUnit,
            irrigationMethod: farmData.irrigationMethod,
            crops,
        } as Farm);
    }

    return farms;
}

// ─── Crops ────────────────────────────────────────────────────────────────────

export interface CropInput {
    name: string;
    plantationDate: string; // ISO date string from form
    soilType: SoilData["type"];
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    waterHoldingCapacity: SoilData["waterHoldingCapacity"];
}

export async function addCrop(
    userId: string,
    farmId: string,
    data: CropInput
): Promise<string> {
    const cropsRef = collection(db, "users", userId, "farms", farmId, "crops");
    const newDoc = await addDoc(cropsRef, {
        name: data.name,
        plantationDate: Timestamp.fromDate(new Date(data.plantationDate)),
        soilData: {
            type: data.soilType,
            nitrogen: data.nitrogen,
            phosphorus: data.phosphorus,
            potassium: data.potassium,
            ph: data.ph,
            waterHoldingCapacity: data.waterHoldingCapacity,
        },
        createdAt: serverTimestamp(),
    });
    return newDoc.id;
}

export async function savePlan(
    userId: string,
    farmId: string,
    cropId: string,
    plan: ManagementPlan
) {
    const cropRef = doc(db, "users", userId, "farms", farmId, "crops", cropId);

    // Convert Date objects to Timestamps for Firestore
    const serialisedPlan = {
        ...plan,
        stages: plan.stages.map((s) => ({
            ...s,
            startDate: Timestamp.fromDate(s.startDate),
            endDate: Timestamp.fromDate(s.endDate),
        })),
    };

    await updateDoc(cropRef, { managementPlan: serialisedPlan });
}

// ─── Real-time listener ────────────────────────────────────────────────────────

export function subscribeFarms(
    userId: string,
    callback: (farms: Farm[]) => void
): Unsubscribe {
    const farmsRef = collection(db, "users", userId, "farms");

    return onSnapshot(farmsRef, async (farmsSnap) => {
        const farms: Farm[] = [];

        for (const farmDoc of farmsSnap.docs) {
            const farmData = farmDoc.data();
            const cropsRef = collection(db, "users", userId, "farms", farmDoc.id, "crops");
            const cropsSnap = await getDocs(cropsRef);

            const crops: Crop[] = cropsSnap.docs.map((cropDoc) => {
                const c = cropDoc.data();
                const plan = c.managementPlan
                    ? deserializePlan(c.managementPlan)
                    : undefined;
                return {
                    id: cropDoc.id,
                    name: c.name,
                    plantationDate: (c.plantationDate as Timestamp).toDate(),
                    farmId: farmDoc.id,
                    soilData: c.soilData,
                    currentStage: c.currentStage ?? undefined,
                    managementPlan: plan,
                } as Crop;
            });

            farms.push({
                id: farmDoc.id,
                name: farmData.name,
                location: {
                    lat: 0,
                    lng: 0,
                    address: farmData.location,
                    region: "",
                },
                size: farmData.size,
                sizeUnit: farmData.sizeUnit,
                irrigationMethod: farmData.irrigationMethod,
                crops,
            } as Farm);
        }

        callback(farms);
    });
}

function deserializePlan(raw: any): ManagementPlan {
    return {
        ...raw,
        stages: (raw.stages ?? []).map((s: any) => ({
            ...s,
            startDate: s.startDate instanceof Timestamp ? s.startDate.toDate() : new Date(s.startDate),
            endDate: s.endDate instanceof Timestamp ? s.endDate.toDate() : new Date(s.endDate),
        })),
    };
}
