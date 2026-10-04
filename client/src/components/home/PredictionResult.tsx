import React from 'react';
import { useAppStore } from '@/store/appStore';
import { RefreshCw, HelpCircle, Activity } from 'lucide-react';

export const PredictionResult: React.FC = () => {
  const { prediction, selectedSymptoms, resetPrediction, isPredicting } = useAppStore();

  if (!prediction && !isPredicting) return null;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all">
      {/* Top Header */}
      <div className="bg-slate-50/80 border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-100">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700">
              Assessment Summary
            </span>
            <span className="text-slate-300 mx-1.5">&bull;</span>
            <span className="text-xs text-slate-500">
              Matched against {selectedSymptoms.length} reported {selectedSymptoms.length === 1 ? 'symptom' : 'symptoms'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={resetPrediction}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
        >
          <RefreshCw className="h-3 w-3 text-slate-400" />
          <span>Start Over</span>
        </button>
      </div>

      {/* Main Condition Presentation */}
      <div className="p-6 sm:p-8 space-y-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 inline-block mb-2">
            Possible Condition
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {prediction}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Based on the symptoms you selected, our clinical pattern model found that <strong className="text-slate-900 font-semibold">{prediction}</strong> is the most common match.
          </p>
        </div>

        {/* Gentle Context Note */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
          <HelpCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800 font-semibold">What this means:</strong> Many health conditions share identical symptoms. This result is meant to guide your conversation with a doctor or nurse, not give a conclusive diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};
