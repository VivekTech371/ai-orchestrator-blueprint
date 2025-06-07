
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Navigation } from './Navigation';
import { Chatbot } from './Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5 text-white">
      <Navbar />
      <Navigation />
      <main className="pt-28 sm:pt-32 min-h-screen">
        <div className="w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};
