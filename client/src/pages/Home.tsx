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
    <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Welcoming Hero & Trust Framing */}
      <Hero />

      {/* 2. Optional workflow educational collapsible */}
      <HowItWorks />

      {/* 3. Symptom Reporting Engine */}
      <SymptomSelector />

      {/* 4. Selection Feedback State & Analyze Action */}
      <div className="space-y-4">
        <SelectionStatus />
        <AnalyzeButton />
      </div>

      {/* 5. Results & Clinical Guidance (Shown upon analysis) */}
      <PredictionResult />
      <SelectedSymptoms />
      <DiseaseDescription />

      {/* 6. Medical Safety Protocol */}
      <div className="pt-6 border-t border-slate-200/60">
        <MedicalDisclaimer />
      </div>
    </div>
  );
};
