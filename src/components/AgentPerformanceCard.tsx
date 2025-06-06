
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Star,
  Activity,
  AlertCircle
} from 'lucide-react';

interface AgentPerformanceCardProps {
  agent: {
    id: string;
    name: string;
    performance: {
      score: number;
      executionTime: number;
      successRate: number;
      costPerRun: number;
      qualityScore: number;
    };
    status: 'active' | 'paused' | 'error' | 'stopped';
    runs: number;
    health: {
      uptime: number;
      errors: number;
      avgRuntime: number;
      apiCosts: number;
    };
  };
}

const AgentPerformanceCard: React.FC<AgentPerformanceCardProps> = ({ agent }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'stopped': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-gray-800/60 border-gray-700 hover:border-gray-600 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
          <Badge className={getStatusColor(agent.status)}>
            {agent.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Performance Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">Performance Score</span>
          </div>
          <span className={`font-semibold ${getPerformanceColor(agent.performance.score)}`}>
            {agent.performance.score}%
          </span>
        </div>
        <Progress value={agent.performance.score} className="h-2" />

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Avg Time</span>
            </div>
            <p className="text-sm text-white font-medium">{agent.performance.executionTime}s</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Success Rate</span>
            </div>
            <p className="text-sm text-white font-medium">{agent.performance.successRate}%</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Cost/Run</span>
            </div>
            <p className="text-sm text-white font-medium">${agent.performance.costPerRun}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Quality</span>
            </div>
            <p className="text-sm text-white font-medium">{agent.performance.qualityScore}%</p>
          </div>
        </div>

        {/* Health Status */}
        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Health Status</span>
            </div>
            <span className="text-sm text-green-400">{agent.health.uptime}% uptime</span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{agent.runs} total runs</span>
            {agent.health.errors > 0 && (
              <div className="flex items-center gap-1 text-red-400">
                <AlertCircle className="w-3 h-3" />
                <span>{agent.health.errors} errors</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceCard;
