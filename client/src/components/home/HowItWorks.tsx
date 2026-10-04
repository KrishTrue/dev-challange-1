import React, { useState } from 'react';
import { CheckSquare, Cpu, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      num: '1',
      title: 'Choose your symptoms',
      desc: 'Pick whatever you are feeling from the clinical categories or search.',
      icon: <CheckSquare className="h-4 w-4 text-blue-600" />,
    },
    {
      num: '2',
      title: 'Analyze pattern matches',
      desc: 'Our trained medical classifier compares your symptoms against known conditions.',
      icon: <Cpu className="h-4 w-4 text-teal-600" />,
    },
    {
      num: '3',
      title: 'Read guidance & next steps',
      desc: 'Get an overview of possible conditions, self-care precautions, and when to see a doctor.',
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white shadow-2xs overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50/80 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700">
            ?
          </span>
          <span>How this symptom checker works</span>
        </span>
        <span className="text-slate-400 flex items-center gap-1 text-xs">
          <span>{isOpen ? 'Close' : 'Learn more'}</span>
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white p-4 shadow-2xs"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 font-medium text-xs text-slate-700">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
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
