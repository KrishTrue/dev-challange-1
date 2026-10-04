import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useAppStore } from '@/store/appStore';
import { SYMPTOMS, SYMPTOM_CATEGORIES } from '@/data/symptoms';
import { 
  Bot, 
  User, 
  Send, 
  Search, 
  X, 
  Plus, 
  Check, 
  Activity, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  Pill, 
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';

const QUICK_SUGGESTION_SYMPTOMS = [
  'High Fever',
  'Headache',
  'Cough',
  'Fatigue',
  'Chills',
  'Breathlessness',
  'Joint Pain',
  'Skin Rash',
  'Nausea',
  'Stomach Pain',
  'Dizziness',
  'Vomiting',
];

export const ChatConsultation: React.FC = () => {
  const { 
    messages, 
    selectedSymptoms, 
    addSymptom, 
    removeSymptom, 
    clearSymptoms, 
    isPredicting, 
    submitConsultation, 
  } = useAppStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages update or analysis starts
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPredicting]);

  // Click outside to close dropdown popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter symptoms based on search keyword and category
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

    const term = searchTerm.toLowerCase();
    return list.filter((s) => s.toLowerCase().includes(term));
  }, [activeCategory, searchTerm]);

  const handleSend = async () => {
    if (selectedSymptoms.length === 0 || isPredicting) return;
    setIsDropdownOpen(false);
    setSearchTerm('');
    await submitConsultation(selectedSymptoms);
    clearSymptoms();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // If there's an active search term with match, pick the top item
      if (searchTerm.trim() && filteredSymptoms.length > 0) {
        const topMatch = filteredSymptoms[0];
        if (!selectedSymptoms.includes(topMatch)) {
          addSymptom(topMatch);
          setSearchTerm('');
          return;
        }
      }
      // If we have symptoms selected, run consultation
      if (selectedSymptoms.length > 0) {
        handleSend();
      }
    }
  };

  const handleCopyReport = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'info':
        return <HelpCircle className="h-4 w-4 text-blue-600" />;
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

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden bg-slate-50/50">
      {/* Main Chat Stream (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => {
            // Welcome Assistant Message
            if (message.type === 'welcome') {
              return (
                <div key={message.id} className="flex items-start gap-3 sm:gap-4 max-w-3xl">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs mt-0.5">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="rounded-2xl rounded-tl-sm border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">MediPredict Clinical Assistant</span>
                        <span className="text-[10px] text-slate-400 font-mono">{message.timestamp}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Hello! I am your interactive medical diagnostic assistant. Please select the symptoms you are currently experiencing using the bar at the bottom or click any of the common symptoms below.
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        I will analyze your reported symptoms against 4,920+ training cases with a Random Forest classifier and generate comprehensive clinical guidance covering descriptions, warning signs, causes, precautions, and standard medications.
                      </p>

                      {/* Quick Suggestion Pills */}
                      <div className="pt-3 border-t border-slate-100 space-y-2.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Click to Add Common Symptoms:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {QUICK_SUGGESTION_SYMPTOMS.map((symptom) => {
                            const isSelected = selectedSymptoms.includes(symptom);
                            return (
                              <button
                                key={symptom}
                                type="button"
                                onClick={() => (isSelected ? removeSymptom(symptom) : addSymptom(symptom))}
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer border',
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold'
                                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-2xs'
                                )}
                              >
                                {isSelected ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <Plus className="h-3.5 w-3.5 text-slate-400" />
                                )}
                                <span>{symptom}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // User Message (Right-aligned bubble)
            if (message.sender === 'user') {
              return (
                <div key={message.id} className="flex items-start justify-end gap-3 sm:gap-4 max-w-3xl ml-auto">
                  <div className="flex-1 flex flex-col items-end space-y-1">
                    <div className="rounded-2xl rounded-tr-sm bg-blue-700 text-white p-5 shadow-xs max-w-xl space-y-3 text-left">
                      <div className="flex items-center justify-between gap-4 text-[11px] text-blue-200 border-b border-blue-600/60 pb-2">
                        <span className="font-semibold">You (Patient Report)</span>
                        <span className="font-mono text-[10px]">{message.timestamp}</span>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-blue-50">
                        I am currently experiencing the following {message.symptoms?.length || 0} symptom{message.symptoms?.length === 1 ? '' : 's'}:
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {message.symptoms?.map((symptom) => (
                          <span
                            key={symptom}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-800/80 text-white border border-blue-500/50 text-xs font-medium shadow-2xs"
                          >
                            <Check className="h-3 w-3 text-blue-300" />
                            <span>{symptom}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white shadow-2xs mt-0.5">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              );
            }

            // Assistant Assessment Response (Left-aligned)
            if (message.sender === 'assistant') {
              return (
                <div key={message.id} className="flex items-start gap-3 sm:gap-4 max-w-4xl">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs mt-0.5">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="rounded-2xl rounded-tl-sm border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
                      {/* Top Message Meta Bar */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">MediPredict Clinical Assessment</span>
                          <span className="text-slate-300">&bull;</span>
                          <span className="text-[11px] text-slate-500 font-mono">{message.timestamp}</span>
                        </div>
                        {message.description && (
                          <button
                            type="button"
                            onClick={() => handleCopyReport(message.id, `Diagnostic Match: ${message.prediction}\n\n${message.description}`)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                          >
                            {copiedId === message.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                            <span>{copiedId === message.id ? 'Copied' : 'Copy Report'}</span>
                          </button>
                        )}
                      </div>

                      {/* Error Banner */}
                      {message.error && (
                        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-xs text-red-700 flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-sm mb-0.5">Inference Request Failed</span>
                            <p>{message.error}</p>
                          </div>
                        </div>
                      )}

                      {/* ML Prediction Loading State */}
                      {message.isLoading && (
                        <div className="space-y-4 py-2">
                          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 w-fit">
                            <Clock className="h-4 w-4 animate-spin text-blue-600" />
                            <span>Evaluating symptom vectors via Random Forest ML classifier...</span>
                          </div>
                          <div className="space-y-2.5 animate-pulse">
                            <div className="h-5 bg-slate-200 rounded w-1/3" />
                            <div className="h-3.5 bg-slate-100 rounded w-full" />
                            <div className="h-3.5 bg-slate-100 rounded w-4/5" />
                          </div>
                        </div>
                      )}

                      {/* Primary Diagnostic Banner */}
                      {message.prediction && (
                        <div className="rounded-2xl border border-teal-200/90 bg-linear-to-r from-teal-50/70 via-blue-50/50 to-slate-50/70 p-5 sm:p-6 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              Primary Diagnostic Match
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {message.prediction}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Based on your reported symptom configuration ({message.symptoms?.join(', ')}), our trained Random Forest model calculated <strong className="text-slate-900 font-semibold">{message.prediction}</strong> as the primary matching clinical profile.
                          </p>
                        </div>
                      )}

                      {/* LLM Clinical Knowledge Loading State */}
                      {message.isLoadingDescription && !message.description && (
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50/90 px-3.5 py-2 rounded-xl border border-blue-100 w-fit">
                            <Clock className="h-4 w-4 animate-spin text-blue-600" />
                            <span>Synthesizing comprehensive clinical guidance &amp; precautions...</span>
                          </div>
                          <div className="space-y-2.5 animate-pulse pt-1">
                            <div className="h-4 bg-slate-200/80 rounded w-1/4" />
                            <div className="h-3.5 bg-slate-100 rounded w-full" />
                            <div className="h-3.5 bg-slate-100 rounded w-5/6" />
                            <div className="h-3.5 bg-slate-100 rounded w-4/6" />
                          </div>
                        </div>
                      )}

                      {/* ALL SECTIONS CLINICAL REPORT (Comprehensive Breakdown in All-Section Form) */}
                      {message.sections && message.sections.length > 0 && (
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <Layers className="h-4 w-4 text-blue-600" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Comprehensive Clinical Guidance (All Sections)
                            </h4>
                          </div>

                          <div className="divide-y divide-slate-100">
                            {message.sections.map((sec) => (
                              <div
                                key={sec.id}
                                className="py-5 first:pt-1 last:pb-0 space-y-2.5"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-slate-100 text-slate-700">
                                      {getSectionIcon(sec.iconName)}
                                    </div>
                                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                                      {sec.title}
                                    </span>
                                  </div>
                                  <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', sec.badgeColor)}>
                                    {sec.badgeLabel}
                                  </span>
                                </div>

                                <MarkdownRenderer content={sec.content} className="pl-8" />

                                {sec.id === 'medication' && (
                                  <div className="ml-8 rounded-lg bg-amber-50/60 border border-amber-200/70 p-2.5 flex items-start gap-2 text-xs text-amber-950 mt-2.5">
                                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                    <p className="leading-relaxed">
                                      <strong className="font-semibold text-amber-950">Prescription Notice: </strong>
                                      All medications and dosages must be prescribed and monitored by a licensed healthcare professional.
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Safety & Physician Disclaimer Box */}
                      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 flex items-start gap-2.5">
                          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block mb-0.5">Next Step</span>
                            <span className="text-slate-600">Share this symptom pattern summary with your doctor during your consultation.</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-amber-200/70 bg-amber-50/40 p-3.5 flex items-start gap-2.5">
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-950 block mb-0.5">Emergency Care</span>
                            <span className="text-amber-900/90">Seek immediate ER care if experiencing acute shortness of breath or crushing chest pain.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ChatGPT-style Bottom Sticky Prompt & Symptom Dock */}
      <div className="shrink-0 border-t border-slate-200/90 bg-white/95 backdrop-blur-md p-3 sm:p-4 z-20 shadow-lg">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Active Selected Symptoms Badges */}
          {selectedSymptoms.length > 0 && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-blue-900 px-1">
                Selected Symptoms ({selectedSymptoms.length}):
              </span>
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="inline-flex items-center gap-1 rounded-lg bg-white border border-blue-200 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-2xs"
                >
                  <span>{symptom}</span>
                  <button
                    type="button"
                    onClick={() => removeSymptom(symptom)}
                    className="rounded hover:bg-slate-100 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    title={`Remove ${symptom}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearSymptoms}
                className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline ml-auto px-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Prompt Search & Popover Input */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white p-1.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
              <div className="pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedSymptoms.length === 0
                    ? 'Search and select symptoms (e.g. fever, headache, cough, breathlessness)...'
                    : 'Add more symptoms or press Send to evaluate...'
                }
                className="flex-1 bg-transparent py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />

              {/* Category Filter Selector */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <span>{activeCategory === 'all' ? 'All Categories' : SYMPTOM_CATEGORIES.find((c) => c.id === activeCategory)?.label || 'Category'}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {/* Send / Evaluate Button */}
              <button
                type="button"
                onClick={handleSend}
                disabled={selectedSymptoms.length === 0 || isPredicting}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl font-bold transition-all shadow-2xs cursor-pointer',
                  selectedSymptoms.length > 0 && !isPredicting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
                title={selectedSymptoms.length > 0 ? 'Run diagnostic assessment (Enter)' : 'Select at least 1 symptom'}
              >
                {isPredicting ? (
                  <Clock className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Dropdown Popover with Category Tabs & Symptom Checkboxes */}
            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden flex flex-col max-h-[380px] animate-in fade-in slide-in-from-bottom-2 duration-150">
                {/* Category Bar */}
                <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                      activeCategory === 'all'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    All ({SYMPTOMS.length})
                  </button>
                  {SYMPTOM_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                        activeCategory === cat.id
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      )}
                    >
                      {cat.label} ({cat.symptoms.length})
                    </button>
                  ))}
                </div>

                {/* Filtered Symptoms List */}
                <div className="flex-1 p-3 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                  {filteredSymptoms.length > 0 ? (
                    filteredSymptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => (isSelected ? removeSymptom(symptom) : addSymptom(symptom))}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors border cursor-pointer',
                            isSelected
                              ? 'bg-blue-50/90 text-blue-900 border-blue-300 font-semibold shadow-2xs'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200'
                          )}
                        >
                          <span className="truncate mr-2">{symptom}</span>
                          <span
                            className={cn(
                              'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-slate-300 bg-white'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-8 text-center text-xs text-slate-500">
                      No symptoms found matching &ldquo;{searchTerm}&rdquo;. Try another term.
                    </div>
                  )}
                </div>

                {/* Popover Footer */}
                <div className="p-2.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">
                    {selectedSymptoms.length} symptom{selectedSymptoms.length === 1 ? '' : 's'} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="px-3.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Micro Footer Safety Note */}
          <p className="text-[10px] text-center text-slate-400">
            MediPredict AI is an educational screening model. Not a substitute for clinical physician consultation.
          </p>
        </div>
      </div>
    </div>
  );
};
