
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAgent } from '@/contexts/AgentContext';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Workflow, 
  FileTemplate, 
  TrendingUp, 
  Activity,
  Plus,
  Play,
  Star,
  Download,
  Users,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { agents, loading: agentsLoading } = useAgent();
  const { workflows, loading: workflowsLoading } = useWorkflow();
  const { templates, loading: templatesLoading } = useTemplate();
  const { analytics, loading: analyticsLoading } = useAnalytics();
  const navigate = useNavigate();

  const activeAgents = agents.filter(agent => agent.status === 'active');
  const activeWorkflows = workflows.filter(workflow => workflow.status === 'active');
  const publicTemplates = templates.filter(template => template.is_public);

  const stats = [
    {
      title: "Total Agents",
      value: agents.length,
      icon: Bot,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Active Workflows",
      value: activeWorkflows.length,
      icon: Workflow,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Templates",
      value: templates.length,
      icon: FileTemplate,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Total Executions",
      value: analytics?.agentExecutions || 0,
      icon: Activity,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  const quickActions = [
    {
      title: "Create Agent",
      description: "Build a new AI agent",
      icon: Bot,
      action: () => navigate('/agent-builder'),
      color: "bg-blue-500"
    },
    {
      title: "Design Workflow",
      description: "Create automated workflow",
      icon: Workflow,
      action: () => navigate('/workflow-builder'),
      color: "bg-green-500"
    },
    {
      title: "Browse Templates",
      description: "Explore community templates",
      icon: FileTemplate,
      action: () => navigate('/template-marketplace'),
      color: "bg-purple-500"
    },
    {
      title: "View Analytics",
      description: "Check your performance",
      icon: BarChart3,
      action: () => navigate('/analytics'),
      color: "bg-orange-500"
    }
  ];

  if (agentsLoading || workflowsLoading || templatesLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || user?.email || 'User'}!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your AI workspace today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800/60 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="bg-gray-800/60 border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              onClick={action.action}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-base">{action.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {action.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Agents */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Recent Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {agents.length === 0 ? (
              <div className="text-center py-4">
                <Bot className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">No agents created yet</p>
                <Button 
                  onClick={() => navigate('/agent-builder')} 
                  className="mt-2 bg-blue-500 hover:bg-blue-600"
                >
                  Create Your First Agent
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {agents.slice(0, 3).map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{agent.name}</h4>
                      <p className="text-gray-400 text-sm line-clamp-1">{agent.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => navigate(`/agents/${agent.id}`)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Workflows */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Workflow className="w-5 h-5 mr-2" />
              Recent Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workflows.length === 0 ? (
              <div className="text-center py-4">
                <Workflow className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">No workflows created yet</p>
                <Button 
                  onClick={() => navigate('/workflow-builder')} 
                  className="mt-2 bg-green-500 hover:bg-green-600"
                >
                  Create Your First Workflow
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {workflows.slice(0, 3).map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{workflow.name}</h4>
                      <p className="text-gray-400 text-sm line-clamp-1">{workflow.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => navigate('/workflows')}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      {analytics && (
        <Card className="bg-gray-800/60 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Agent Executions</span>
                  <span className="text-white font-medium">{analytics.agentExecutions}</span>
                </div>
                <Progress value={(analytics.agentExecutions / 100) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Workflow Runs</span>
                  <span className="text-white font-medium">{analytics.workflowExecutions}</span>
                </div>
                <Progress value={(analytics.workflowExecutions / 50) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Templates Downloaded</span>
                  <span className="text-white font-medium">{analytics.templatesDownloaded}</span>
                </div>
                <Progress value={(analytics.templatesDownloaded / 20) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
