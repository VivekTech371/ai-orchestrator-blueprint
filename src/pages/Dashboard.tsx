import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Zap, 
  TrendingUp, 
  Users, 
  Star,
  Activity,
  Settings,
  Bell,
  Search,
  Filter,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  MoreHorizontal,
  ArrowRight,
  Bookmark,
  Heart,
  Share2,
  Download,
  Play,
  Edit
} from 'lucide-react';
import { useAgent } from '@/contexts/AgentContext';
import { useAuth } from '@/contexts/AuthContext';
import AgentPerformanceCard from '@/components/AgentPerformanceCard';
import AgentInbox from '@/components/AgentInbox';
import AgentHealthDashboard from '@/components/AgentHealthDashboard';
import Leaderboard from '@/components/Leaderboard';
import VersionControl from '@/components/VersionControl';
import MarketplaceSalesDashboard from '@/components/MarketplaceSalesDashboard';
import APIKeyVault from '@/components/APIKeyVault';

const Dashboard = () => {
  const { agents } = useAgent();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Agent deployment successful',
      message: 'Your customer service agent has been deployed',
      time: '2 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'High API usage detected',
      message: 'Your agent is approaching the monthly limit',
      time: '1 hour ago',
      type: 'warning',
      read: false
    }
  ]);

  // Calculate dashboard stats
  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const avgPerformance = agents.reduce((sum, agent) => sum + agent.performance.score, 0) / agents.length || 0;
  const totalRuns = agents.reduce((sum, agent) => sum + agent.runs, 0);

  const recentActivity = [
    {
      id: 1,
      action: 'Agent created',
      agent: 'Customer Support Bot',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'Workflow completed',
      agent: 'Data Processor',
      time: '10 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      action: 'Agent updated',
      agent: 'Email Assistant',
      time: '1 hour ago',
      status: 'info'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Agent',
      description: 'Build a new AI agent from scratch',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      path: '/agent-builder'
    },
    {
      title: 'Browse Templates',
      description: 'Use pre-built agent templates',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      path: '/templates'
    },
    {
      title: 'View Analytics',
      description: 'Check agent performance metrics',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      path: '/dashboard?tab=health'
    },
    {
      title: 'Manage Settings',
      description: 'Configure your account settings',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      path: '/settings'
    }
  ];

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                Here's what's happening with your AI agents today
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/notifications">
                <Button variant="outline" className="w-full sm:w-auto border-gray-600 hover:bg-gray-700 relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                  )}
                </Button>
              </Link>
              <Link to="/agent-builder">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Agent
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Total Agents</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{totalAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Active Agents</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{activeAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Avg Performance</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{avgPerformance.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Total Runs</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{totalRuns.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path}>
                  <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all duration-300 hover-scale cursor-pointer group">
                    <CardContent className="p-4 sm:p-6">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2 text-sm sm:text-base group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Dashboard Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-gray-800/60 border border-gray-700 w-full lg:w-auto overflow-x-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Agents
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Health
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Agent Performance Cards */}
              <div className="xl:col-span-2 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Your Agents</h2>
                  <div className="flex gap-2">
                    <Link to="/agents">
                      <Button variant="outline" className="border-gray-600 text-sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {agents.slice(0, 4).map((agent) => (
                    <AgentPerformanceCard key={agent.id} agent={agent} />
                  ))}
                </div>

                {/* Recent Activity */}
                <Card className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg sm:text-xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-green-400' : 
                            activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{activity.action}</p>
                            <p className="text-gray-400 text-xs">{activity.agent}</p>
                          </div>
                          <span className="text-gray-400 text-xs">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <AgentInbox />
                
                {/* Recent Notifications */}
                <Card className="bg-gray-800/60 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-white text-base sm:text-lg">Notifications</CardTitle>
                    <Link to="/notifications">
                      <Button variant="outline" size="sm" className="border-gray-600 text-xs">
                        View All
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notification) => (
                        <div key={notification.id} className="p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white text-sm font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">{notification.time}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => markNotificationAsRead(notification.id)}
                              className="border-gray-600 hover:bg-gray-700 text-xs"
                            >
                              Mark Read
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <VersionControl />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {agents.filter(agent => 
                agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((agent) => (
                <AgentPerformanceCard key={agent.id} agent={agent} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <AgentHealthDashboard />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <MarketplaceSalesDashboard />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <APIKeyVault />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
