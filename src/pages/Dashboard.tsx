
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Clock,
  Users,
  Zap,
  TrendingUp,
  Activity,
  Star,
  MoreVertical,
  Play,
  Pause,
  Settings,
  Copy,
  Archive,
  Eye,
  Calendar,
  BarChart3
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    {
      title: "Active Workflows",
      value: "24",
      change: "+12%",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      trend: "up"
    },
    {
      title: "Total Executions",
      value: "1,247",
      change: "+23%",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      trend: "up"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      trend: "up"
    },
    {
      title: "Team Members",
      value: "8",
      change: "+1",
      icon: Users,
      color: "from-orange-500 to-red-500",
      trend: "up"
    }
  ];

  const workflows = [
    {
      id: 1,
      name: "Customer Onboarding",
      description: "Automated customer registration and welcome sequence",
      status: "active",
      lastRun: "2 minutes ago",
      executions: 45,
      successRate: 98,
      tags: ["customer", "automation"]
    },
    {
      id: 2,
      name: "Data Processing Pipeline",
      description: "ETL workflow for daily data synchronization",
      status: "active",
      lastRun: "1 hour ago",
      executions: 124,
      successRate: 95,
      tags: ["data", "etl"]
    },
    {
      id: 3,
      name: "Email Campaign Trigger",
      description: "Behavioral email campaigns based on user actions",
      status: "paused",
      lastRun: "3 hours ago",
      executions: 67,
      successRate: 92,
      tags: ["email", "marketing"]
    },
    {
      id: 4,
      name: "Inventory Management",
      description: "Stock level monitoring and automatic reordering",
      status: "active",
      lastRun: "30 minutes ago",
      executions: 89,
      successRate: 99,
      tags: ["inventory", "monitoring"]
    }
  ];

  const recentActivity = [
    { action: "Workflow 'Customer Onboarding' executed successfully", time: "2 min ago", type: "success" },
    { action: "New team member invited to workspace", time: "15 min ago", type: "info" },
    { action: "Workflow 'Email Campaign' paused by user", time: "1 hour ago", type: "warning" },
    { action: "Monthly usage report generated", time: "2 hours ago", type: "info" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {/* Header Section - Enhanced */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Sarah</span>
              </h1>
              <p className="text-gray-400 text-lg">Manage your AI workflows and monitor performance</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/agent-builder">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-800/50 hover-scale transition-all duration-300 w-full sm:w-auto">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Controls Section - Enhanced */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8 animate-fade-in animation-delay-300">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/60 border-gray-600 text-white focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-800/50 hover-scale transition-all">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm p-1 rounded-lg border border-gray-700/50">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'hover:bg-gray-700'}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'hover:bg-gray-700'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Workflows Section - Enhanced */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Workflows</h2>
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800/50">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" variant="pulse" />
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'responsive-grid responsive-gap' : 'space-y-4'}>
                {workflows.map((workflow, index) => (
                  <div key={workflow.id} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in group`} style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {workflow.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            workflow.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{workflow.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {workflow.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="hover:bg-gray-700">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Last Run:</span>
                        <p className="text-white">{workflow.lastRun}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Executions:</span>
                        <p className="text-white">{workflow.executions}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">Success Rate:</span>
                        <span className="text-green-400 font-medium">{workflow.successRate}%</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-gray-700 p-2">
                          {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-gray-700 p-2">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-gray-700 p-2">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Enhanced */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in animation-delay-400">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-700/50 last:border-b-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in animation-delay-500">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Workflow
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <Archive className="w-4 h-4 mr-2" />
                  Manage Archive
                </Button>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Performance Tip</h3>
                  <p className="text-blue-400 text-sm">Weekly Insight</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your workflows are performing 23% better this week! Consider optimizing the "Email Campaign" workflow for even better results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
