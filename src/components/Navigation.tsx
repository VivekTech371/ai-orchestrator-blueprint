
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingBag, 
  Settings as SettingsIcon,
  HelpCircle,
  Menu,
  X,
  Bell,
  Bookmark,
  Edit,
  MessageSquare
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
    { icon: Edit, label: 'Drafts', path: '/drafts', showWhen: 'authenticated' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks', showWhen: 'authenticated' },
    { icon: Bell, label: 'Notifications', path: '/notifications', showWhen: 'authenticated' },
    { icon: MessageSquare, label: 'Contact', path: '/contact', showWhen: 'always' },
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
    <nav className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center space-x-1 h-14 sm:h-16 overflow-x-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-2 xl:px-3 py-2 sm:py-3 rounded-lg transition-all duration-300 whitespace-nowrap group hover-scale text-xs xl:text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50 hover:shadow-md'
                }`}
              >
                <Icon className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="font-medium hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden items-center justify-center space-x-1 h-14 sm:h-16 overflow-x-auto">
          {filteredItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-300 group hover-scale text-xs ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className={`w-3 h-3 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="font-medium truncate max-w-[50px]">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm sm:text-base font-semibold text-white">Navigation</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="text-white hover:bg-gray-700 h-8 w-8 sm:h-9 sm:w-9"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/98 backdrop-blur-lg border-b border-gray-700 shadow-xl animate-fade-in z-50 max-h-[70vh] overflow-y-auto">
            <div className="px-2 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 w-full hover-scale ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform flex-shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="text-sm sm:text-base font-medium">{item.label}</span>
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
