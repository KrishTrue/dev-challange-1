import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/Home';
import { SourcesPage } from '@/pages/Sources';

export const App: React.FC = () => {
  const { activeTab } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-hidden flex flex-col">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'sources' && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <SourcesPage />
            </div>
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;