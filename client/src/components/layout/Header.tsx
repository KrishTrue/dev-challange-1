import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Activity, BookOpen, Home as HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActiveTab } from '@/types';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="h-4 w-4" /> },
    { id: 'sources', label: 'Sources', icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900">
                AI Disease Predictor
              </span>
              <span className="hidden sm:inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600 border border-blue-100">
                ML Model
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500">Clinical Symptom Classifier</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
