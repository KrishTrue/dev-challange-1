import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Activity, BookOpen, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActiveTab } from '@/types';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Symptom Screener', icon: <Stethoscope className="h-4 w-4" /> },
    { id: 'sources', label: 'Clinical & ML Specs', icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white shadow-2xs transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                MediPredict
              </span>
              <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100 uppercase tracking-wider">
                Clinical AI
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 font-medium -mt-0.5">
              Intelligent Symptom Screening
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                  isActive
                    ? 'bg-slate-100 text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
