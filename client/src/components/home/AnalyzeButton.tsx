import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowRight, AlertCircle } from 'lucide-react';

export const AnalyzeButton: React.FC = () => {
  const { selectedSymptoms, isPredicting, predictDisease, error } = useAppStore();
  const isDisabled = selectedSymptoms.length === 0 || isPredicting;

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
        <Button
          size="lg"
          onClick={() => predictDisease()}
          disabled={isDisabled}
          className="w-full sm:w-auto min-w-[240px] shadow-sm font-semibold text-base py-6"
        >
          {isPredicting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing symptoms...</span>
            </>
          ) : (
            <>
              <span>Analyze Symptoms</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="danger">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Prediction Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
