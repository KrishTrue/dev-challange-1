import React from 'react';
import { useAppStore } from '@/store/appStore';
import { CheckCircle2, Info } from 'lucide-react';

export const SelectionStatus: React.FC = () => {
  const { selectedSymptoms } = useAppStore();
  const count = selectedSymptoms.length;

  if (count === 0) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 py-3.5 text-xs sm:text-sm text-slate-600">
        <Info className="h-4 w-4 text-slate-400 shrink-0" />
        <p>
          Select one or more symptoms above to begin your assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50/40 px-4 py-3.5 text-xs sm:text-sm text-emerald-950">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>
          <strong className="font-semibold text-emerald-950">{count} {count === 1 ? 'symptom' : 'symptoms'} noted.</strong> Ready to check potential causes.
        </span>
      </div>
      <span className="hidden sm:inline-block text-xs font-medium text-emerald-700">
        Ready
      </span>
    </div>
  );
};
