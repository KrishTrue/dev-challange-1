import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ListChecks } from 'lucide-react';

export const SelectedSymptoms: React.FC = () => {
  const { selectedSymptoms, prediction } = useAppStore();

  if (!prediction || selectedSymptoms.length === 0) return null;

  return (
    <div className="mb-6">
      <Accordion defaultOpen={true}>
        <AccordionItem defaultOpen={true} className="border-slate-200 shadow-2xs">
          <AccordionTrigger className="text-sm font-semibold text-slate-800">
            <span className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-blue-600" />
              <span>Selected Symptoms Summary ({selectedSymptoms.length})</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {selectedSymptoms.map((symptom, idx) => (
                <div
                  key={symptom}
                  className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700"
                >
                  <span className="font-mono text-[11px] font-bold text-slate-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{symptom}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
