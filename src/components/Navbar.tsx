
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, User, LogOut, Settings, Plus, Book } from 'lucide-react';
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Responsive */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block">
              OrchestrAI
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent sm:hidden">
              AI
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {isDashboard && user && (
              <>
                <Link to="/agent-builder">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-sm px-4 py-2">
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden xl:inline">New Workflow</span>
                    <span className="xl:hidden">New</span>
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-sm px-4 py-2">
                    <Book className="w-4 h-4 mr-2" />
                    <span className="hidden xl:inline">Templates</span>
                    <span className="xl:hidden">Templates</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2 sm:px-3">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center space-x-2 w-full">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center space-x-2 text-red-400 w-full">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-sm px-3 py-2">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-sm px-3 py-2">
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {isDashboard && user && (
                <>
                  <Link 
                    to="/agent-builder" 
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors px-2 py-2 rounded hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Workflow</span>
                  </Link>
                  <Link 
                    to="/templates" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-2 py-2 rounded hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Book className="w-4 h-4" />
                    <span>Templates</span>
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
