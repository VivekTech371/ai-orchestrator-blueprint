
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Monitor, 
  Sun, 
  Moon, 
  Smartphone, 
  Type, 
  Layout, 
  Check,
  Eye,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Appearance = () => {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('blue');
  const [layout, setLayout] = useState('comfortable');

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { id: 'system', name: 'System', icon: Monitor, description: 'Follow system preference' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', size: '14px', description: 'Compact text size' },
    { id: 'medium', name: 'Medium', size: '16px', description: 'Default text size' },
    { id: 'large', name: 'Large', size: '18px', description: 'Larger text for better readability' }
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Ocean Blue', color: 'from-blue-500 to-cyan-500', primary: '#3B82F6' },
    { id: 'purple', name: 'Royal Purple', color: 'from-purple-500 to-pink-500', primary: '#8B5CF6' },
    { id: 'green', name: 'Forest Green', color: 'from-green-500 to-emerald-500', primary: '#10B981' },
    { id: 'orange', name: 'Sunset Orange', color: 'from-orange-500 to-red-500', primary: '#F97316' },
    { id: 'teal', name: 'Teal Wave', color: 'from-teal-500 to-cyan-500', primary: '#14B8A6' },
    { id: 'indigo', name: 'Deep Indigo', color: 'from-indigo-500 to-purple-500', primary: '#6366F1' }
  ];

  const layouts = [
    { id: 'compact', name: 'Compact', description: 'Minimal spacing for more content' },
    { id: 'comfortable', name: 'Comfortable', description: 'Balanced spacing (recommended)' },
    { id: 'spacious', name: 'Spacious', description: 'Extra spacing for better accessibility' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Appearance</h1>
          <p className="text-gray-400">Customize how OrchestrAI looks and feels</p>
        </div>

        {/* Theme Selection */}
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Theme</h3>
          </div>
          <p className="text-gray-400 mb-6">Choose your preferred color theme</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={cn(
                    'relative p-4 rounded-xl border transition-all duration-200 text-left',
                    theme === themeOption.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-700/50'
                  )}
                >
                  {theme === themeOption.id && (
                    <Check className="absolute top-3 right-3 w-5 h-5 text-blue-400" />
                  )}
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="w-6 h-6 text-gray-400" />
                    <span className="font-medium text-white">{themeOption.name}</span>
                  </div>
                  <p className="text-sm text-gray-400">{themeOption.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Scheme */}
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Type className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Color Scheme</h3>
          </div>
          <p className="text-gray-400 mb-6">Select your preferred accent color</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id)}
                className={cn(
                  'relative p-4 rounded-xl border transition-all duration-200 text-left',
                  colorScheme === scheme.id
                    ? 'border-gray-500 bg-gray-700/50 ring-2 ring-blue-500/20'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-700/30'
                )}
              >
                {colorScheme === scheme.id && (
                  <Check className="absolute top-3 right-3 w-4 h-4 text-blue-400" />
                )}
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${scheme.color}`} />
                  <span className="font-medium text-white text-sm">{scheme.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Type className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Font Size</h3>
          </div>
          <p className="text-gray-400 mb-6">Adjust text size for better readability</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fontSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={cn(
                  'relative p-4 rounded-xl border transition-all duration-200 text-left',
                  fontSize === size.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-700/50'
                )}
              >
                {fontSize === size.id && (
                  <Check className="absolute top-3 right-3 w-5 h-5 text-blue-400" />
                )}
                <div className="mb-2">
                  <span className="font-medium text-white">{size.name}</span>
                  <span className="text-sm text-gray-400 ml-2">({size.size})</span>
                </div>
                <p className="text-sm text-gray-400">{size.description}</p>
                <div className="mt-3 p-2 bg-gray-600/50 rounded text-white" style={{ fontSize: size.size }}>
                  Sample text
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Layout Density */}
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Layout className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Layout Density</h3>
          </div>
          <p className="text-gray-400 mb-6">Control spacing and density of interface elements</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {layouts.map((layoutOption) => (
              <button
                key={layoutOption.id}
                onClick={() => setLayout(layoutOption.id)}
                className={cn(
                  'relative p-4 rounded-xl border transition-all duration-200 text-left',
                  layout === layoutOption.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-700/50'
                )}
              >
                {layout === layoutOption.id && (
                  <Check className="absolute top-3 right-3 w-5 h-5 text-blue-400" />
                )}
                <div className="mb-2">
                  <span className="font-medium text-white">{layoutOption.name}</span>
                </div>
                <p className="text-sm text-gray-400">{layoutOption.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Preview</h3>
          </div>
          <p className="text-gray-400 mb-6">See how your settings will look</p>
          
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorSchemes.find(s => s.id === colorScheme)?.color} flex items-center justify-center`}>
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white" style={{ fontSize: fontSizes.find(s => s.id === fontSize)?.size }}>
                  Sample Workflow
                </h4>
                <p className="text-gray-400 text-sm">This is how content will appear</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4" style={{ fontSize: fontSizes.find(s => s.id === fontSize)?.size }}>
              Your customized interface will use these appearance settings throughout the application.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" className={`bg-gradient-to-r ${colorSchemes.find(s => s.id === colorScheme)?.color}`}>
                Primary Button
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600">
                Secondary Button
              </Button>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Save Changes
          </Button>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
