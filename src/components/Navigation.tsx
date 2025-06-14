
import React, { useState, useEffect } from 'react';
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
  CreditCard,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const publicItems = [
    { icon: Home, label: 'Home', path: '/', priority: 1 },
    { icon: Search, label: 'Browse', path: '/browse-workflows', priority: 2 },
    { icon: FileText, label: 'Templates', path: '/templates', priority: 3 },
    { icon: Users, label: 'Community', path: '/community', priority: 4 },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace', priority: 5 },
    { icon: HelpCircle, label: 'How It Works', path: '/how-it-works', priority: 6 },
  ];

  const authenticatedItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', priority: 1 },
    { icon: Edit, label: 'Drafts', path: '/drafts', priority: 2 },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks', priority: 3 },
    { icon: Bell, label: 'Notifications', path: '/notifications', priority: 4 },
    { icon: CreditCard, label: 'Payments', path: '/payments', priority: 5 },
    { icon: SettingsIcon, label: 'Settings', path: '/settings', priority: 6 },
  ];

  const contactItems = [
    { icon: MessageSquare, label: 'Contact', path: '/contact', priority: 7 },
  ];

  const allItems = user 
    ? [...publicItems, ...authenticatedItems, ...contactItems]
    : [...publicItems, ...contactItems];

  const isActive = (path: string) => location.pathname === path;

  // Get priority items for different screen sizes
  const getVisibleItems = (maxItems: number) => {
    return allItems
      .sort((a, b) => a.priority - b.priority)
      .slice(0, maxItems);
  };

  const getOverflowItems = (maxItems: number) => {
    return allItems
      .sort((a, b) => a.priority - b.priority)
      .slice(maxItems);
  };

  return (
    <nav className={cn(
      "fixed top-14 sm:top-16 left-0 right-0 z-40 transition-all duration-300",
      isScrolled 
        ? "bg-background/98 backdrop-blur-xl border-b border-border/80 shadow-lg" 
        : "bg-background/95 backdrop-blur-xl border-b border-border shadow-md"
    )}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Desktop Navigation (lg+) */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center h-12 xl:h-14">
            <div className="flex items-center space-x-1 overflow-x-hidden">
              {allItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'group relative flex items-center space-x-2 px-3 xl:px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0',
                      active
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/80 hover:shadow-md'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                    
                    {/* Enhanced active indicator */}
                    {active && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-primary-foreground rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tablet Navigation (md to lg) */}
        <div className="hidden md:block lg:hidden">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-1 overflow-hidden flex-1">
              {getVisibleItems(6).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 hover:scale-105',
                      active
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/80'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {getOverflowItems(6).length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-muted-foreground hover:text-foreground flex-shrink-0 hover:bg-accent/80 transition-all duration-300"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background/98 backdrop-blur-xl border border-border shadow-xl">
                  {getOverflowItems(6).map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className={cn(
                            'flex items-center space-x-3 w-full transition-colors duration-200',
                            active && 'bg-accent text-accent-foreground'
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

        {/* Mobile Navigation (sm and below) */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-12">
            {/* Primary Mobile Items */}
            <div className="flex items-center space-x-2 flex-1 overflow-hidden">
              {getVisibleItems(3).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 min-w-[64px] flex-shrink-0 hover:scale-105',
                      active
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/80'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium truncate max-w-[50px]">
                      {item.label.split(' ')[0]}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {/* Enhanced Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "ml-2 text-muted-foreground hover:text-foreground flex-shrink-0 transition-all duration-300 hover:bg-accent/80 rounded-xl",
                isMobileMenuOpen && "bg-accent text-accent-foreground"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Enhanced Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl z-50 animate-fade-in">
                <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                  {getOverflowItems(3).map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full hover:scale-[1.02]',
                          active
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/80'
                        )}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                        {active && (
                          <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                  
                  {getOverflowItems(3).length > 0 && (
                    <div className="pt-2 mt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground px-4 pb-2 font-medium">
                        {getOverflowItems(3).length} more items
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
