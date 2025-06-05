
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
    <nav className="fixed top-16 left-0 right-0 z-40 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-8 h-16 overflow-x-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
