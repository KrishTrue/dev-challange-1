import { api } from './axios';
import type { PredictionResponse, DiseaseDescriptionResponse, HealthResponse } from '@/types';

export const diseaseApi = {
  predict: async (symptoms: string[]): Promise<PredictionResponse> => {
    const response = await api.post<PredictionResponse>('/predict', symptoms);
    return response.data;
  },

  getDiseaseDescription: async (diseaseName: string): Promise<DiseaseDescriptionResponse> => {
    const response = await api.post<DiseaseDescriptionResponse>('/disease_description', {
      disease_name: diseaseName,
    });
    return response.data;
  },

  checkHealth: async (): Promise<HealthResponse> => {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  },
};
