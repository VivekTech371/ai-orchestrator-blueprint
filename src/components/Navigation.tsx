
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center h-14">
            <div className="flex items-center space-x-1">
              {allItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'group relative flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105',
                      active
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:block lg:hidden">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
              {allItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {allItems.length > 6 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <Menu className="w-4 h-4" />
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {allItems.slice(6).map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className={cn(
                            'flex items-center space-x-2 w-full',
                            active && 'bg-accent'
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
        <div className="md:hidden">
          <div className="flex items-center justify-between h-12">
            {/* Primary Mobile Items */}
            <div className="flex items-center space-x-1 flex-1 overflow-x-auto scrollbar-none">
              {allItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-[60px]',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium truncate">
                      {item.label.split(' ')[0]}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-xl">
              <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
                {allItems.slice(3).map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 w-full',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
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
