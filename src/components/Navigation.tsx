
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingBag, 
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/', showWhen: 'always' },
    { icon: HelpCircle, label: 'How It Works', path: '/how-it-works', showWhen: 'always' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', showWhen: 'authenticated' },
    { icon: FileText, label: 'Templates', path: '/templates', showWhen: 'always' },
    { icon: Users, label: 'Community', path: '/community', showWhen: 'always' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace', showWhen: 'always' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings', showWhen: 'authenticated' },
  ];

  const filteredItems = navigationItems.filter(item => {
    if (item.showWhen === 'always') return true;
    if (item.showWhen === 'authenticated') return !!user;
    return false;
  });

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-1 h-16 overflow-x-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap group hover-scale ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50 hover:shadow-md'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
