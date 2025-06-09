
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Globe, 
  Smartphone,
  Download,
  Trash2,
  Eye,
  Settings as SettingsIcon,
  Key,
  Palette,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and configurations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 p-4 rounded-2xl border border-gray-700 sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                        activeSection === section.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                      <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" placeholder="e.g., AI Engineer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                      <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" placeholder="e.g., Tech Corp" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-24" placeholder="Tell us about yourself..." />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Section */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Palette className="w-5 h-5 text-blue-400" />
                        <div>
                          <h4 className="font-medium text-white">Appearance</h4>
                          <p className="text-sm text-gray-400">Customize theme, colors, and layout</p>
                        </div>
                      </div>
                      <Link to="/appearance">
                        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Key className="w-5 h-5 text-green-400" />
                        <div>
                          <h4 className="font-medium text-white">API Keys</h4>
                          <p className="text-sm text-gray-400">Manage your API keys and integrations</p>
                        </div>
                      </div>
                      <Link to="/api-keys">
                        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Manage
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Download className="w-5 h-5 text-purple-400" />
                        <div>
                          <h4 className="font-medium text-white">Export Data</h4>
                          <p className="text-sm text-gray-400">Download your workflows and data</p>
                        </div>
                      </div>
                      <WorkingButton action="export" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        Export
                      </WorkingButton>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Trash2 className="w-5 h-5 text-red-400" />
                        <div>
                          <h4 className="font-medium text-white">Delete Account</h4>
                          <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                        </div>
                      </div>
                      <WorkingButton action="delete" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                        Delete
                      </WorkingButton>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                      { id: 'push', label: 'Push Notifications', desc: 'Browser notifications' },
                      { id: 'workflow', label: 'Workflow Updates', desc: 'Notifications about your workflows' },
                      { id: 'community', label: 'Community Activity', desc: 'Comments, likes, and mentions' },
                      { id: 'marketing', label: 'Marketing Emails', desc: 'Product updates and tips' }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">{item.label}</h4>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <WorkingButton action="notification" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          Configure
                        </WorkingButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Change Password</h4>
                        <p className="text-sm text-gray-400">Update your account password</p>
                      </div>
                      <WorkingButton action="security" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        Change
                      </WorkingButton>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                      </div>
                      <WorkingButton action="security" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        Enable
                      </WorkingButton>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Active Sessions</h4>
                        <p className="text-sm text-gray-400">Manage your logged-in devices</p>
                      </div>
                      <WorkingButton action="security" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </WorkingButton>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Section */}
            {activeSection === 'billing' && (
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Billing Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Subscription</h4>
                        <p className="text-sm text-gray-400">Manage your subscription plan</p>
                      </div>
                      <WorkingButton action="billing" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        Manage
                      </WorkingButton>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Payment Methods</h4>
                        <p className="text-sm text-gray-400">Update your payment information</p>
                      </div>
                      <WorkingButton action="billing" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        Update
                      </WorkingButton>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Billing History</h4>
                        <p className="text-sm text-gray-400">View your payment history</p>
                      </div>
                      <WorkingButton action="billing" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        View
                      </WorkingButton>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">User Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Language</h4>
                        <p className="text-sm text-gray-400">Choose your preferred language</p>
                      </div>
                      <WorkingButton action="preferences" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        English
                      </WorkingButton>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Timezone</h4>
                        <p className="text-sm text-gray-400">Set your local timezone</p>
                      </div>
                      <WorkingButton action="preferences" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        UTC-5
                      </WorkingButton>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Privacy Settings</h4>
                        <p className="text-sm text-gray-400">Control your privacy preferences</p>
                      </div>
                      <WorkingButton action="preferences" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        Configure
                      </WorkingButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
