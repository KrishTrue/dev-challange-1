import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { SYMPTOMS } from '@/data/symptoms';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Check, Trash2, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const COMMON_SYMPTOMS = [
  'High Fever',
  'Headache',
  'Cough',
  'Fatigue',
  'Nausea',
  'Chills',
  'Joint Pain',
  'Skin Rash',
  'Breathlessness',
  'Vomiting',
];

export const SymptomSelector: React.FC = () => {
  const { selectedSymptoms, addSymptom, removeSymptom, clearSymptoms, isPredicting } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter symptoms based on search term
  const filteredSymptoms = useMemo(() => {
    if (!searchTerm.trim()) {
      return SYMPTOMS;
    }
    const query = searchTerm.toLowerCase();
    return SYMPTOMS.filter((s) => s.toLowerCase().includes(query));
  }, [searchTerm]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      removeSymptom(symptom);
    } else {
      addSymptom(symptom);
    }
    // keep search focus
    inputRef.current?.focus();
  };

  return (
    <Card className="border-slate-200 shadow-xs mb-6">
      <CardContent className="p-6 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Select your symptoms</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {SYMPTOMS.length} available
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Choose all symptoms that apply to your current condition.
            </p>
          </div>

          {selectedSymptoms.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSymptoms}
              disabled={isPredicting}
              className="text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 self-start sm:self-auto gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear selection ({selectedSymptoms.length})
            </Button>
          )}
        </div>

        {/* Searchable Multi-Select Input & Dropdown */}
        <div ref={containerRef} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type to search symptoms (e.g., Fever, Headache, Rash)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="pl-9 pr-9 h-11 text-sm bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown List */}
          {isDropdownOpen && (
            <div className="absolute z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
              <div className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 border-b border-slate-100 mb-1">
                <span>Symptoms Matching &ldquo;{searchTerm || 'All'}&rdquo;</span>
                <span>{filteredSymptoms.length} results</span>
              </div>

              {filteredSymptoms.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500">
                  No symptoms found matching &ldquo;{searchTerm}&rdquo;
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {filteredSymptoms.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => handleSelect(symptom)}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all cursor-pointer',
                          isSelected
                            ? 'bg-blue-50 text-blue-900 font-medium'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        )}
                      >
                        <span className="truncate pr-2">{symptom}</span>
                        {isSelected ? (
                          <Check className="h-4 w-4 shrink-0 text-blue-600" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 shrink-0 text-slate-400 opacity-60" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick select suggestions */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Common Symptoms:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_SYMPTOMS.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleSelect(symptom)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer border',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  )}
                >
                  <span>{symptom}</span>
                  {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3 text-slate-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Symptoms Badges Pill Container */}
        {selectedSymptoms.length > 0 && (
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Selected Symptoms ({selectedSymptoms.length})
              </span>
              <span className="text-xs text-blue-600 font-medium">Click &times; to remove</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-slate-800 shadow-2xs transition-all hover:border-blue-300"
                >
                  <span>{symptom}</span>
                  <button
                    type="button"
                    onClick={() => removeSymptom(symptom)}
                    aria-label={`Remove ${symptom}`}
                    className="rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
