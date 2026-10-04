import React from 'react';
import { ShieldCheck, Stethoscope, Lock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-2 pb-8 sm:pb-10 max-w-2xl mx-auto text-center space-y-4">
      {/* Human, reassuring indicator */}
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs text-slate-700 shadow-2xs">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-medium">Free, private symptom assessment</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-slate-900 leading-tight">
        How are you feeling today?
      </h1>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
        Select what you are experiencing. We will evaluate symptom patterns and share clear, structured medical reference context.
      </p>

      {/* Trust reassurance */}
      <div className="pt-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
          No sign-in or data storage
        </span>
        <span className="hidden sm:inline text-slate-300">&bull;</span>
        <span className="flex items-center gap-1.5 font-medium">
          <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
          Evidence-based ML classification
        </span>
        <span className="hidden sm:inline text-slate-300">&bull;</span>
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
          Physician reference library
        </span>
      </div>
    </section>
  );
};
