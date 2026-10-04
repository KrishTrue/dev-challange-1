import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, AlertCircle, HeartHandshake } from 'lucide-react';

export const AnalyzeButton: React.FC = () => {
  const { selectedSymptoms, isPredicting, predictDisease, error } = useAppStore();
  const isDisabled = selectedSymptoms.length === 0 || isPredicting;

  return (
    <div className="space-y-4 pt-1">
      <div className="flex flex-col items-center justify-center gap-2.5">
        <Button
          size="lg"
          onClick={() => predictDisease()}
          disabled={isDisabled}
          className="w-full sm:w-auto min-w-[280px] shadow-sm font-semibold text-sm sm:text-base py-5 px-8 rounded-xl bg-blue-700 hover:bg-blue-800 text-white transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isPredicting ? (
            <div className="flex items-center gap-2.5">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Checking possible causes...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <HeartHandshake className="h-4 w-4 text-blue-200" />
              <span>Check Potential Causes</span>
              <ArrowRight className="h-4 w-4 text-blue-200 ml-1" />
            </div>
          )}
        </Button>

        {isDisabled && selectedSymptoms.length === 0 && (
          <p className="text-xs text-slate-400">
            Choose what you are experiencing to continue
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-900 flex items-start gap-3 shadow-2xs">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="font-semibold text-red-900 text-xs sm:text-sm">We couldn&apos;t complete your check</h4>
            <p className="text-xs text-red-700 leading-relaxed">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
