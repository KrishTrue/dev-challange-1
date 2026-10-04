import React from 'react';
import { Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
            <Activity className="h-4 w-4 text-blue-600" />
            <span>AI Disease Predictor</span>
          </div>

          <p className="text-xs text-slate-500 max-w-md">
            For informational purposes only. Always consult a qualified healthcare professional for medical advice and diagnosis.
          </p>

          <div className="text-xs text-slate-600 font-medium">
            Built by <span className="text-slate-900 font-semibold">Keshav Gilhotra</span> &amp; <span className="text-slate-900 font-semibold">Krish Puri</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
