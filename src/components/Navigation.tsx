
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

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  priority: number;
}

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

  // Navigation items configuration
  const publicItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/', priority: 1 },
    { icon: Search, label: 'Browse', path: '/browse-workflows', priority: 2 },
    { icon: FileText, label: 'Templates', path: '/templates', priority: 3 },
    { icon: Users, label: 'Community', path: '/community', priority: 4 },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace', priority: 5 },
    { icon: HelpCircle, label: 'How It Works', path: '/how-it-works', priority: 6 },
  ];

  const authenticatedItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', priority: 1 },
    { icon: Edit, label: 'Drafts', path: '/drafts', priority: 2 },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks', priority: 3 },
    { icon: Bell, label: 'Notifications', path: '/notifications', priority: 4 },
    { icon: CreditCard, label: 'Payments', path: '/payments', priority: 5 },
    { icon: SettingsIcon, label: 'Settings', path: '/settings', priority: 6 },
  ];

  const contactItems: NavItem[] = [
    { icon: MessageSquare, label: 'Contact', path: '/contact', priority: 7 },
  ];

  // Get all items based on auth state
  const allItems = user 
    ? [...publicItems, ...authenticatedItems, ...contactItems]
    : [...publicItems, ...contactItems];

  const isActive = (path: string) => location.pathname === path;

  // Navigation link component
  const NavLink: React.FC<{ 
    item: NavItem; 
    className?: string; 
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }> = ({ item, className, showLabel = true, size = 'md' }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    const sizeClasses = {
      sm: 'px-2 py-1.5 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-sm'
    };

    return (
      <Link
        to={item.path}
        className={cn(
          'group relative flex items-center space-x-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap',
          sizeClasses[size],
          active
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/80 hover:shadow-md',
          className
        )}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        {showLabel && <span className="truncate">{item.label}</span>}
        
        {/* Active indicator */}
        {active && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-primary-foreground rounded-full animate-pulse" />
        )}
      </Link>
    );
  };

  // Mobile menu item component
  const MobileMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <Link
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
  };

  // Get items for different breakpoints
  const getVisibleItems = (count: number) => {
    return allItems
      .sort((a, b) => a.priority - b.priority)
      .slice(0, count);
  };

  const getHiddenItems = (visibleCount: number) => {
    return allItems
      .sort((a, b) => a.priority - b.priority)
      .slice(visibleCount);
  };

  return (
    <nav className={cn(
      "fixed top-14 sm:top-16 left-0 right-0 z-40 transition-all duration-300",
      isScrolled 
        ? "bg-background/98 backdrop-blur-xl border-b border-border/80 shadow-lg" 
        : "bg-background/95 backdrop-blur-xl border-b border-border shadow-md"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Navigation (lg and above) */}
        <div className="hidden lg:flex items-center justify-center h-14">
          <div className="flex items-center justify-center space-x-2 max-w-full">
            {allItems.map((item) => (
              <NavLink key={item.path} item={item} size="lg" />
            ))}
          </div>
        </div>

        {/* Tablet Navigation (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-between h-12">
          {/* Visible items */}
          <div className="flex items-center space-x-1 flex-1 min-w-0">
            {getVisibleItems(5).map((item) => (
              <NavLink 
                key={item.path} 
                item={item} 
                size="md"
                showLabel={false}
                className="flex-shrink-0" 
              />
            ))}
          </div>
          
          {/* Overflow menu */}
          {getHiddenItems(5).length > 0 && (
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
                {getHiddenItems(5).map((item) => {
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

        {/* Mobile Navigation (below md) */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-12">
            {/* Primary mobile items */}
            <div className="flex items-center space-x-1 flex-1 min-w-0">
              {getVisibleItems(3).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[60px] flex-shrink-0 hover:scale-105',
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/80'
                  )}
                >
                  <item.icon className="w-4 h-4 mb-1" />
                  <span className="text-xs font-medium leading-none">
                    {item.label.split(' ')[0]}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "ml-2 text-muted-foreground hover:text-foreground flex-shrink-0 transition-all duration-300 hover:bg-accent/80 rounded-xl p-2",
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

          {/* Mobile dropdown menu */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu content */}
              <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl z-50 animate-fade-in">
                <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                  {getHiddenItems(3).map((item) => (
                    <MobileMenuItem key={item.path} item={item} />
                  ))}
                  
                  {getHiddenItems(3).length > 0 && (
                    <div className="pt-2 mt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground px-4 pb-2 font-medium">
                        {getHiddenItems(3).length} more items
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
