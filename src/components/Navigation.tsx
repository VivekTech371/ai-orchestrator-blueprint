
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingBag, 
  Settings as SettingsIcon,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-1 h-16">
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

        {/* Mobile Navigation */}
        <div className="md:hidden h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-white">Navigation</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="text-white hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/98 backdrop-blur-lg border-b border-gray-700 shadow-xl animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 w-full hover-scale ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
