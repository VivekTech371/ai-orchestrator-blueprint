
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LikeButton } from '@/components/LikeButton';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Download, 
  Share, 
  Flag,
  MessageSquare,
  Users,
  Award,
  Zap,
  TrendingUp,
  Heart,
  Eye,
  GitFork
} from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1247);
  const { toast } = useToast();

  // Mock user data
  const user = {
    id: userId || '1',
    name: 'Alex Thompson',
    username: '@alexthompson',
    avatar: '/placeholder.svg',
    bio: 'AI enthusiast and developer. Building the future one agent at a time. Love creating workflows that solve real-world problems.',
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    website: 'alexthompson.dev',
    stats: {
      agents: 24,
      downloads: 15420,
      followers: followerCount,
      following: 189,
      likes: 3240
    },
    badges: [
      { name: 'Early Adopter', color: 'bg-blue-500' },
      { name: 'Top Creator', color: 'bg-gold-500' },
      { name: 'Community Helper', color: 'bg-green-500' }
    ]
  };

  const agents = [
    {
      id: '1',
      name: 'Smart Customer Support',
      description: 'Advanced AI agent for handling customer inquiries with natural language processing.',
      downloads: 2340,
      likes: 189,
      rating: 4.8,
      category: 'Customer Service',
      featured: true
    },
    {
      id: '2',
      name: 'Data Analysis Assistant',
      description: 'Powerful analytics agent that processes and visualizes complex datasets.',
      downloads: 1856,
      likes: 156,
      rating: 4.6,
      category: 'Analytics',
      featured: false
    },
    {
      id: '3',
      name: 'Content Creator Pro',
      description: 'AI-powered content generation tool for blogs, social media, and marketing.',
      downloads: 3201,
      likes: 278,
      rating: 4.9,
      category: 'Content',
      featured: true
    }
  ];

  const activities = [
    {
      type: 'created',
      item: 'Smart Customer Support',
      time: '2 days ago'
    },
    {
      type: 'updated',
      item: 'Data Analysis Assistant',
      time: '1 week ago'
    },
    {
      type: 'shared',
      item: 'Content Creator Pro',
      time: '2 weeks ago'
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are ${isFollowing ? 'no longer following' : 'now following'} ${user.name}`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message sent",
      description: "Opening message composer...",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Profile link copied",
      description: "The profile link has been copied to your clipboard.",
    });
  };

  const handleReport = () => {
    toast({
      title: "Report user",
      description: "Opening report dialog...",
    });
  };

  const handleAgentAction = (action: string, agentName: string) => {
    toast({
      title: `Agent ${action}`,
      description: `${action} "${agentName}"`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header */}
        <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700 mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-blue-400 text-lg mb-3">{user.username}</p>
                  <p className="text-gray-300 max-w-md mb-4">{user.bio}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {user.joinDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-1 flex flex-col sm:flex-row justify-end gap-3">
                <Button onClick={handleMessage} variant="outline" className="border-gray-600 hover:bg-gray-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button onClick={handleShare} variant="outline" className="border-gray-600 hover:bg-gray-700">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handleFollow} className={`${
                  isFollowing 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                }`}>
                  <Users className="w-4 h-4 mr-2" />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button onClick={handleReport} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.stats.agents}</div>
                <div className="text-gray-400 text-sm">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.stats.downloads.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.stats.followers.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.stats.following}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.stats.likes.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {user.badges.map((badge, index) => (
                <Badge key={index} className={`${badge.color} text-white`}>
                  <Award className="w-3 h-3 mr-1" />
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="bg-gray-800/60 border-gray-700">
            <TabsTrigger value="agents" className="data-[state=active]:bg-blue-500">
              Agents ({agents.length})
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-blue-500">
              Activity
            </TabsTrigger>
            <TabsTrigger value="followers" className="data-[state=active]:bg-blue-500">
              Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="data-[state=active]:bg-blue-500">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-gray-800/60 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2 flex items-center gap-2">
                          {agent.name}
                          {agent.featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              Featured
                            </Badge>
                          )}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mb-3">
                          {agent.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {agent.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{agent.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-400">
                          <Download className="w-4 h-4" />
                          <span>{agent.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                      <LikeButton 
                        itemId={agent.id}
                        initialLiked={false}
                        initialCount={agent.likes}
                        size="sm"
                        showCount={true}
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={() => handleAgentAction('view', agent.name)}
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        onClick={() => handleAgentAction('fork', agent.name)}
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 hover:bg-gray-700"
                      >
                        <GitFork className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handleAgentAction('download', agent.name)}
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 hover:bg-gray-700"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        {activity.type === 'created' && <Zap className="w-5 h-5 text-white" />}
                        {activity.type === 'updated' && <TrendingUp className="w-5 h-5 text-white" />}
                        {activity.type === 'shared' && <Share className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">
                          {activity.type === 'created' && 'Created a new agent: '}
                          {activity.type === 'updated' && 'Updated agent: '}
                          {activity.type === 'shared' && 'Shared agent: '}
                          <span className="font-medium">{activity.item}</span>
                        </p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="followers" className="space-y-6">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Followers ({user.stats.followers.toLocaleString()})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Follower list would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Following ({user.stats.following})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Following list would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
