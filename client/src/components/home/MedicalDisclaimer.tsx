import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 sm:p-5 text-amber-950 shadow-2xs">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100/80 text-amber-800">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
            Clinical Safety &amp; Medical Disclaimer
          </h4>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            This digital screening application utilizes statistical machine learning (Random Forest) and generative AI (Gemini) for informational and screening support only. <strong>It does not constitute formal medical advice, diagnosis, or clinical prescription.</strong>
          </p>
          <p className="text-[11px] text-amber-800 pt-1 leading-relaxed">
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you think you may have a medical emergency, call your local emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
