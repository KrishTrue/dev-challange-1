import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { ListChecks, ChevronDown, ChevronUp } from 'lucide-react';

export const SelectedSymptoms: React.FC = () => {
  const { selectedSymptoms, prediction } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!prediction || selectedSymptoms.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-2xs mb-6 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/60 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-700">
            <ListChecks className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
              Submitted Symptom Profile ({selectedSymptoms.length})
            </h4>
            <p className="text-[11px] text-slate-500">
              Indicators provided for this diagnostic inference
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span>{isExpanded ? 'Hide' : 'Review'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-3">
            {selectedSymptoms.map((symptom, idx) => (
              <div
                key={symptom}
                className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs"
              >
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="truncate">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
