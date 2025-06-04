
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Copy, 
  Trash2, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [goalInput, setGoalInput] = useState('');

  const workflows = [
    {
      id: 1,
      title: 'Blog Content Automation',
      status: 'Live',
      lastUpdated: '2 hours ago',
      agentCount: 3,
      description: 'Automatically generates and publishes blog content'
    },
    {
      id: 2,
      title: 'Lead Generation Pipeline',
      status: 'Failed',
      lastUpdated: '1 day ago',
      agentCount: 5,
      description: 'Captures and nurtures leads from multiple sources'
    },
    {
      id: 3,
      title: 'Social Media Scheduler',
      status: 'In Review',
      lastUpdated: '3 days ago',
      agentCount: 2,
      description: 'Schedules and posts content across social platforms'
    }
  ];

  const suggestions = [
    {
      title: 'Email Campaign Automation',
      description: 'Create automated email sequences',
      category: 'Marketing'
    },
    {
      title: 'Customer Support Bot',
      description: 'Handle customer inquiries automatically',
      category: 'Support'
    },
    {
      title: 'Data Analysis Pipeline',
      description: 'Analyze and report on business metrics',
      category: 'Analytics'
    }
  ];

  const activities = [
    {
      type: 'deployment',
      message: 'Blog Content Automation deployed successfully',
      time: '2 hours ago'
    },
    {
      type: 'feedback',
      message: 'Received 5-star rating on Lead Generation Pipeline',
      time: '1 day ago'
    },
    {
      type: 'install',
      message: 'Someone installed your Social Media Scheduler template',
      time: '2 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'Failed': return 'bg-red-500';
      case 'In Review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live': return <CheckCircle className="w-4 h-4" />;
      case 'Failed': return <AlertCircle className="w-4 h-4" />;
      case 'In Review': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Good {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}, {user?.name}
          </h1>
          <p className="text-gray-400">What do you want to automate today?</p>
          
          {/* Quick Goal Input */}
          <div className="mt-6 flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Describe your automation goal..."
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Link to="/agent-builder">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Build Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Workflows */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  My Workflows
                  <Link to="/agent-builder">
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      <Plus className="w-4 h-4 mr-2" />
                      New
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{workflow.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{workflow.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Last updated: {workflow.lastUpdated}</span>
                          <span>{workflow.agentCount} agents</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(workflow.status)} text-white flex items-center space-x-1`}>
                          {getStatusIcon(workflow.status)}
                          <span>{workflow.status}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-600">
                        <Activity className="w-3 h-3 mr-1" />
                        View Logs
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-600">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-600">
                        <Copy className="w-3 h-3 mr-1" />
                        Duplicate
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-600 text-red-400">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-sm text-gray-400">Active Workflows</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">847</p>
                  <p className="text-sm text-gray-400">Automations Run</p>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions Panel */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Suggested Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <h4 className="font-medium text-white mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-purple-500 text-purple-400">
                        {suggestion.category}
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
