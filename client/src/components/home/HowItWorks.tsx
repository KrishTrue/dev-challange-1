import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, Cpu, FileText } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select Symptoms',
      desc: 'Pick your active symptoms from our catalog of 130+ clinical indicators.',
      icon: <CheckSquare className="h-5 w-5 text-blue-600" />,
    },
    {
      num: '02',
      title: 'Analyze Pattern',
      desc: 'Our trained Random Forest model processes the combination in milliseconds.',
      icon: <Cpu className="h-5 w-5 text-blue-600" />,
    },
    {
      num: '03',
      title: 'View Prediction',
      desc: 'Receive the predicted condition along with AI-generated medical guidance.',
      icon: <FileText className="h-5 w-5 text-blue-600" />,
    },
  ];

  return (
    <Card className="border-slate-200 shadow-xs mb-8">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">How it works</h2>
          <p className="text-sm text-slate-500 mt-1">
            Our machine-learning model evaluates symptom co-occurrences against clinical disease profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-3.5 rounded-lg border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50 hover:border-slate-200"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-2xs font-mono text-xs font-bold text-blue-600">
                {step.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
