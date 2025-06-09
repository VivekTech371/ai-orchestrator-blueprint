
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit, 
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ApiKeys = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'ak_prod_1234567890abcdef1234567890abcdef',
      description: 'Main API key for production workflows',
      created: '2023-12-01',
      lastUsed: '2024-01-05',
      permissions: ['read', 'write', 'admin'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'ak_dev_abcdef1234567890abcdef1234567890',
      description: 'API key for development and testing',
      created: '2023-11-15',
      lastUsed: '2024-01-04',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Analytics Webhook',
      key: 'ak_webhook_567890abcdef1234567890abcdef1234',
      description: 'Read-only key for analytics and reporting',
      created: '2023-10-20',
      lastUsed: '2023-12-28',
      permissions: ['read'],
      status: 'inactive'
    }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const maskApiKey = (key: string) => {
    const prefix = key.substring(0, 8);
    const suffix = key.substring(key.length - 4);
    return `${prefix}${'•'.repeat(20)}${suffix}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'inactive':
        return 'bg-gray-500 text-white';
      case 'expired':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'admin':
        return 'bg-red-500/20 text-red-400';
      case 'write':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'read':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
            <p className="text-gray-400">Manage your API keys for integrations and workflows</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-500 hover:bg-blue-600 mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Key
          </Button>
        </div>

        {/* Security Warning */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-400 mb-1">Keep your API keys secure</h3>
              <p className="text-yellow-300/80 text-sm">
                Never share your API keys publicly or commit them to version control. 
                Treat them like passwords and store them securely.
              </p>
            </div>
          </div>
        </div>

        {/* Create API Key Form */}
        {showCreateForm && (
          <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Create New API Key</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Production API Key"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea 
                    placeholder="Describe what this key will be used for..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-24"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                  <div className="space-y-2">
                    {['read', 'write', 'admin'].map((permission) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-300 capitalize">{permission}</span>
                        {permission === 'admin' && (
                          <Badge className="bg-red-500/20 text-red-400 text-xs">High Risk</Badge>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiration (Optional)</label>
                  <input 
                    type="date" 
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Create API Key
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{apiKey.name}</h3>
                      <p className="text-gray-400 text-sm">{apiKey.description}</p>
                    </div>
                    <Badge className={getStatusColor(apiKey.status)}>
                      {apiKey.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                    </Badge>
                  </div>

                  {/* API Key Display */}
                  <div className="bg-gray-700/50 p-3 rounded-lg mb-3">
                    <div className="flex items-center justify-between">
                      <code className="text-gray-300 text-sm font-mono">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                      </code>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {visibleKeys.has(apiKey.id) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} className={getPermissionColor(permission)}>
                        <Shield className="w-3 h-3 mr-1" />
                        {permission}
                      </Badge>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Created: {apiKey.created}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                  <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                    <Edit className="w-3 h-3 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                    <Trash2 className="w-3 h-3 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Usage Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
            <div>
              <h4 className="font-medium text-white mb-2">Authentication</h4>
              <p>Include your API key in the Authorization header:</p>
              <code className="block bg-gray-700/50 p-2 rounded mt-2 text-xs">
                Authorization: Bearer your_api_key_here
              </code>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Rate Limits</h4>
              <ul className="space-y-1">
                <li>• 1000 requests per hour for read operations</li>
                <li>• 500 requests per hour for write operations</li>
                <li>• 100 requests per hour for admin operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
