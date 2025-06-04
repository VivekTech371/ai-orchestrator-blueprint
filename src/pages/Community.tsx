
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '../hooks/useAuth';
import { 
  MessageSquare, 
  Heart, 
  Reply, 
  Flag, 
  Plus,
  TrendingUp,
  Clock,
  User,
  Crown,
  Trophy,
  Star,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';

const Community = () => {
  const { user, toggleAnonymousMode } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const posts = [
    {
      id: 1,
      title: 'How to optimize agent performance for large workflows?',
      content: 'I\'m running a complex workflow with 10+ agents and noticing some performance issues. Has anyone dealt with this before?',
      author: user?.isAnonymous ? 'Anonymous_Wolf_42' : 'TechBuilder_Sarah',
      isAnonymous: false,
      timestamp: '2 hours ago',
      upvotes: 24,
      replies: 8,
      tags: ['Performance', 'Optimization', 'Advanced'],
      category: 'Technical'
    },
    {
      id: 2,
      title: 'Sharing my e-commerce automation workflow',
      content: 'Just finished building an end-to-end e-commerce automation system. Handles inventory, customer service, and marketing. AMA!',
      author: 'Anonymous_Phoenix_17',
      isAnonymous: true,
      timestamp: '5 hours ago',
      upvotes: 67,
      replies: 23,
      tags: ['E-commerce', 'Showcase', 'Automation'],
      category: 'Showcase'
    },
    {
      id: 3,
      title: 'Bug: Agent Builder crashes on step 4',
      content: 'Getting a consistent crash when trying to configure API keys. Anyone else experiencing this?',
      author: 'DevUser_Mike',
      isAnonymous: false,
      timestamp: '1 day ago',
      upvotes: 12,
      replies: 5,
      tags: ['Bug', 'Agent Builder', 'API'],
      category: 'Bug Report'
    },
    {
      id: 4,
      title: 'Template request: Academic research automation',
      content: 'Would love to see templates for academic research workflows - paper discovery, summarization, citation management.',
      author: 'Anonymous_Scholar_99',
      isAnonymous: true,
      timestamp: '2 days ago',
      upvotes: 31,
      replies: 14,
      tags: ['Template Request', 'Academic', 'Research'],
      category: 'Feature Request'
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'AutomationPro',
      isAnonymous: false,
      points: 2847,
      badge: 'Expert',
      contributions: 45
    },
    {
      rank: 2,
      name: 'Anonymous_Dragon_88',
      isAnonymous: true,
      points: 2134,
      badge: 'Advanced',
      contributions: 38
    },
    {
      rank: 3,
      name: 'WorkflowMaster',
      isAnonymous: false,
      points: 1923,
      badge: 'Expert',
      contributions: 32
    },
    {
      rank: 4,
      name: 'Anonymous_Phoenix_17',
      isAnonymous: true,
      points: 1756,
      badge: 'Advanced',
      contributions: 29
    },
    {
      rank: 5,
      name: 'TechBuilder_Sarah',
      isAnonymous: false,
      points: 1542,
      badge: 'Intermediate',
      contributions: 26
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: 156 },
    { id: 'technical', label: 'Technical', count: 45 },
    { id: 'showcase', label: 'Showcase', count: 32 },
    { id: 'bug', label: 'Bug Reports', count: 18 },
    { id: 'feature', label: 'Feature Requests', count: 24 },
    { id: 'help', label: 'Help & Support', count: 37 }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'bg-purple-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Community Hub</h1>
                <p className="text-gray-400">Connect, share, and learn with fellow automation builders</p>
              </div>
              
              {/* Anonymous Mode Toggle */}
              {user && (
                <div className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    {user.isAnonymous ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm text-gray-300">
                      {user.isAnonymous ? 'Anonymous Mode' : 'Public Mode'}
                    </span>
                  </div>
                  <Switch
                    checked={user.isAnonymous}
                    onCheckedChange={toggleAnonymousMode}
                  />
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-96 bg-gray-800 border-gray-700">
              <TabsTrigger value="feed" className="data-[state=active]:bg-purple-500">Feed</TabsTrigger>
              <TabsTrigger value="ask" className="data-[state=active]:bg-purple-500">Ask</TabsTrigger>
              <TabsTrigger value="showcase" className="data-[state=active]:bg-purple-500">Showcase</TabsTrigger>
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-500">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Feed Tab */}
            <TabsContent value="feed" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-700 cursor-pointer">
                          <span className="text-gray-300 text-sm">{category.label}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Main Feed */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Sort Options */}
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant={sortBy === 'trending' ? 'default' : 'outline'}
                      onClick={() => setSortBy('trending')}
                      className={sortBy === 'trending' ? 'bg-purple-500' : 'border-gray-600'}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </Button>
                    <Button
                      size="sm"
                      variant={sortBy === 'recent' ? 'default' : 'outline'}
                      onClick={() => setSortBy('recent')}
                      className={sortBy === 'recent' ? 'bg-purple-500' : 'border-gray-600'}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Recent
                    </Button>
                  </div>

                  {/* Posts */}
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <Card key={post.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            {/* Vote Section */}
                            <div className="flex flex-col items-center space-y-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-purple-500/20">
                                <Heart className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                              </Button>
                              <span className="text-sm font-medium text-gray-300">{post.upvotes}</span>
                            </div>

                            {/* Post Content */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-white hover:text-purple-400 cursor-pointer">
                                  {post.title}
                                </h3>
                                {post.isAnonymous && (
                                  <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                                    Anonymous
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-gray-300 mb-3">{post.content}</p>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {post.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <div className="flex items-center space-x-4">
                                  <span className="flex items-center">
                                    <User className="w-3 h-3 mr-1" />
                                    {post.author}
                                  </span>
                                  <span>{post.timestamp}</span>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                    <Reply className="w-3 h-3 mr-1" />
                                    {post.replies} replies
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                                    <Flag className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Ask Tab */}
            <TabsContent value="ask" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Ask for Help</CardTitle>
                  <p className="text-gray-400">Get help from the community with your automation challenges</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <Input
                      placeholder="Briefly describe your question..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Details</label>
                    <Textarea
                      placeholder="Provide more details about your question. Include relevant code, error messages, or workflow descriptions."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white min-h-32"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {['Bug', 'Deployment', 'Templates', 'API', 'Performance', 'UI/UX'].map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300 cursor-pointer hover:bg-purple-500/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Question
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Showcase Tab */}
            <TabsContent value="showcase" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Showcase Your Work</CardTitle>
                  <p className="text-gray-400">Share your automation workflows with the community</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Workflow Title</label>
                    <Input
                      placeholder="Give your workflow a catchy title..."
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <Textarea
                      placeholder="Describe what your workflow does, what problems it solves, and any interesting features."
                      className="bg-gray-700 border-gray-600 text-white min-h-32"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white">
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Content Creation</option>
                        <option>Customer Service</option>
                        <option>Analytics</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Complexity</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <label className="text-sm text-gray-300">Allow others to clone this workflow</label>
                  </div>
                  
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Share Workflow
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Contributors */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user, index) => (
                        <div key={user.rank} className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            index === 2 ? 'bg-orange-500 text-black' :
                            'bg-gray-700 text-white'
                          }`}>
                            {user.rank}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-white">{user.name}</span>
                              {user.isAnonymous && (
                                <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                                  Anon
                                </Badge>
                              )}
                              <Badge className={`${getBadgeColor(user.badge)} text-white text-xs`}>
                                {user.badge}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400">{user.contributions} contributions</div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-400">{user.points}</div>
                            <div className="text-xs text-gray-400">XP</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievement System */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-500" />
                      Achievements & Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: 'First Workflow', description: 'Create your first automation', earned: true },
                        { title: 'Helper', description: 'Answer 10 community questions', earned: true },
                        { title: 'Popular Creator', description: 'Get 100 installs on a template', earned: false },
                        { title: 'Expert Contributor', description: 'Reach 1000 XP points', earned: false },
                        { title: 'Community Leader', description: 'Get 50 upvotes on posts', earned: false },
                      ].map((achievement, index) => (
                        <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                          achievement.earned ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-gray-700/50'
                        }`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? 'bg-purple-500' : 'bg-gray-600'
                          }`}>
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{achievement.title}</h4>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
                          </div>
                          {achievement.earned && (
                            <Check className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Community;
