
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Palette, 
  Key, 
  Download, 
  Trash2, 
  ChevronRight,
  Check,
  Globe,
  Lock,
  Mail,
  Smartphone
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });

  const handleNotificationChange = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
                <p className="text-sm text-gray-400">Manage your personal information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="John Doe"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="john@example.com"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Save Changes
              </Button>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Security</h2>
                <p className="text-sm text-gray-400">Password and authentication settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Change Password</p>
                    <p className="text-sm text-gray-400">Update your account password</p>
                  </div>
                </div>
                <WorkingButton action="security" variant="outline" className="border-gray-600 hover:bg-gray-700 w-full sm:w-auto">
                  Update
                </WorkingButton>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-yellow-500 text-yellow-400 w-full sm:w-auto justify-center">
                  Not Enabled
                </Badge>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <p className="text-sm text-gray-400">Configure how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    notifications.email ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Push Notifications</p>
                    <p className="text-sm text-gray-400">Browser push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNotificationChange('push')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    notifications.push ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">Marketing Updates</p>
                    <p className="text-sm text-gray-400">Product news and updates</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNotificationChange('marketing')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    notifications.marketing ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      notifications.marketing ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <WorkingButton action="notification" className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
                Save Notification Settings
              </WorkingButton>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Billing & Subscription</h2>
                <p className="text-sm text-gray-400">Manage your subscription and billing</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-700/50 rounded-lg mb-4">
              <div>
                <p className="font-medium text-white">Current Plan</p>
                <p className="text-sm text-gray-400">Professional Plan - $29/month</p>
              </div>
              <Badge className="bg-green-500 text-white w-full sm:w-auto justify-center">
                Active
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <WorkingButton action="billing" className="bg-blue-500 hover:bg-blue-600 flex-1">
                Manage Billing
              </WorkingButton>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700 flex-1">
                Usage & Limits
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
                <p className="text-sm text-gray-400">Common settings and preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <span className="text-white font-medium">Appearance</span>
                </div>
                <WorkingButton action="preferences" variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </WorkingButton>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">API Keys</span>
                </div>
                <WorkingButton action="preferences" variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </WorkingButton>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Data Management</h2>
                <p className="text-sm text-gray-400">Export or delete your data</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <WorkingButton action="export" variant="outline" className="border-gray-600 hover:bg-gray-700 flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </WorkingButton>
              <WorkingButton action="delete" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white flex-1">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </WorkingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
