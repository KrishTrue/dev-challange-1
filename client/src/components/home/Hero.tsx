import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-2 pb-8 sm:pb-10 max-w-2xl mx-auto text-center space-y-4">
      {/* Human, reassuring indicator */}
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs text-slate-600 shadow-2xs">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-medium">Free, private clinical assessment</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-slate-900 leading-snug">
        How are you feeling today?
      </h1>

      <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
        Select what you are experiencing. We will evaluate symptom patterns and share clear, physician-reviewed context.
      </p>

      {/* Trust reassurance */}
      <div className="pt-1 flex items-center justify-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-teal-600" />
          No sign-in or personal data required
        </span>
        <span className="hidden sm:inline text-slate-300">&bull;</span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          Clinical AI guidance
        </span>
      </div>
    </section>
  );
};
