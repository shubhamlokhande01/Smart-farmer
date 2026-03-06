export interface SoilData {
  type: 'clay' | 'sandy' | 'loamy' | 'silt' | 'peat' | 'chalky';
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  ph: number;
  waterHoldingCapacity: 'low' | 'medium' | 'high';
}

export interface Crop {
  id: string;
  name: string;
  plantationDate: Date;
  farmId: string;
  soilData: SoilData;
  currentStage?: CropStage;
  managementPlan?: ManagementPlan;
  createdAt?: Date;
}

export interface Farm {
  id: string;
  userId?: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    region: string;
  };
  size: number; // in hectares
  sizeUnit: 'hectares' | 'acres';
  irrigationMethod: 'drip' | 'sprinkler' | 'flood' | 'furrow' | 'rainfed';
  crops: Crop[];
  createdAt?: Date;
}

export type CropStageType =
  | 'germination'
  | 'seedling'
  | 'vegetative'
  | 'flowering'
  | 'fruiting'
  | 'maturity'
  | 'harvest';

export interface CropStage {
  type: CropStageType;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  daysRemaining: number;
}

export interface IrrigationPlan {
  stage: CropStageType;
  frequency: string;
  quantityPerHectare: string;
  notes: string[];
}

export interface FertilizerPlan {
  stage: CropStageType;
  fertilizerType: string;         // generic name e.g. "DAP (18-46-0)"
  brand?: string;                 // specific brand e.g. "IFFCO DAP", "Coromandel Suphala"
  npkRatio?: string;              // e.g. "18-46-0"
  quantity: string;               // e.g. "100 kg/ha"
  applicationMethod: string;      // e.g. "Basal soil application"
  timing: string;                 // e.g. "At sowing, 21–25 days before planting"
  guidelines: string[];           // step-by-step how to apply
  precautions: string[];          // safety and best-practice tips
}

export interface WeatherAlert {
  type: 'drought' | 'flood' | 'frost' | 'heatwave' | 'storm' | 'heat_stress' | 'disease_risk' | 'strong_winds' | 'heavy_rain' | 'dry_spell';
  severity: 'low' | 'medium' | 'high';
  message: string;
  preventiveMeasures: string[];
}

export interface ManagementPlan {
  cropId: string;
  stages: CropStage[];
  irrigationPlans: IrrigationPlan[];
  fertilizerPlans: FertilizerPlan[];
  weatherAlerts: WeatherAlert[];
  expectedYield: {
    min: number;
    max: number;
    unit: string;
  };
  generalRecommendations: string[];
}

export interface CropRecommendation {
  cropName: string;
  suitabilityScore: number; // 0-100
  reasons: string[];
  expectedYield: {
    min: number;
    max: number;
    unit: string;
  };
  waterRequirements: 'low' | 'medium' | 'high';
  nutrientRequirements: string;
}
