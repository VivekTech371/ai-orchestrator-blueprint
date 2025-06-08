
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
  Menu,
  Zap
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
    { icon: Home, label: 'Home', path: '/', gradient: 'from-blue-500 to-blue-600' },
    { icon: HelpCircle, label: 'How It Works', path: '/how-it-works', gradient: 'from-purple-500 to-purple-600' },
    { icon: FileText, label: 'Templates', path: '/templates', gradient: 'from-green-500 to-green-600' },
    { icon: Users, label: 'Community', path: '/community', gradient: 'from-orange-500 to-orange-600' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace', gradient: 'from-pink-500 to-pink-600' },
  ];

  const authenticatedItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', gradient: 'from-indigo-500 to-indigo-600' },
    { icon: Edit, label: 'Drafts', path: '/drafts', gradient: 'from-amber-500 to-amber-600' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks', gradient: 'from-teal-500 to-teal-600' },
    { icon: Bell, label: 'Notifications', path: '/notifications', gradient: 'from-red-500 to-red-600' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings', gradient: 'from-gray-500 to-gray-600' },
  ];

  const contactItems = [
    { icon: MessageSquare, label: 'Contact', path: '/contact', gradient: 'from-cyan-500 to-cyan-600' },
  ];

  const allItems = user 
    ? [...publicItems, ...authenticatedItems, ...contactItems]
    : [...publicItems, ...contactItems];

  const primaryItems = allItems.slice(0, 6);
  const moreItems = allItems.slice(6);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center h-14">
          <div className="flex items-center space-x-2 max-w-full">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'group relative flex items-center space-x-3 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden',
                    active
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105 shadow-blue-500/25`
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60 hover:scale-102'
                  )}
                >
                  <div className={cn(
                    'relative z-10 p-1.5 rounded-lg transition-all duration-300',
                    active ? 'bg-white/20' : 'group-hover:bg-white/10'
                  )}>
                    <Icon className={cn(
                      'w-4 h-4 transition-all duration-300',
                      active ? 'scale-110' : 'group-hover:scale-110'
                    )} />
                  </div>
                  <span className="relative z-10 font-semibold">{item.label}</span>
                  
                  {/* Animated background for non-active items */}
                  {!active && (
                    <div className={cn(
                      'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl',
                      item.gradient
                    )}></div>
                  )}
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/40 rounded-full"></div>
                  )}
                </Link>
              );
            })}
            
            {moreItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group flex items-center space-x-2 px-5 py-3 text-gray-300 hover:text-white hover:bg-gray-800/60 font-medium text-sm transition-all duration-300 hover:scale-102 rounded-xl"
                  >
                    <div className="p-1.5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">More</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50 w-56 shadow-2xl rounded-xl p-2"
                >
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <DropdownMenuItem key={item.path} asChild className="p-0">
                        <Link
                          to={item.path}
                          className={cn(
                            'flex items-center space-x-3 w-full px-4 py-3 transition-all duration-300 rounded-lg',
                            active 
                              ? `bg-gradient-to-r ${item.gradient} text-white` 
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                          )}
                        >
                          <div className={cn(
                            'p-1 rounded transition-all duration-300',
                            active ? 'bg-white/20' : 'group-hover:bg-white/10'
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{item.label}</span>
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
            {/* Mobile Menu Items - Horizontal Scroll */}
            <div className="flex items-center space-x-2 flex-1 overflow-x-auto scrollbar-hide">
              {primaryItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 min-w-[70px] flex-shrink-0 relative overflow-hidden',
                      active
                        ? `bg-gradient-to-r ${item.gradient} text-white scale-105`
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                    )}
                  >
                    <div className={cn(
                      'p-1 rounded-lg transition-all duration-300',
                      active ? 'bg-white/20' : 'hover:bg-white/10'
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold truncate w-full text-center">
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
              className="p-3 text-gray-300 hover:text-white hover:bg-gray-800/60 ml-2 flex-shrink-0 rounded-xl transition-all duration-300"
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
            <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
              <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {allItems.slice(4).map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 w-full relative overflow-hidden',
                        active
                          ? `bg-gradient-to-r ${item.gradient} text-white`
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                      )}
                    >
                      <div className={cn(
                        'p-2 rounded-lg transition-all duration-300',
                        active ? 'bg-white/20' : 'hover:bg-white/10'
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-base">{item.label}</span>
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
