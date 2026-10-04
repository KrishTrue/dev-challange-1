import { create } from 'zustand';
import { diseaseApi } from '@/api/diseaseApi';
import type { ActiveTab } from '@/types';
import axios from 'axios';

interface AppState {
  selectedSymptoms: string[];
  prediction: string | null;
  diseaseDescription: string | null;
  isPredicting: boolean;
  isLoadingDescription: boolean;
  error: string | null;
  activeTab: ActiveTab;

  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  addSymptom: (symptom: string) => void;
  removeSymptom: (symptom: string) => void;
  toggleSymptom: (symptom: string) => void;
  clearSymptoms: () => void;
  setSelectedSymptoms: (symptoms: string[]) => void;
  resetPrediction: () => void;
  clearError: () => void;
  predictDisease: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedSymptoms: [],
  prediction: null,
  diseaseDescription: null,
  isPredicting: false,
  isLoadingDescription: false,
  error: null,
  activeTab: 'home',

  setActiveTab: (tab: ActiveTab) => set({ activeTab: tab }),

  addSymptom: (symptom: string) => {
    const { selectedSymptoms } = get();
    if (!selectedSymptoms.includes(symptom)) {
      set({ selectedSymptoms: [...selectedSymptoms, symptom], error: null });
    }
  },

  removeSymptom: (symptom: string) => {
    const { selectedSymptoms } = get();
    set({
      selectedSymptoms: selectedSymptoms.filter((s) => s !== symptom),
    });
  },

  toggleSymptom: (symptom: string) => {
    const { selectedSymptoms } = get();
    if (selectedSymptoms.includes(symptom)) {
      set({
        selectedSymptoms: selectedSymptoms.filter((s) => s !== symptom),
      });
    } else {
      set({
        selectedSymptoms: [...selectedSymptoms, symptom],
        error: null,
      });
    }
  },

  clearSymptoms: () => set({ selectedSymptoms: [], error: null }),

  setSelectedSymptoms: (symptoms: string[]) => set({ selectedSymptoms: symptoms, error: null }),

  resetPrediction: () =>
    set({
      prediction: null,
      diseaseDescription: null,
      error: null,
    }),

  clearError: () => set({ error: null }),

  predictDisease: async () => {
    const { selectedSymptoms, isPredicting } = get();
    if (isPredicting || selectedSymptoms.length === 0) return;

    set({
      isPredicting: true,
      error: null,
      prediction: null,
      diseaseDescription: null,
    });

    try {
      const predRes = await diseaseApi.predict(selectedSymptoms);
      const predictedDisease = predRes.disease;

      set({
        prediction: predictedDisease,
        isPredicting: false,
        isLoadingDescription: true,
      });

      // Now fetch the disease description asynchronously
      try {
        const descRes = await diseaseApi.getDiseaseDescription(predictedDisease);
        set({
          diseaseDescription: descRes.description,
          isLoadingDescription: false,
        });
      } catch (descErr) {
        console.error('Failed to fetch disease description:', descErr);
        set({
          diseaseDescription: 'Unable to load disease details at this time.',
          isLoadingDescription: false,
        });
      }
    } catch (err: unknown) {
      console.error('Prediction request failed:', err);
      let errorMessage = 'Unable to connect to the prediction server. Please ensure the backend is running and try again.';
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      set({
        error: errorMessage,
        isPredicting: false,
        isLoadingDescription: false,
      });
    }
  },
}));
