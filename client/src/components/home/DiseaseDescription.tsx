import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Sparkles, BookOpen, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const DiseaseDescription: React.FC = () => {
  const { prediction, diseaseDescription, isLoadingDescription } = useAppStore();

  if (!prediction && !isLoadingDescription) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs mb-6 overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Clinical Overview &amp; Guidance
            </h3>
            <p className="text-xs text-slate-500">
              Medical knowledge synthesized for {prediction}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-2.5 py-1 text-[11px] font-semibold text-blue-700 border border-blue-200/60 self-start sm:self-auto">
          <Sparkles className="h-3 w-3 text-blue-600" />
          <span>Gemini Medical AI</span>
        </span>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8">
        {isLoadingDescription ? (
          <div className="space-y-5 animate-pulse py-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Clock className="h-4 w-4 animate-spin" />
              <span>Generating comprehensive clinical overview and precautions...</span>
            </div>
            <div className="space-y-2.5 pt-2">
              <div className="h-4 bg-slate-200/70 rounded w-1/4" />
              <div className="h-3.5 bg-slate-100 rounded w-full" />
              <div className="h-3.5 bg-slate-100 rounded w-5/6" />
              <div className="h-3.5 bg-slate-100 rounded w-4/6" />
            </div>
            <div className="space-y-2.5 pt-4">
              <div className="h-4 bg-slate-200/70 rounded w-1/3" />
              <div className="h-3.5 bg-slate-100 rounded w-full" />
              <div className="h-3.5 bg-slate-100 rounded w-11/12" />
            </div>
          </div>
        ) : diseaseDescription ? (
          <div className="space-y-6">
            {/* Markdown Output with clinical typography */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700 [&>h1]:text-base [&>h1]:font-bold [&>h1]:text-slate-900 [&>h1]:mt-4 [&>h1]:mb-2 [&>h2]:text-sm [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:border-b [&>h2]:border-slate-100 [&>h2]:pb-1.5 [&>h2]:mt-5 [&>h2]:mb-2.5 [&>h3]:text-xs [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-3 [&>h3]:mb-1 [&>p]:text-slate-600 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul>li]:text-slate-600 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ol>li]:text-slate-600 [&>strong]:text-slate-900 [&>strong]:font-semibold">
              <ReactMarkdown>{diseaseDescription}</ReactMarkdown>
            </div>

            {/* Practical Medical Advice Footer */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-200/80 bg-slate-50/60 p-3 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Recommended Next Step</span>
                  <span className="text-slate-600">Note symptom duration and triggers to share with a physician.</span>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200/70 bg-amber-50/40 p-3 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-950 block">When to Seek Immediate Care</span>
                  <span className="text-amber-900/80">Sudden shortness of breath, acute chest pressure, or loss of consciousness.</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-500 italic py-2">
            No additional clinical description available for this condition.
          </p>
        )}
      </div>
    </div>
  );
};
