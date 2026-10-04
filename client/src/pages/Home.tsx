import React from 'react';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SymptomSelector } from '@/components/home/SymptomSelector';
import { SelectionStatus } from '@/components/home/SelectionStatus';
import { AnalyzeButton } from '@/components/home/AnalyzeButton';
import { PredictionResult } from '@/components/home/PredictionResult';
import { SelectedSymptoms } from '@/components/home/SelectedSymptoms';
import { DiseaseDescription } from '@/components/home/DiseaseDescription';
import { MedicalDisclaimer } from '@/components/home/MedicalDisclaimer';

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <Hero />
      <HowItWorks />
      <SymptomSelector />
      <SelectionStatus />
      <AnalyzeButton />
      <PredictionResult />
      <SelectedSymptoms />
      <DiseaseDescription />
      <div className="pt-4">
        <MedicalDisclaimer />
      </div>
    </div>
  );
};
