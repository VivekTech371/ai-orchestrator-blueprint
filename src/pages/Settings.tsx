
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  Trash2, 
  Smartphone,
  Mail,
  AlertCircle,
  Key,
  Globe,
  LogOut,
  CheckCircle,
  Calendar,
  Lock
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    critical: true
  });
  const [anonymousMode, setAnonymousMode] = useState(user?.isAnonymous || false);
  const [anonymousName, setAnonymousName] = useState('Anonymous_Dragon_42');

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your account preferences</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-80 bg-gray-800 border-gray-700">
              <TabsTrigger value="general" className="data-[state=active]:bg-purple-500">
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-purple-500">
                Security
              </TabsTrigger>
              <TabsTrigger value="identity" className="data-[state=active]:bg-purple-500">
                Identity
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500">
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                      {name.charAt(0)}
                    </div>
                    <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                      Upload New Avatar
                    </Button>
                  </div>
                  
                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    {/* Theme Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                          Auto
                        </Button>
                        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                          Light
                        </Button>
                        <Button className="bg-purple-500 hover:bg-purple-600">
                          Dark
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white">
                      <option>Pacific Time (GMT-8)</option>
                      <option>Mountain Time (GMT-7)</option>
                      <option>Central Time (GMT-6)</option>
                      <option>Eastern Time (GMT-5)</option>
                      <option>UTC (GMT+0)</option>
                    </select>
                  </div>
                  
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Change Password</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <Input
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      Update Password
                    </Button>
                  </div>
                  
                  {/* MFA */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Use Authenticator App
                      </Button>
                      <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Mail className="w-4 h-4 mr-2" />
                        Use Email OTP
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    API & Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">API Keys</h3>
                  <div className="grid grid-cols-5 text-sm font-medium text-gray-400 pb-2 border-b border-gray-700">
                    <span className="col-span-2">Name</span>
                    <span className="col-span-1">Type</span>
                    <span className="col-span-1">Created</span>
                    <span className="col-span-1"></span>
                  </div>
                  
                  {[
                    { name: 'Production Key', type: 'Full Access', created: '10 days ago' },
                    { name: 'Development Key', type: 'Read Only', created: '1 month ago' }
                  ].map((key, index) => (
                    <div key={index} className="grid grid-cols-5 items-center py-3 border-b border-gray-700 text-sm">
                      <span className="col-span-2 text-white font-medium">{key.name}</span>
                      <span className="col-span-1">
                        <Badge className={key.type === 'Full Access' ? 'bg-blue-500' : 'bg-green-500'}>
                          {key.type}
                        </Badge>
                      </span>
                      <span className="col-span-1 text-gray-400">{key.created}</span>
                      <div className="col-span-1 flex items-center space-x-2 justify-end">
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700 text-red-400">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate New API Key
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-red-400">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Logout from All Sessions</h3>
                      <p className="text-gray-400 text-sm">Revoke access from all devices</p>
                    </div>
                    <Button variant="outline" className="border-red-500/40 hover:bg-red-500/20 text-red-400">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout All
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Delete Account</h3>
                        <p className="text-gray-400 text-sm">Permanently delete your account and data</p>
                      </div>
                      <Button variant="outline" className="border-red-500/40 hover:bg-red-500/20 text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Identity Mode Tab */}
            <TabsContent value="identity" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Identity Mode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Anonymous Mode</h3>
                      <p className="text-gray-400">Hide your identity when interacting with the community</p>
                    </div>
                    <Switch 
                      checked={anonymousMode}
                      onCheckedChange={setAnonymousMode}
                    />
                  </div>
                  
                  {anonymousMode && (
                    <div className="pt-4 border-t border-gray-700 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Anonymous Handle
                        </label>
                        <Input
                          value={anonymousName}
                          onChange={(e) => setAnonymousName(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <p className="text-gray-400 text-sm mt-1">This handle will be visible to other users when you're in anonymous mode</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Anonymous Avatar
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            A
                          </div>
                          <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                            Generate Avatar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Connected Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { service: 'GitHub', connected: true, username: 'techuser42', connectedAt: '3 months ago' },
                    { service: 'Google', connected: true, username: 'user@example.com', connectedAt: '5 months ago' },
                    { service: 'Twitter', connected: false, username: null, connectedAt: null },
                  ].map((account, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          {account.service.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{account.service}</h4>
                          {account.connected && (
                            <p className="text-sm text-gray-400">Connected as {account.username}</p>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant={account.connected ? "outline" : "default"}
                        className={account.connected ? "border-gray-600 hover:bg-gray-700" : "bg-purple-500 hover:bg-purple-600"}
                      >
                        {account.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
                    {[
                      { title: 'Workflow Updates', description: 'Get notified when your workflows status changes', enabled: true },
                      { title: 'Community Activity', description: 'Replies to your posts and mentions', enabled: false },
                      { title: 'Product Updates', description: 'New features and improvements', enabled: true },
                      { title: 'Marketing', description: 'Promotions and special offers', enabled: false },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                        <div>
                          <h4 className="font-medium text-white">{item.title}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <Switch checked={item.enabled} />
                      </div>
                    ))}
                  </div>
                  
                  {/* Push Notifications */}
                  <div className="pt-4 border-t border-gray-700 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">Push Notifications</h3>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                    
                    {notifications.push && (
                      <div className="bg-gray-700/40 p-4 rounded-lg">
                        <p className="text-gray-300 text-sm mb-3">
                          Your browser notifications are enabled. You'll receive alerts even when you're not using the application.
                        </p>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Notifications are active</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* SMS Notifications */}
                  <div className="pt-4 border-t border-gray-700 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">SMS Notifications</h3>
                        <p className="text-gray-400 text-sm">Receive critical alerts via text message</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                      />
                    </div>
                    
                    {notifications.sms && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <Input
                          placeholder="+1 (555) 555-5555"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Critical Alerts */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Critical Alerts</h3>
                        <p className="text-gray-400 text-sm">Always receive important notifications</p>
                      </div>
                      <Switch
                        checked={notifications.critical}
                        onCheckedChange={(checked) => setNotifications({...notifications, critical: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
