import React, { useState } from 'react';
import { CheckSquare, Activity, FileText, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      num: '1',
      title: 'Choose your symptoms',
      desc: 'Pick whatever you are experiencing from the categories or quick search.',
      icon: <CheckSquare className="h-4 w-4 text-blue-600" />,
    },
    {
      num: '2',
      title: 'Match clinical patterns',
      desc: 'Our trained Random Forest classifier evaluates combinations against known medical profiles.',
      icon: <Activity className="h-4 w-4 text-teal-600" />,
    },
    {
      num: '3',
      title: 'Review guidance & precautions',
      desc: 'Read structured disease overviews, home precautions, and when to seek doctor care.',
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-blue-600" />
          <span className="font-semibold text-slate-900">How this symptom checker works</span>
        </span>
        <span className="text-slate-400 flex items-center gap-1 text-xs">
          <span>{isOpen ? 'Close guide' : 'Learn more'}</span>
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-4 shadow-2xs"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
