import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-10 mt-16 text-slate-500">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-800 font-bold text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white">
                <Activity className="h-3 w-3" />
              </div>
              <span>MediPredict Clinical Screener</span>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Evidence-informed diagnostic pattern classification powered by Random Forest ML and generative medical intelligence.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/70 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            <span>Built by Keshav Gilhotra &amp; Krish Puri</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} MediPredict. Not a substitute for formal medical evaluation.</p>
          <div className="flex items-center gap-4">
            <span>HIPAA-Mindful Design</span>
            <span>&bull;</span>
            <span>Static Client-Side Parsing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
