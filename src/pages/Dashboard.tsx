import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Users, 
  Zap, 
  TrendingUp,
  Activity,
  Shield,
  Bell,
  Download,
  Upload,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import AgentPerformanceCard from '@/components/AgentPerformanceCard';
import AgentHealthDashboard from '@/components/AgentHealthDashboard';
import MarketplaceSalesDashboard from '@/components/MarketplaceSalesDashboard';

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data
  const agents = [
    {
      id: '1',
      name: 'Customer Support Bot',
      status: 'active' as const,
      performance: 92,
      requests: 1847,
      lastActive: '2 minutes ago',
      revenue: 2340
    },
    {
      id: '2',
      name: 'Data Analyzer',
      status: 'paused' as const,
      performance: 87,
      requests: 634,
      lastActive: '1 hour ago',
      revenue: 1250
    },
    {
      id: '3',
      name: 'Content Generator',
      status: 'active' as const,
      performance: 95,
      requests: 2156,
      lastActive: 'Just now',
      revenue: 3420
    }
  ];

  // Mock agent data for AgentPerformanceCard
  const performanceAgent = {
    id: '1',
    name: 'Customer Support Bot',
    performance: {
      score: 92,
      executionTime: 1.2,
      successRate: 98,
      costPerRun: 0.05,
      qualityScore: 95
    },
    status: 'active' as const,
    runs: 1847,
    health: {
      uptime: 99.5,
      errors: 2,
      avgRuntime: 1.2,
      apiCosts: 7.8
    }
  };

  const handleAgentAction = (action: string, agentId: string) => {
    toast({
      title: `Agent ${action}`,
      description: `Successfully ${action.toLowerCase()}d agent ${agentId}`,
    });
  };

  const handleCreateAgent = () => {
    window.location.href = '/agent-builder';
  };

  const handleExportData = () => {
    toast({
      title: "Exporting data",
      description: "Your dashboard data is being prepared for download.",
    });
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your data has been exported successfully.",
      });
    }, 2000);
  };

  const handleImportData = () => {
    toast({
      title: "Import data",
      description: "File upload dialog would open here.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'paused':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-300 text-lg">
              Here's what's happening with your AI agents today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button onClick={handleImportData} variant="outline" className="border-gray-600 hover:bg-gray-800">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button onClick={handleExportData} variant="outline" className="border-gray-600 hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleCreateAgent} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-medium">Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {agents.filter(a => a.status === 'active').length}
                </span>
                <Activity className="w-5 h-5 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {agents.reduce((sum, agent) => sum + agent.requests, 0).toLocaleString()}
                </span>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  ${agents.reduce((sum, agent) => sum + agent.revenue, 0).toLocaleString()}
                </span>
                <BarChart3 className="w-5 h-5 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-medium">Avg Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {Math.round(agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length)}%
                </span>
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800/60 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-blue-500">
              Agents
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-blue-500">
              Health
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-blue-500">
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500">
              Security
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-blue-500">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgentPerformanceCard agent={performanceAgent} />
              <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-400">
                    Latest updates from your agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Agent deployed', agent: 'Customer Support Bot', time: '2 minutes ago', status: 'success' },
                      { action: 'Performance alert', agent: 'Data Analyzer', time: '1 hour ago', status: 'warning' },
                      { action: 'New template used', agent: 'Content Generator', time: '3 hours ago', status: 'info' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-400' :
                          activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-gray-400 text-xs">{activity.agent} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            {/* Agent Management */}
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Your Agents</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage and monitor your AI agents
                    </CardDescription>
                  </div>
                  <Button onClick={handleCreateAgent} className="bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    New Agent
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                          <h3 className="text-white font-medium">{agent.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {agent.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAgentAction('view', agent.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAgentAction('edit', agent.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAgentAction('clone', agent.id)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAgentAction(agent.status === 'active' ? 'pause' : 'start', agent.id)}
                          >
                            {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAgentAction('delete', agent.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Performance</p>
                          <p className="text-white font-medium">{agent.performance}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Requests</p>
                          <p className="text-white font-medium">{agent.requests.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Revenue</p>
                          <p className="text-white font-medium">${agent.revenue}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Active</p>
                          <p className="text-white font-medium">{agent.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <AgentHealthDashboard />
          </TabsContent>

          <TabsContent value="marketplace">
            <MarketplaceSalesDashboard />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Overview
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor and manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <Button onClick={() => toast({ title: "2FA", description: "Two-factor authentication settings opened" })}>
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">API Keys</h3>
                      <p className="text-gray-400 text-sm">Manage your API access keys</p>
                    </div>
                    <Button onClick={() => toast({ title: "API Keys", description: "API key management opened" })} variant="outline">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Login History</h3>
                      <p className="text-gray-400 text-sm">View recent login activity</p>
                    </div>
                    <Button onClick={() => toast({ title: "Login History", description: "Login history opened" })} variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Engagement
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Connect with other AI builders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => window.location.href = '/community'} 
                        className="w-full justify-start" 
                        variant="outline"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Browse Community
                      </Button>
                      <Button 
                        onClick={() => toast({ title: "Share Agent", description: "Agent sharing dialog opened" })} 
                        className="w-full justify-start" 
                        variant="outline"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Share an Agent
                      </Button>
                      <Button 
                        onClick={() => window.location.href = '/feedback'} 
                        className="w-full justify-start" 
                        variant="outline"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Give Feedback
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Your Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Community Rank</span>
                        <Badge className="bg-gold-500/20 text-yellow-400">Gold</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Shared Agents</span>
                        <span className="text-white">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Downloads</span>
                        <span className="text-white">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Community Score</span>
                        <span className="text-white">4.8/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
