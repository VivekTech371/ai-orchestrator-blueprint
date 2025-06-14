
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '@/contexts/AgentContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Edit, 
  Play, 
  Pause, 
  ArrowLeft, 
  Settings, 
  Globe, 
  Lock,
  Calendar,
  Thermometer,
  Hash
} from 'lucide-react';

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgent, toggleAgentStatus } = useAgent();
  
  const agent = id ? getAgent(id) : undefined;

  if (!agent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Agent not found</h3>
          <p className="text-gray-400 mb-6">The agent you're looking for doesn't exist or has been deleted.</p>
          <Button onClick={() => navigate('/agents')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/agents')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Agent Header */}
      <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{agent.name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={`${getStatusColor(agent.status)} text-white`}>
                  {agent.status}
                </Badge>
                {agent.is_public ? (
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    <Globe className="w-3 h-3 mr-1" />
                    Public
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    <Lock className="w-3 h-3 mr-1" />
                    Private
                  </Badge>
                )}
              </div>
              <p className="text-gray-400">{agent.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => toggleAgentStatus(agent.id)}
              variant="outline"
              className="border-gray-600 hover:bg-gray-700"
            >
              {agent.status === 'active' ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </>
              )}
            </Button>
            <Button
              onClick={() => navigate(`/agents/${agent.id}/edit`)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800/60 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Model</label>
                  <p className="text-white mt-1">{agent.model}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <Thermometer className="w-4 h-4 mr-1" />
                    Temperature
                  </label>
                  <p className="text-white mt-1">{agent.temperature}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <Hash className="w-4 h-4 mr-1" />
                    Max Tokens
                  </label>
                  <p className="text-white mt-1">{agent.max_tokens}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created
                  </label>
                  <p className="text-white mt-1">{new Date(agent.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              {agent.prompt && (
                <>
                  <Separator className="bg-gray-700" />
                  <div>
                    <label className="text-sm font-medium text-gray-300">System Prompt</label>
                    <div className="mt-2 p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">{agent.prompt}</pre>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Metadata */}
        <div>
          <Card className="bg-gray-800/60 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {agent.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-300">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-300">Last Updated</label>
                <p className="text-white mt-1">{new Date(agent.updated_at).toLocaleString()}</p>
              </div>

              {Object.keys(agent.metadata).length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-300">Metadata</label>
                  <div className="mt-2 p-3 bg-gray-900 rounded-lg border border-gray-700">
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                      {JSON.stringify(agent.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
