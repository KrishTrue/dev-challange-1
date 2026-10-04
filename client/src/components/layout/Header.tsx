import React from 'react';
import { useAppStore } from '@/store/appStore';
import { BookOpen, Bot, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, resetChat } = useAppStore();

  const handleBrandClick = () => {
    setActiveTab('home');
  };

  const handleNewChat = () => {
    setActiveTab('home');
    resetChat();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div 
          onClick={handleBrandClick}
          className="cursor-pointer select-none"
        >
          <span className="text-base font-extrabold tracking-tight text-slate-900 hover:text-slate-700 transition-colors">
            MediPredict
          </span>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2">
          {activeTab === 'home' && (
            <button
              type="button"
              onClick={handleNewChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              title="Start a new consultation"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">New Consultation</span>
            </button>
          )}

          <nav className="flex items-center gap-1" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer',
                activeTab === 'home'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Assistant</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sources')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer',
                activeTab === 'sources'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ML &amp; Specs</span>
              <span className="sm:hidden">Specs</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
