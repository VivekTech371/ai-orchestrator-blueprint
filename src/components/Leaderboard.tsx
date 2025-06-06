
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Crown,
  Award,
  Users,
  Zap
} from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  score: number;
  badge: string;
  agentsCreated: number;
  helpfulVotes: number;
  templatesShared: number;
  communityPoints: number;
}

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');
  const [category, setCategory] = useState<'overall' | 'helpful' | 'creative' | 'active'>('overall');

  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Alex Kim',
      avatar: 'AK',
      rank: 1,
      score: 4532,
      badge: 'MVP',
      agentsCreated: 89,
      helpfulVotes: 456,
      templatesShared: 23,
      communityPoints: 4532
    },
    {
      id: '2',
      name: 'Jessica Wu',
      avatar: 'JW',
      rank: 2,
      score: 3891,
      badge: 'Expert',
      agentsCreated: 67,
      helpfulVotes: 389,
      templatesShared: 18,
      communityPoints: 3891
    },
    {
      id: '3',
      name: 'David Park',
      avatar: 'DP',
      rank: 3,
      score: 3245,
      badge: 'Expert',
      agentsCreated: 54,
      helpfulVotes: 324,
      templatesShared: 15,
      communityPoints: 3245
    },
    {
      id: '4',
      name: 'Lisa Zhang',
      avatar: 'LZ',
      rank: 4,
      score: 2876,
      badge: 'Contributor',
      agentsCreated: 45,
      helpfulVotes: 287,
      templatesShared: 12,
      communityPoints: 2876
    },
    {
      id: '5',
      name: 'Mike Johnson',
      avatar: 'MJ',
      rank: 5,
      score: 2543,
      badge: 'Contributor',
      agentsCreated: 38,
      helpfulVotes: 254,
      templatesShared: 10,
      communityPoints: 2543
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'MVP': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Expert': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Contributor': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="bg-gray-800/60 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Community Leaderboard
          </CardTitle>
          <div className="flex gap-2">
            {['weekly', 'monthly', 'allTime'].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(period as any)}
                className="capitalize text-xs"
              >
                {period === 'allTime' ? 'All Time' : period}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          {[
            { id: 'overall', label: 'Overall', icon: TrendingUp },
            { id: 'helpful', label: 'Most Helpful', icon: Star },
            { id: 'creative', label: 'Most Creative', icon: Zap },
            { id: 'active', label: 'Most Active', icon: Users }
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.id}
                variant={category === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(cat.id as any)}
                className="text-xs border-gray-600"
              >
                <Icon className="w-3 h-3 mr-1" />
                {cat.label}
              </Button>
            );
          })}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-gray-700/50 ${
                index < 3 ? 'bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/50' : 'bg-gray-800/30'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>
              
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{user.name}</h4>
                  <Badge className={`text-xs ${getBadgeColor(user.badge)} border-0`}>
                    {user.badge}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{user.agentsCreated} agents</span>
                  <span>{user.helpfulVotes} helpful votes</span>
                  <span>{user.templatesShared} templates</span>
                </div>
              </div>
              
              {/* Score */}
              <div className="text-right">
                <div className="text-xl font-bold text-white">
                  {user.score.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">points</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <Button variant="outline" className="w-full mt-6 border-gray-600 hover:bg-gray-700/50">
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
