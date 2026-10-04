import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SelectionStatus: React.FC = () => {
  const { selectedSymptoms } = useAppStore();
  const count = selectedSymptoms.length;

  if (count === 0) {
    return (
      <Alert variant="warning" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No symptoms selected</AlertTitle>
        <AlertDescription>
          Please select at least one symptom from the catalog above to generate an AI prediction.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="success" className="mb-6">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>{count} {count === 1 ? 'symptom' : 'symptoms'} selected</AlertTitle>
      <AlertDescription>
        Your symptoms are ready for analysis. Click &ldquo;Analyze Symptoms&rdquo; below to run the prediction model.
      </AlertDescription>
    </Alert>
  );
};
