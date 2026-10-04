import { create } from 'zustand';
import { diseaseApi } from '@/api/diseaseApi';
import type { ActiveTab, ChatMessage } from '@/types';
import { parseDiseaseSections } from '@/lib/diseaseParser';
import axios from 'axios';

interface AppState {
  // Conversation state
  messages: ChatMessage[];
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
  resetChat: () => void;
  clearError: () => void;
  predictDisease: () => Promise<void>;
  submitConsultation: (symptomsToSubmit?: string[]) => Promise<void>;
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'assistant',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  type: 'welcome',
};

export const useAppStore = create<AppState>((set, get) => ({
  messages: [INITIAL_WELCOME_MESSAGE],
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

  resetChat: () =>
    set({
      messages: [{
        ...INITIAL_WELCOME_MESSAGE,
        id: `msg-welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }],
      selectedSymptoms: [],
      prediction: null,
      diseaseDescription: null,
      error: null,
      isPredicting: false,
      isLoadingDescription: false,
    }),

  clearError: () => set({ error: null }),

  submitConsultation: async (symptomsToSubmit) => {
    const { selectedSymptoms, isPredicting } = get();
    const symptoms = symptomsToSubmit && symptomsToSubmit.length > 0 ? symptomsToSubmit : selectedSymptoms;

    if (isPredicting || symptoms.length === 0) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add User Query Message
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: timeString,
      type: 'user_query',
      symptoms: [...symptoms],
    };

    // 2. Add Assistant Loading Message
    const botMsgId = `assistant-${Date.now() + 1}`;
    const botMsg: ChatMessage = {
      id: botMsgId,
      sender: 'assistant',
      timestamp: timeString,
      type: 'assistant_result',
      symptoms: [...symptoms],
      isLoading: true,
      isLoadingDescription: true,
      prediction: null,
      description: null,
      sections: [],
    };

    set((state) => ({
      messages: [...state.messages, userMsg, botMsg],
      isPredicting: true,
      isLoadingDescription: true,
      error: null,
      prediction: null,
      diseaseDescription: null,
    }));

    try {
      // Step A: Predict Disease using Random Forest Model
      const predRes = await diseaseApi.predict(symptoms);
      const predictedDisease = predRes.disease;

      set((state) => ({
        prediction: predictedDisease,
        isPredicting: false,
        messages: state.messages.map((m) =>
          m.id === botMsgId
            ? { ...m, isLoading: false, prediction: predictedDisease, isLoadingDescription: true }
            : m
        ),
      }));

      // Step B: Fetch Comprehensive Clinical Guidance
      try {
        const descRes = await diseaseApi.getDiseaseDescription(predictedDisease);
        const descriptionText = descRes.description;
        const sections = parseDiseaseSections(descriptionText, predictedDisease);

        set((state) => ({
          diseaseDescription: descriptionText,
          isLoadingDescription: false,
          messages: state.messages.map((m) =>
            m.id === botMsgId
              ? {
                  ...m,
                  description: descriptionText,
                  sections: sections,
                  isLoadingDescription: false,
                }
              : m
          ),
        }));
      } catch (descErr) {
        console.error('Failed to fetch disease description:', descErr);
        const fallbackText = `Clinical assessment complete for ${predictedDisease}. Please consult a healthcare provider for full medical history evaluation and prescription guidance.`;
        const fallbackSections = parseDiseaseSections(fallbackText, predictedDisease);

        set((state) => ({
          diseaseDescription: fallbackText,
          isLoadingDescription: false,
          messages: state.messages.map((m) =>
            m.id === botMsgId
              ? {
                  ...m,
                  description: fallbackText,
                  sections: fallbackSections,
                  isLoadingDescription: false,
                }
              : m
          ),
        }));
      }
    } catch (err: unknown) {
      console.error('Prediction request failed:', err);
      let errorMessage = 'Unable to connect to the prediction server. Please ensure the backend is running and try again.';
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      set((state) => ({
        error: errorMessage,
        isPredicting: false,
        isLoadingDescription: false,
        messages: state.messages.map((m) =>
          m.id === botMsgId
            ? {
                ...m,
                isLoading: false,
                isLoadingDescription: false,
                error: errorMessage,
              }
            : m
        ),
      }));
    }
  },

  predictDisease: async () => {
    const { selectedSymptoms } = get();
    await get().submitConsultation(selectedSymptoms);
  },
}));
