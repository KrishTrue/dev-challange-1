import React from 'react';
import { useAppStore } from '@/store/appStore';
import { RotateCcw, HelpCircle, Activity, CheckCircle2 } from 'lucide-react';

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
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
        >
          <RotateCcw className="h-3 w-3 text-slate-400" />
          <span>Start Over</span>
        </button>
      </div>

      {/* Main Condition Presentation */}
      <div className="p-6 sm:p-8 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Highest Matching Condition
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {prediction}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Based on the clinical pattern of your reported symptoms, our Random Forest classifier calculated <strong className="text-slate-900 font-semibold">{prediction}</strong> as the primary match.
          </p>
        </div>

        {/* Clinical Note */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
          <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800 font-semibold">Important context:</strong> Many health conditions share overlapping symptoms. This result is designed to prepare you with targeted questions for your doctor or healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
};
