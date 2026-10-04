import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/appStore';
import { 
  FileText, 
  Info, 
  Activity, 
  HelpCircle, 
  ShieldCheck, 
  Pill, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { parseDiseaseSections } from '@/lib/diseaseParser';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { cn } from '@/lib/utils';
import type { DiseaseSection } from '@/types';

interface DiseaseDescriptionProps {
  diseaseName?: string;
  rawDescription?: string;
  sections?: DiseaseSection[];
  isLoading?: boolean;
}

export const DiseaseDescription: React.FC<DiseaseDescriptionProps> = ({
  diseaseName: propDiseaseName,
  rawDescription: propDescription,
  sections: propSections,
  isLoading: propIsLoading,
}) => {
  const store = useAppStore();
  const prediction = propDiseaseName ?? store.prediction;
  const diseaseDescription = propDescription ?? store.diseaseDescription;
  const isLoading = propIsLoading ?? store.isLoadingDescription;

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'tabs'>('all');
  const [activeTabId, setActiveTabId] = useState<string>('description');

  // Compute parsed sections
  const parsedSections = useMemo(() => {
    if (propSections && propSections.length > 0) return propSections;
    if (!diseaseDescription) return [];
    return parseDiseaseSections(diseaseDescription, prediction || undefined);
  }, [propSections, diseaseDescription, prediction]);

  const activeSection = useMemo(() => {
    return parsedSections.find((s) => s.id === activeTabId) || parsedSections[0];
  }, [parsedSections, activeTabId]);

  const handleCopy = () => {
    if (!diseaseDescription) return;
    navigator.clipboard.writeText(diseaseDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'activity':
        return <Activity className="h-4 w-4 text-sky-600" />;
      case 'help':
        return <HelpCircle className="h-4 w-4 text-amber-600" />;
      case 'shield':
        return <ShieldCheck className="h-4 w-4 text-emerald-600" />;
      case 'pill':
        return <Pill className="h-4 w-4 text-indigo-600" />;
      default:
        return <FileText className="h-4 w-4 text-blue-600" />;
    }
  };

  if (!prediction && !isLoading) return null;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Clinical Overview &amp; Reference Guidance
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Evidence-based breakdown for <span className="font-semibold text-slate-700">{prediction}</span>
            </p>
          </div>
        </div>

        {/* View Switcher & Copy Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {diseaseDescription && (
            <>
              <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={cn(
                    'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5',
                    viewMode === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>All Sections</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('tabs')}
                  className={cn(
                    'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5',
                    viewMode === 'tabs'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Tabs</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                title="Copy clinical report to clipboard"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-7">
        {isLoading ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50/80 px-3 py-2 rounded-lg border border-blue-100 w-fit">
              <Clock className="h-3.5 w-3.5 animate-spin text-blue-600" />
              <span>Synthesizing clinical knowledge, etiology &amp; medications...</span>
            </div>
            <div className="space-y-3 pt-2 animate-pulse">
              <div className="h-4 bg-slate-200/80 rounded w-1/3" />
              <div className="h-3.5 bg-slate-100 rounded w-full" />
              <div className="h-3.5 bg-slate-100 rounded w-5/6" />
              <div className="h-3.5 bg-slate-100 rounded w-4/6" />
            </div>
          </div>
        ) : parsedSections.length > 0 ? (
          <div className="space-y-6">
            {/* ALL SECTIONS FORM (Default & Primary View) */}
            {viewMode === 'all' && (
              <div className="space-y-5 divide-y divide-slate-100">
                {parsedSections.map((section) => (
                  <div
                    key={section.id}
                    className="pt-4 first:pt-0 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-md bg-slate-100 text-slate-700">
                          {getSectionIcon(section.iconName)}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {section.title}
                        </h4>
                      </div>
                      <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', section.badgeColor)}>
                        {section.badgeLabel}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-0.5">
                      <MarkdownRenderer content={section.content} />
                    </div>

                    {/* Context alert for medication */}
                    {section.id === 'medication' && (
                      <div className="rounded-lg border border-amber-200/70 bg-amber-50/60 p-2.5 flex items-start gap-2 text-xs text-amber-950 mt-2.5">
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-amber-950 leading-relaxed">
                          <strong className="font-semibold text-amber-950">Prescription Notice: </strong>
                          All medications, dosages, and therapies must be prescribed and monitored by a licensed physician.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TABBED VIEW (Optional Alternative View) */}
            {viewMode === 'tabs' && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 no-scrollbar">
                  {parsedSections.map((sec) => {
                    const isActive = activeSection?.id === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setActiveTabId(sec.id)}
                        className={cn(
                          'flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border',
                          isActive
                            ? 'bg-blue-50/90 text-blue-900 border-blue-200 shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200/70 hover:bg-slate-50 hover:text-slate-900'
                        )}
                      >
                        {getSectionIcon(sec.iconName)}
                        <span>{sec.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {activeSection && (
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/30 p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-white border border-slate-200">
                          {getSectionIcon(activeSection.iconName)}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {activeSection.title}
                        </h4>
                      </div>
                      <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', activeSection.badgeColor)}>
                        {activeSection.badgeLabel}
                      </span>
                    </div>

                    <MarkdownRenderer 
                      content={activeSection.content} 
                      variant={
                        activeSection.id === 'symptoms'
                          ? 'symptoms'
                          : activeSection.id === 'causes'
                          ? 'causes'
                          : activeSection.id === 'precautions'
                          ? 'precautions'
                          : activeSection.id === 'medication'
                          ? 'medication'
                          : 'general'
                      }
                    />
                  </div>
                )}
              </div>
            )}

            {/* Safety Reminder Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 text-xs">
              <div className="flex-1 rounded-lg border border-slate-200/80 bg-slate-50/60 p-3 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  <strong className="text-slate-800 font-medium">Next steps: </strong>
                  Record the frequency and duration of your symptoms before meeting your physician.
                </span>
              </div>
              <div className="flex-1 rounded-lg border border-amber-200/70 bg-amber-50/40 p-3 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-amber-900/90">
                  <strong className="text-amber-950 font-medium">Emergency care: </strong>
                  Seek immediate hospital attention if experiencing shortness of breath or sudden chest pressure.
                </span>
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
