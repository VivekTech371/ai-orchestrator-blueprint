
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Palette,
  Globe,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Upload,
  Trash2,
  Download,
  Settings as SettingsIcon,
  Check,
  X,
  AlertTriangle,
  Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Settings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      company: '',
      website: '',
      avatar: ''
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      workflowUpdates: true,
      communityUpdates: false,
      marketingEmails: false,
      securityAlerts: true
    },
    security: {
      twoFactorEnabled: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    billing: {
      plan: 'Pro',
      billingCycle: 'monthly',
      nextBilling: '2024-07-15'
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC-8',
      autoSave: true,
      compactMode: false
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setUnsavedChanges(false);
  };

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const renderProfile = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Profile Information</h2>
        <p className="text-gray-400">Update your personal information and profile settings.</p>
      </div>

      {/* Avatar Section */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {settings.profile.name ? settings.profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 text-red-400 hover:text-red-300 hover-scale transition-all">
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input
              id="name"
              value={settings.profile.name}
              onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-300">Company</Label>
            <Input
              id="company"
              value={settings.profile.company}
              onChange={(e) => handleSettingChange('profile', 'company', e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
              placeholder="Your company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="text-gray-300">Website</Label>
            <Input
              id="website"
              value={settings.profile.website}
              onChange={(e) => handleSettingChange('profile', 'website', e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Label htmlFor="bio" className="text-gray-300">Bio</Label>
          <Textarea
            id="bio"
            value={settings.profile.bio}
            onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
            className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 min-h-[120px]"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
        <p className="text-gray-400">Manage how and when you receive notifications.</p>
      </div>

      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-6">Email Notifications</h3>
        <div className="space-y-6">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account' },
            { key: 'workflowUpdates', label: 'Workflow Updates', desc: 'Get notified when your workflows complete or fail' },
            { key: 'communityUpdates', label: 'Community Updates', desc: 'Receive updates from the community hub' },
            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional emails and product updates' },
            { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications (recommended)' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
              <div className="flex-1">
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
              </div>
              <Switch
                checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                onCheckedChange={(checked) => handleSettingChange('notifications', item.key, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-6">Push Notifications</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex-1">
              <h4 className="text-white font-medium">Browser Notifications</h4>
              <p className="text-gray-400 text-sm mt-1">Receive push notifications in your browser</p>
            </div>
            <Switch
              checked={settings.notifications.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Security Settings</h2>
        <p className="text-gray-400">Manage your account security and authentication methods.</p>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
          <Switch
            checked={settings.security.twoFactorEnabled}
            onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorEnabled', checked)}
          />
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Add an extra layer of security to your account by requiring a verification code in addition to your password.
        </p>
        {!settings.security.twoFactorEnabled && (
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all">
            <Shield className="w-4 h-4 mr-2" />
            Enable 2FA
          </Button>
        )}
      </div>

      {/* Password Change */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-gray-300">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={settings.security.currentPassword}
                onChange={(e) => handleSettingChange('security', 'currentPassword', e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-300">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={settings.security.newPassword}
                onChange={(e) => handleSettingChange('security', 'newPassword', e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={settings.security.confirmPassword}
                onChange={(e) => handleSettingChange('security', 'confirmPassword', e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">Password Requirements:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
        <p className="text-gray-400 text-sm mb-4">
          Manage your API keys for integrating with external services.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Production API Key</h4>
              <p className="text-gray-400 text-sm">Created on Jan 15, 2024</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700/50">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700/50 text-red-400">
                <Trash2 className="w-4 h-4 mr-2" />
                Revoke
              </Button>
            </div>
          </div>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
            <Key className="w-4 h-4 mr-2" />
            Generate New API Key
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Billing & Subscription</h2>
        <p className="text-gray-400">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Pro Plan</h3>
            <p className="text-gray-300">Everything you need for professional automation</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">$29<span className="text-sm font-normal text-gray-400">/month</span></div>
            <p className="text-gray-400 text-sm">Billed monthly</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Workflows</h4>
            <p className="text-2xl font-bold text-blue-400">Unlimited</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Executions</h4>
            <p className="text-2xl font-bold text-blue-400">50K/month</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Team Members</h4>
            <p className="text-2xl font-bold text-blue-400">10</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all">
            Upgrade Plan
          </Button>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
            Change Billing Cycle
          </Button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium">•••• •••• •••• 4242</h4>
                <p className="text-gray-400 text-sm">Expires 12/25</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700/50">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700/50 text-red-400">
                Remove
              </Button>
            </div>
          </div>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'June 15, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'May 15, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'April 15, 2024', amount: '$29.00', status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{invoice.date}</h4>
                <p className="text-gray-400 text-sm">Pro Plan - Monthly</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">{invoice.amount}</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                  {invoice.status}
                </span>
                <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700/50">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Preferences</h2>
        <p className="text-gray-400">Customize your experience with OrchestrAI.</p>
      </div>

      {/* Appearance */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'auto'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSettingChange('preferences', 'theme', theme)}
                  className={`p-3 rounded-lg border-2 transition-all hover-scale ${
                    settings.preferences.theme === theme
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                  }`}
                >
                  <div className="text-white font-medium capitalize">{theme}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Compact Mode</h4>
              <p className="text-gray-400 text-sm">Use a more compact interface layout</p>
            </div>
            <Switch
              checked={settings.preferences.compactMode}
              onCheckedChange={(checked) => handleSettingChange('preferences', 'compactMode', checked)}
            />
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Localization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Language</Label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Timezone</Label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workflow Preferences */}
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Workflow Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Auto-save</h4>
              <p className="text-gray-400 text-sm">Automatically save workflow changes</p>
            </div>
            <Switch
              checked={settings.preferences.autoSave}
              onCheckedChange={(checked) => handleSettingChange('preferences', 'autoSave', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Account <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Settings</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your account preferences, security settings, and subscription details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 sticky top-24 animate-fade-in animation-delay-200">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all hover-scale ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Unsaved Changes Indicator */}
              {unsavedChanges && (
                <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Unsaved Changes</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    You have unsaved changes that will be lost if you leave this page.
                  </p>
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" className="mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="animate-fade-in animation-delay-300">
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'notifications' && renderNotifications()}
              {activeTab === 'security' && renderSecurity()}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'preferences' && renderPreferences()}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between animate-fade-in animation-delay-400">
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all duration-300"
                  onClick={() => {
                    // Reset to original values
                    setUnsavedChanges(false);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
              
              <Button
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-500/20 hover:border-red-500 hover-scale transition-all duration-300"
              >
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
