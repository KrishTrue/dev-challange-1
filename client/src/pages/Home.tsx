import React from 'react';
import { ChatConsultation } from '@/components/home/ChatConsultation';

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden bg-slate-50">
      <ChatConsultation />
    </div>
  );
};
