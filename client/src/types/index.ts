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

export interface DiseaseSection {
  id: string;
  title: string;
  shortTitle: string;
  iconName: 'info' | 'activity' | 'help' | 'shield' | 'pill' | 'file';
  content: string;
  badgeLabel: string;
  badgeColor: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  type: 'welcome' | 'user_query' | 'assistant_result';
  symptoms?: string[];
  prediction?: string | null;
  description?: string | null;
  sections?: DiseaseSection[];
  isLoading?: boolean;
  isLoadingDescription?: boolean;
  error?: string | null;
}
