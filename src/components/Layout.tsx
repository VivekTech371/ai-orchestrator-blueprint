
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
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Navigation />
      <main className="pt-32">
        <div className="w-full max-w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};
