export interface PredictionResponse {
  disease: string;
}

export interface DiseaseDescriptionResponse {
  description: string;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  timestamp?: string;
}

export type ActiveTab = 'home' | 'sources';
