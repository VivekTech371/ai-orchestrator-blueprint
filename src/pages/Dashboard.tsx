
import React, { useState } from 'react';
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
  MoreHorizontal
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

  // Calculate dashboard stats
  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const avgPerformance = agents.reduce((sum, agent) => sum + agent.performance.score, 0) / agents.length || 0;
  const totalRuns = agents.reduce((sum, agent) => sum + agent.runs, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-gray-400 text-lg">
                Here's what's happening with your AI agents today
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Agents</p>
                    <p className="text-2xl font-bold text-white">{totalAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active Agents</p>
                    <p className="text-2xl font-bold text-white">{activeAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Avg Performance</p>
                    <p className="text-2xl font-bold text-white">{avgPerformance.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Runs</p>
                    <p className="text-2xl font-bold text-white">{totalRuns.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-gray-800/60 border border-gray-700">
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
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Your Agents</h2>
                  <Button variant="outline" className="border-gray-600">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {agents.slice(0, 4).map((agent) => (
                    <AgentPerformanceCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>

              {/* Agent Inbox */}
              <div className="space-y-6">
                <AgentInbox />
                <VersionControl />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {agents.map((agent) => (
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
