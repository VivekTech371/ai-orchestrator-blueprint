
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  Star,
  Eye,
  RefreshCw,
  Calendar,
  Users,
  ShoppingCart
} from 'lucide-react';

interface SalesData {
  agentId: string;
  agentName: string;
  price: number;
  installs: number;
  purchases: number;
  rating: number;
  reviews: number;
  earnings: number;
  refunds: number;
  conversionRate: number;
}

const MarketplaceSalesDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  const salesData: SalesData[] = [
    {
      agentId: '1',
      agentName: 'Email Marketing Automation',
      price: 29.99,
      installs: 1247,
      purchases: 89,
      rating: 4.8,
      reviews: 67,
      earnings: 2668.11,
      refunds: 2,
      conversionRate: 7.1
    },
    {
      agentId: '2',
      agentName: 'Social Media Scheduler Pro',
      price: 19.99,
      installs: 892,
      purchases: 156,
      rating: 4.6,
      reviews: 134,
      earnings: 3118.44,
      refunds: 5,
      conversionRate: 17.5
    },
    {
      agentId: '3',
      agentName: 'Content Generator AI',
      price: 0,
      installs: 2341,
      purchases: 0,
      rating: 4.9,
      reviews: 234,
      earnings: 0,
      refunds: 0,
      conversionRate: 0
    }
  ];

  const totalEarnings = salesData.reduce((sum, item) => sum + item.earnings, 0);
  const totalInstalls = salesData.reduce((sum, item) => sum + item.installs, 0);
  const totalPurchases = salesData.reduce((sum, item) => sum + item.purchases, 0);
  const avgRating = salesData.reduce((sum, item) => sum + item.rating, 0) / salesData.length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Earnings</p>
                <p className="text-xl font-bold text-white">${totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Installs</p>
                <p className="text-xl font-bold text-white">{totalInstalls.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Purchases</p>
                <p className="text-xl font-bold text-white">{totalPurchases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg Rating</p>
                <p className="text-xl font-bold text-white">{avgRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card className="bg-gray-800/60 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Agent Performance</CardTitle>
            <div className="flex gap-2">
              {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className="text-xs"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {salesData.map((agent) => (
              <div key={agent.agentId} className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{agent.agentName}</h4>
                    <div className="flex items-center gap-2">
                      {agent.price > 0 ? (
                        <Badge className="bg-green-500/20 text-green-400">${agent.price}</Badge>
                      ) : (
                        <Badge className="bg-blue-500/20 text-blue-400">Free</Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{agent.rating}</span>
                        <span className="text-sm text-gray-500">({agent.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">${agent.earnings.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">earned</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Installs</p>
                    <p className="font-semibold text-white">{agent.installs.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Purchases</p>
                    <p className="font-semibold text-white">{agent.purchases}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conversion</p>
                    <p className="font-semibold text-white">{agent.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Refunds</p>
                    <p className="font-semibold text-white">{agent.refunds}</p>
                  </div>
                </div>
                
                {agent.price > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="text-gray-300">{agent.conversionRate}%</span>
                    </div>
                    <Progress value={agent.conversionRate} className="h-2" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplaceSalesDashboard;
