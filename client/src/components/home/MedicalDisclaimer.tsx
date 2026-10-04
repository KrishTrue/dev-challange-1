import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <Alert variant="warning" className="border-amber-200/90 bg-amber-50/60 text-amber-950">
      <ShieldAlert className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-900 font-semibold">Important Medical Disclaimer</AlertTitle>
      <AlertDescription className="text-amber-800 text-xs sm:text-sm">
        This AI system is built for educational and informational screening purposes only. It is not a clinical diagnostic instrument and should never replace consultation with a certified medical doctor. If you are experiencing severe symptoms or a medical emergency, seek immediate emergency care.
      </AlertDescription>
    </Alert>
  );
};
