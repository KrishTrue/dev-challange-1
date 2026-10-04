import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/Home';
import { SourcesPage } from '@/pages/Sources';

export const App: React.FC = () => {
  const { activeTab } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Area with generous breathing room */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'sources' && <SourcesPage />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;