
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Layout, 
  Users, 
  ShoppingCart, 
  Settings, 
  Plus,
  Book
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Layout, label: 'Templates', path: '/templates' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: ShoppingCart, label: 'Marketplace', path: '/marketplace' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 p-4 z-30">
      <div className="flex flex-col h-full">
        {/* Quick Actions */}
        <div className="mb-6">
          <Link to="/agent-builder">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 mb-2">
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </Link>
          <Link to="/templates">
            <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
              <Book className="w-4 h-4 mr-2" />
              Start from Template
            </Button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
