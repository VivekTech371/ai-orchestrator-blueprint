
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, Plus, Book, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/templates') || 
                     location.pathname.includes('/community') || 
                     location.pathname.includes('/marketplace') || 
                     location.pathname.includes('/settings');

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo - Enhanced with glow effect */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xs sm:text-sm">AI</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
              OrchestrAI
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {isDashboard && user && (
              <>
                <Link to="/agent-builder">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-sm px-3 xl:px-4 py-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-9">
                    <Plus className="w-4 h-4 mr-1 xl:mr-2" />
                    <span className="hidden xl:inline">New Workflow</span>
                    <span className="xl:hidden">New</span>
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-sm px-3 xl:px-4 py-2 hover:border-gray-500 transition-all duration-300 hover:scale-105 h-9">
                    <Book className="w-4 h-4 mr-1 xl:mr-2" />
                    <span className="hidden xl:inline">Templates</span>
                    <span className="xl:hidden">Temp</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons - Enhanced */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2 sm:px-3 hover:bg-gray-800 transition-all duration-300 h-9 sm:h-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium max-w-24 truncate">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800/95 backdrop-blur-lg border-gray-700 w-44 sm:w-48 animate-fade-in">
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center space-x-2 w-full hover:bg-gray-700 transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center space-x-2 text-red-400 w-full hover:bg-gray-700 hover:text-red-300 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-sm px-2 sm:px-3 py-2 hover:bg-gray-800 transition-all duration-300 h-9">
                    <span className="hidden sm:inline">Login</span>
                    <span className="sm:hidden">Sign in</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-sm px-2 sm:px-3 py-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-9">
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Enhanced Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-800 transition-all duration-300 relative h-9 w-9"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`block h-0.5 w-4 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                  <span className={`block h-0.5 w-4 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block h-0.5 w-4 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-gray-800 animate-fade-in">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {isDashboard && user && (
                <>
                  <Link 
                    to="/agent-builder" 
                    className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-all duration-300 px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-800/50 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm sm:text-base">New Workflow</span>
                  </Link>
                  <Link 
                    to="/templates" 
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-800/50 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Book className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm sm:text-base">Templates</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
