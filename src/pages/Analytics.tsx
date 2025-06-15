
import React, { useState } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  FileText, 
  Activity,
  Calendar,
  BarChart3,
  Download
} from 'lucide-react';

const Analytics = () => {
  const { analytics, loading, fetchAnalytics } = useAnalytics();
  const [timeRange, setTimeRange] = useState('30d');

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    fetchAnalytics(range);
  };

  const chartData = [
    { name: 'Agents', count: analytics?.totalAgents || 0 },
    { name: 'Workflows', count: analytics?.totalWorkflows || 0 },
    { name: 'Templates', count: analytics?.totalTemplates || 0 },
  ];

  const executionData = [
    { name: 'Agent Executions', count: analytics?.agentExecutions || 0 },
    { name: 'Workflow Executions', count: analytics?.workflowExecutions || 0 },
    { name: 'Template Downloads', count: analytics?.templatesDownloaded || 0 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h1>
          <p className="text-gray-400">Track your AI automation performance and usage</p>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics?.totalAgents || 0}</div>
            <p className="text-xs text-gray-400">AI agents created</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Workflows</CardTitle>
            <Zap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics?.totalWorkflows || 0}</div>
            <p className="text-xs text-gray-400">Automation workflows</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Templates</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics?.totalTemplates || 0}</div>
            <p className="text-xs text-gray-400">Templates created</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Executions</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(analytics?.agentExecutions || 0) + (analytics?.workflowExecutions || 0)}
            </div>
            <p className="text-xs text-gray-400">Combined executions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Resource Overview */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Resource Overview
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your created resources breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Execution Analytics */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Execution Analytics
            </CardTitle>
            <CardDescription className="text-gray-400">
              Usage and execution metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={executionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {executionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800/60 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-gray-400">
            Latest usage events and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analytics?.recentActivity?.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analytics?.recentActivity?.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      {activity.event_type === 'agent_execution' && <Users className="w-4 h-4 text-white" />}
                      {activity.event_type === 'workflow_execution' && <Zap className="w-4 h-4 text-white" />}
                      {activity.event_type === 'template_download' && <Download className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {activity.event_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {activity.event_type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
