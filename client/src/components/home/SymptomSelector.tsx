import React, { useState, useMemo, useRef } from 'react';
import { useAppStore } from '@/store/appStore';
import { SYMPTOMS, SYMPTOM_CATEGORIES } from '@/data/symptoms';
import { Search, X, Check, Trash2, Plus, Sparkles, Filter } from 'lucide-react';
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
  'Abdominal Pain',
  'Dizziness',
];

export const SymptomSelector: React.FC = () => {
  const { selectedSymptoms, addSymptom, removeSymptom, clearSymptoms, isPredicting } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter symptoms based on search term and category
  const filteredSymptoms = useMemo(() => {
    let list = SYMPTOMS;

    if (activeCategory !== 'all') {
      const cat = SYMPTOM_CATEGORIES.find((c) => c.id === activeCategory);
      if (cat) {
        list = cat.symptoms;
      }
    }

    if (!searchTerm.trim()) {
      return list;
    }

    const query = searchTerm.toLowerCase().trim();
    return list.filter((s) => s.toLowerCase().includes(query));
  }, [searchTerm, activeCategory]);

  const handleSelect = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      removeSymptom(symptom);
    } else {
      addSymptom(symptom);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Top Header Bar */}
      <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Report Presenting Symptoms
            </h2>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              132 available
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search symptoms or select from clinical systems below.
          </p>
        </div>

        {selectedSymptoms.length > 0 && (
          <button
            type="button"
            onClick={clearSymptoms}
            disabled={isPredicting}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-red-50 self-start sm:self-auto border border-transparent hover:border-red-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear all ({selectedSymptoms.length})</span>
          </button>
        )}
      </div>

      <div className="p-6 sm:p-7 space-y-6">
        {/* Search Bar with Keyboard & Clear Affordances */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search symptoms (e.g. fever, headache, chest pain, rash)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-11 py-3 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-3 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Navigation Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter by clinical system:
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-[11px] text-blue-600 hover:underline font-medium"
              >
                Reset to all
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={cn(
                'whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border',
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              All ({SYMPTOMS.length})
            </button>

            {SYMPTOM_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              // Count selected in this category
              const selectedInCat = cat.symptoms.filter((s) => selectedSymptoms.includes(s)).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5',
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <span>{cat.label}</span>
                  {selectedInCat > 0 && (
                    <span
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold',
                        isActive ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-700'
                      )}
                    >
                      {selectedInCat}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Select Common Symptoms */}
        {activeCategory === 'all' && !searchTerm && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Frequently Reported Symptoms</span>
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
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer border',
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    )}
                  >
                    <span>{symptom}</span>
                    {isSelected ? (
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    ) : (
                      <Plus className="h-3 w-3 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Symptoms Browse & Check Grid */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">
              {activeCategory === 'all'
                ? searchTerm
                  ? `Search results (${filteredSymptoms.length})`
                  : 'All Symptoms'
                : SYMPTOM_CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </span>
            <span className="text-[11px] text-slate-400">
              Showing {filteredSymptoms.length} options
            </span>
          </div>

          {filteredSymptoms.length === 0 ? (
            <div className="py-12 text-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
              <p className="text-sm font-medium text-slate-600">
                No symptoms found matching &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try a different spelling or browse by clinical system category above.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
              >
                Clear search and filters
              </button>
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 border border-slate-100 rounded-lg p-2 bg-slate-50/30">
              {filteredSymptoms.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => handleSelect(symptom)}
                    className={cn(
                      'flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs transition-all cursor-pointer border',
                      isSelected
                        ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-semibold shadow-2xs'
                        : 'bg-white border-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                    )}
                  >
                    <span className="truncate pr-2">{symptom}</span>
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Symptoms Pill Tray (Visible when user has selected items) */}
        {selectedSymptoms.length > 0 && (
          <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-sky-600" />
                <span className="text-xs font-bold text-sky-950 uppercase tracking-wider">
                  Active Consultation List ({selectedSymptoms.length})
                </span>
              </div>
              <span className="text-[11px] text-sky-700">Click &times; on any item to remove</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200/80 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 shadow-2xs hover:border-sky-300 transition-colors"
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
      </div>
    </div>
  );
};
