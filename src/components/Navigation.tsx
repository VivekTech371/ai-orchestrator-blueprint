
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
  Bell,
  Bookmark,
  Edit,
  MessageSquare,
  ChevronDown,
  X,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: HelpCircle, label: 'How It Works', path: '/how-it-works' },
    { icon: FileText, label: 'Templates', path: '/templates' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  ];

  const authenticatedItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Edit, label: 'Drafts', path: '/drafts' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  ];

  const contactItems = [
    { icon: MessageSquare, label: 'Contact', path: '/contact' },
  ];

  const allItems = user 
    ? [...publicItems, ...authenticatedItems, ...contactItems]
    : [...publicItems, ...contactItems];

  const primaryItems = allItems.slice(0, 5);
  const moreItems = allItems.slice(5);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-gray-900/98 backdrop-blur-xl border-b border-gray-800/60 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center h-12">
          <div className="flex items-center space-x-1">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap group',
                    active
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
                  )}
                >
                  <Icon className={cn(
                    'w-4 h-4 transition-transform duration-300',
                    active ? 'scale-110' : 'group-hover:scale-110'
                  )} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {moreItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/80 font-medium text-sm"
                  >
                    <span>More</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-900/98 backdrop-blur-xl border-gray-800 w-48"
                >
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className={cn(
                            'flex items-center space-x-3 w-full px-3 py-2',
                            active ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:text-white'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-12">
            {/* Mobile Menu Items */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
              {primaryItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 min-w-[60px]',
                      active
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/80'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium truncate w-full text-center">
                      {item.label.split(' ')[0]}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/80"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-b border-gray-800 shadow-xl">
              <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
                {allItems.slice(3).map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 w-full',
                        active
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
