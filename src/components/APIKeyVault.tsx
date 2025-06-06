
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Copy,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  name: string;
  service: string;
  description: string;
  status: 'active' | 'expired' | 'inactive';
  lastUsed: string;
  createdAt: string;
  scopes: string[];
  isVisible: boolean;
  value: string;
}

const APIKeyVault: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'OpenAI Production',
      service: 'OpenAI',
      description: 'Main API key for GPT-4 and other models',
      status: 'active',
      lastUsed: '2 hours ago',
      createdAt: '2024-01-15',
      scopes: ['gpt-4', 'gpt-3.5-turbo', 'embeddings'],
      isVisible: false,
      value: 'sk-...*****...abc123'
    },
    {
      id: '2',
      name: 'Gmail API',
      service: 'Google',
      description: 'Gmail API for email automation',
      status: 'active',
      lastUsed: '1 day ago',
      createdAt: '2024-01-10',
      scopes: ['gmail.readonly', 'gmail.send'],
      isVisible: false,
      value: 'AIza...*****...xyz789'
    },
    {
      id: '3',
      name: 'Twitter Dev',
      service: 'Twitter',
      description: 'Twitter API for social media posting',
      status: 'expired',
      lastUsed: '1 week ago',
      createdAt: '2023-12-20',
      scopes: ['tweet.write', 'users.read'],
      isVisible: false,
      value: 'Bearer ...*****...def456'
    }
  ]);

  const [newKeyModal, setNewKeyModal] = useState(false);

  const toggleVisibility = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, isVisible: !key.isVisible } : key
    ));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success('API key copied to clipboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expired': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'inactive': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800/60 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            API Key Vault
          </CardTitle>
          <Button 
            onClick={() => setNewKeyModal(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Key
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          <span>All keys are encrypted and stored securely</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-white">{apiKey.name}</h4>
                    <Badge className={getStatusColor(apiKey.status)}>
                      {getStatusIcon(apiKey.status)}
                      <span className="ml-1 capitalize">{apiKey.status}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">{apiKey.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Service: {apiKey.service}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                    <span>Created: {apiKey.createdAt}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleVisibility(apiKey.id)}
                    className="h-8 w-8 p-0"
                  >
                    {apiKey.isVisible ? 
                      <EyeOff className="w-4 h-4" /> : 
                      <Eye className="w-4 h-4" />
                    }
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(apiKey.value)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* API Key Value */}
              <div className="mb-3">
                <Label className="text-sm text-gray-400">API Key</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    type={apiKey.isVisible ? 'text' : 'password'}
                    value={apiKey.isVisible ? apiKey.value : '••••••••••••••••••••••••••••••••'}
                    readOnly
                    className="bg-gray-800/50 border-gray-600 text-white font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(apiKey.value)}
                    className="border-gray-600"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {/* Scopes */}
              <div>
                <Label className="text-sm text-gray-400">Permissions</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {apiKey.scopes.map((scope, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-600">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {apiKey.status === 'expired' && (
                <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">This API key has expired and needs to be renewed</span>
                  <Button variant="outline" size="sm" className="ml-auto border-red-500/30 text-red-400">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Renew
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-400 mb-1">Security Best Practices</h4>
              <ul className="text-sm text-blue-300/80 space-y-1">
                <li>• Regularly rotate your API keys</li>
                <li>• Use the principle of least privilege for permissions</li>
                <li>• Monitor API key usage and set up alerts</li>
                <li>• Never share API keys in public repositories</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeyVault;
