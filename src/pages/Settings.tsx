
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette, 
  Key,
  Globe,
  Download,
  Trash2,
  ChevronRight
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Manage your account information',
      icon: User,
      action: 'preferences'
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Configure your notification settings',
      icon: Bell,
      action: 'notification'
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Manage your account security',
      icon: Shield,
      action: 'security'
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'View and manage your subscription',
      icon: CreditCard,
      action: 'billing'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize your interface',
      icon: Palette,
      action: 'preferences'
    },
    {
      id: 'api',
      title: 'API Keys',
      description: 'Manage your API access',
      icon: Key,
      action: 'security'
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" defaultValue="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" defaultValue="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" defaultValue="johndoe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" placeholder="City, Country" />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-24" placeholder="Tell us about yourself..." />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', description: 'Receive notifications via email' },
                  { title: 'Push Notifications', description: 'Get push notifications in your browser' },
                  { title: 'Agent Updates', description: 'Notifications about your agents' },
                  { title: 'Community Activity', description: 'Updates from the community' },
                  { title: 'Marketing Emails', description: 'Promotional emails and newsletters' }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium text-white">{setting.title}</h4>
                      <p className="text-sm text-gray-400">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <WorkingButton 
                action="notification"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Save Preferences
              </WorkingButton>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Change Password</h4>
                  <p className="text-sm text-gray-400 mb-4">Update your password to keep your account secure</p>
                  <WorkingButton 
                    action="security"
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    Change Password
                  </WorkingButton>
                </div>
                
                <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
                  <WorkingButton 
                    action="security"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Enable 2FA
                  </WorkingButton>
                </div>
                
                <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Active Sessions</h4>
                  <p className="text-sm text-gray-400 mb-4">Manage your active login sessions</p>
                  <WorkingButton 
                    action="security"
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    View Sessions
                  </WorkingButton>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Billing & Subscription</h3>
              
              <div className="bg-gray-800/60 rounded-lg border border-gray-700 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white">Current Plan</h4>
                    <p className="text-gray-400">Pro Plan - $29/month</p>
                  </div>
                  <Badge className="bg-green-500 text-white">Active</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">100</p>
                    <p className="text-sm text-gray-400">Agents Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">∞</p>
                    <p className="text-sm text-gray-400">API Calls</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">5TB</p>
                    <p className="text-sm text-gray-400">Storage</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <WorkingButton 
                    action="billing"
                    variant="outline"
                    className="flex-1 border-gray-600 hover:bg-gray-700"
                  >
                    Manage Subscription
                  </WorkingButton>
                  <WorkingButton 
                    action="billing"
                    variant="outline"
                    className="flex-1 border-gray-600 hover:bg-gray-700"
                  >
                    View Invoices
                  </WorkingButton>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                <h4 className="font-medium text-white mb-2">Payment Method</h4>
                <p className="text-sm text-gray-400 mb-4">•••• •••• •••• 4242 (Expires 12/25)</p>
                <WorkingButton 
                  action="billing"
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-700"
                >
                  Update Payment Method
                </WorkingButton>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-16">
            <SettingsIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Settings Section</h3>
            <p className="text-gray-400">Content for this section is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account preferences and configuration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 rounded-xl border border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{section.title}</p>
                        <p className="text-xs opacity-75 truncate">{section.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              {renderSectionContent()}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-red-900/20 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Export Data</h4>
                <p className="text-sm text-gray-400">Download all your data in JSON format</p>
              </div>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-400">Delete Account</h4>
                <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
              </div>
              <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-900/30">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
