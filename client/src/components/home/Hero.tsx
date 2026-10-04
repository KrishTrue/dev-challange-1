import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Hero: React.FC = () => {
  return (
    <section className="text-center py-6 sm:py-10 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Badge variant="default" className="gap-1.5 px-3 py-1 font-medium bg-blue-50 text-blue-700 border-blue-200">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>AI-Powered Diagnostics</span>
        </Badge>
        <Badge variant="outline" className="gap-1.5 px-3 py-1 font-medium text-slate-600">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Random Forest ML</span>
        </Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
        AI-Powered Disease Prediction
      </h1>

      <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
        Understand your symptoms with an AI-assisted diagnostic evaluation. Select your symptoms below and let our machine-learning model analyze clinical patterns in real-time.
      </p>
    </section>
  );
};
