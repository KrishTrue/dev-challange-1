import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Stethoscope, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PredictionResult: React.FC = () => {
  const { prediction, selectedSymptoms, resetPrediction, isPredicting } = useAppStore();

  if (!prediction && !isPredicting) return null;

  return (
    <Card className="border-emerald-200/80 bg-emerald-50/20 shadow-xs mb-6 overflow-hidden">
      <div className="h-1.5 w-full bg-emerald-600" />
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="success" className="gap-1 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Prediction Result
              </Badge>
              <span className="text-xs text-slate-500 font-medium">Random Forest Classifier</span>
            </div>
            <p className="text-xs text-slate-500">Based on {selectedSymptoms.length} reported symptoms</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetPrediction}
            className="self-start sm:self-auto text-xs text-slate-600 hover:text-slate-900 gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Analysis
          </Button>
        </div>

        <div className="pt-6 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Stethoscope className="h-4 w-4 text-emerald-600" />
            <span>Possible Condition</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {prediction}
          </h3>

          <p className="text-sm text-slate-600 pt-1">
            Our machine-learning model analyzed your symptom combination and identified <strong className="text-slate-900 font-semibold">{prediction}</strong> as the highest probability condition.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
