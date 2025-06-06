
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Zap
} from 'lucide-react';

interface HealthMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const AgentHealthDashboard: React.FC = () => {
  const healthMetrics: HealthMetric[] = [
    { label: 'System Uptime', value: 99.2, max: 100, unit: '%', status: 'good', trend: 'stable' },
    { label: 'Active Agents', value: 28, max: 50, unit: '', status: 'good', trend: 'up' },
    { label: 'Error Rate', value: 2.1, max: 100, unit: '%', status: 'good', trend: 'down' },
    { label: 'Avg Response Time', value: 1.4, max: 5, unit: 's', status: 'good', trend: 'stable' },
    { label: 'API Costs (24h)', value: 47.82, max: 100, unit: '$', status: 'warning', trend: 'up' },
    { label: 'Success Rate', value: 97.8, max: 100, unit: '%', status: 'good', trend: 'up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      case 'stable': return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const overallHealth = healthMetrics.reduce((acc, metric) => {
    if (metric.status === 'critical') return 'critical';
    if (metric.status === 'warning' && acc !== 'critical') return 'warning';
    return acc;
  }, 'good' as 'good' | 'warning' | 'critical');

  return (
    <div className="space-y-6">
      {/* Overall Health Status */}
      <Card className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Health Overview
            </CardTitle>
            <Badge className={getStatusColor(overallHealth)}>
              {overallHealth === 'good' && <CheckCircle className="w-3 h-3 mr-1" />}
              {overallHealth === 'warning' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {overallHealth === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {overallHealth.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{metric.label}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl font-bold text-white">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-400 mb-1">
                    {metric.unit}
                  </span>
                </div>
                
                <Progress 
                  value={(metric.value / metric.max) * 100} 
                  className="h-2"
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>{metric.max}{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Executions</p>
                <p className="text-xl font-bold text-white">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Successful Runs</p>
                <p className="text-xl font-bold text-white">1,220</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg Runtime</p>
                <p className="text-xl font-bold text-white">1.2s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Daily Cost</p>
                <p className="text-xl font-bold text-white">$47.82</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentHealthDashboard;
