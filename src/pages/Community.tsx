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
  Check,
  Zap,
  Award,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle,
  Flame,
  Sparkles,
  Users,
  Target,
  Lightbulb,
  Code,
  Rocket
} from 'lucide-react';

const Community = () => {
  const { user, toggleAnonymousMode } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'How to optimize agent performance for large workflows?',
      content: 'I\'m running a complex workflow with 10+ agents and noticing some performance issues. Has anyone dealt with this before? Looking for best practices and optimization strategies.',
      author: user?.isAnonymous ? 'Anonymous_Wolf_42' : 'TechBuilder_Sarah',
      isAnonymous: false,
      timestamp: '2 hours ago',
      upvotes: 24,
      replies: 8,
      views: 156,
      tags: ['Performance', 'Optimization', 'Advanced'],
      category: 'Technical',
      isPinned: false,
      isHot: true,
      hasAcceptedAnswer: false,
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Sharing my e-commerce automation workflow - 10x my sales!',
      content: 'Just finished building an end-to-end e-commerce automation system. Handles inventory, customer service, and marketing. Increased sales by 10x in 3 months. AMA!',
      author: 'Anonymous_Phoenix_17',
      isAnonymous: true,
      timestamp: '5 hours ago',
      upvotes: 67,
      replies: 23,
      views: 892,
      tags: ['E-commerce', 'Showcase', 'Automation', 'Success'],
      category: 'Showcase',
      isPinned: true,
      isHot: true,
      hasAcceptedAnswer: false,
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Bug: Agent Builder crashes on step 4 - Need urgent help!',
      content: 'Getting a consistent crash when trying to configure API keys. Browser console shows memory leak. Anyone else experiencing this? Running Chrome 120 on Windows 11.',
      author: 'DevUser_Mike',
      isAnonymous: false,
      timestamp: '1 day ago',
      upvotes: 12,
      replies: 5,
      views: 78,
      tags: ['Bug', 'Agent Builder', 'API', 'Urgent'],
      category: 'Bug Report',
      isPinned: false,
      isHot: false,
      hasAcceptedAnswer: true,
      difficulty: 'Beginner'
    },
    {
      id: 4,
      title: 'Template request: Academic research automation',
      content: 'Would love to see templates for academic research workflows - paper discovery, summarization, citation management. Currently doing everything manually and it\'s killing me!',
      author: 'Anonymous_Scholar_99',
      isAnonymous: true,
      timestamp: '2 days ago',
      upvotes: 31,
      replies: 14,
      views: 234,
      tags: ['Template Request', 'Academic', 'Research'],
      category: 'Feature Request',
      isPinned: false,
      isHot: false,
      hasAcceptedAnswer: false,
      difficulty: 'Intermediate'
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'AutomationPro',
      isAnonymous: false,
      points: 2847,
      badge: 'Expert',
      contributions: 45,
      streak: 15,
      level: 'Automation Master'
    },
    {
      rank: 2,
      name: 'Anonymous_Dragon_88',
      isAnonymous: true,
      points: 2134,
      badge: 'Advanced',
      contributions: 38,
      streak: 12,
      level: 'Workflow Wizard'
    },
    {
      rank: 3,
      name: 'WorkflowMaster',
      isAnonymous: false,
      points: 1923,
      badge: 'Expert',
      contributions: 32,
      streak: 8,
      level: 'Automation Master'
    },
    {
      rank: 4,
      name: 'Anonymous_Phoenix_17',
      isAnonymous: true,
      points: 1756,
      badge: 'Advanced',
      contributions: 29,
      streak: 6,
      level: 'Agent Architect'
    },
    {
      rank: 5,
      name: 'TechBuilder_Sarah',
      isAnonymous: false,
      points: 1542,
      badge: 'Intermediate',
      contributions: 26,
      streak: 4,
      level: 'Code Craftor'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: 156, icon: Users, color: 'purple' },
    { id: 'technical', label: 'Technical', count: 45, icon: Code, color: 'blue' },
    { id: 'showcase', label: 'Showcase', count: 32, icon: Rocket, color: 'green' },
    { id: 'bug', label: 'Bug Reports', count: 18, icon: Target, color: 'red' },
    { id: 'feature', label: 'Feature Requests', count: 24, icon: Lightbulb, color: 'yellow' },
    { id: 'help', label: 'Help & Support', count: 37, icon: MessageCircle, color: 'orange' }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'bg-purple-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      purple: 'border-purple-500/30 text-purple-300',
      blue: 'border-blue-500/30 text-blue-300',
      green: 'border-green-500/30 text-green-300',
      red: 'border-red-500/30 text-red-300',
      yellow: 'border-yellow-500/30 text-yellow-300',
      orange: 'border-orange-500/30 text-orange-300'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Community Hub
                </h1>
                <p className="text-gray-400 text-base lg:text-lg">Connect, share, and learn with fellow automation builders</p>
              </div>
              
              {/* Enhanced Anonymous Mode Toggle */}
              {user && (
                <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm w-full lg:w-auto">
                  <div className="flex items-center space-x-2">
                    {user.isAnonymous ? <EyeOff className="w-4 h-4 text-orange-400" /> : <Eye className="w-4 h-4 text-green-400" />}
                    <span className="text-sm text-gray-300 font-medium">
                      {user.isAnonymous ? 'Anonymous Mode' : 'Public Mode'}
                    </span>
                  </div>
                  <Switch
                    checked={user.isAnonymous}
                    onCheckedChange={toggleAnonymousMode}
                  />
                  <Badge className={user.isAnonymous ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}>
                    {user.isAnonymous ? 'Hidden' : 'Visible'}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="feed" className="w-full">
            <div className="w-full overflow-x-auto mb-6">
              <TabsList className="grid w-full grid-cols-4 min-w-[400px] lg:w-96 bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                <TabsTrigger value="feed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 text-xs sm:text-sm">
                  <Flame className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Feed</span>
                </TabsTrigger>
                <TabsTrigger value="ask" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 text-xs sm:text-sm">
                  <MessageSquare className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Ask</span>
                </TabsTrigger>
                <TabsTrigger value="showcase" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 text-xs sm:text-sm">
                  <Rocket className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Showcase</span>
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 text-xs sm:text-sm">
                  <Trophy className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Board</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Enhanced Feed Tab */}
            <TabsContent value="feed" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Enhanced Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Categories Card */}
                  <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-sm flex items-center">
                        <Target className="w-4 h-4 mr-2 text-purple-500" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div 
                            key={category.id} 
                            className={`flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-all group ${selectedCategory === category.id ? 'bg-purple-500/20 border border-purple-500/30' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div className="flex items-center space-x-2 min-w-0">
                              <IconComponent className={`w-4 h-4 flex-shrink-0 ${getCategoryColor(category.color).split(' ')[1]}`} />
                              <span className="text-gray-300 text-sm group-hover:text-white transition-colors truncate">{category.label}</span>
                            </div>
                            <Badge variant="outline" className={`${getCategoryColor(category.color)} text-xs flex-shrink-0`}>
                              {category.count}
                            </Badge>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  {/* Community Stats */}
                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white text-sm flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                        Community Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Active Members</span>
                        <span className="text-white font-medium">2,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Posts Today</span>
                        <span className="text-green-400 font-medium">42</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Solutions</span>
                        <span className="text-blue-400 font-medium">156</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Main Feed */}
                <div className="lg:col-span-3 space-y-4 min-w-0">
                  {/* Enhanced Sort Options */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant={sortBy === 'trending' ? 'default' : 'outline'}
                        onClick={() => setSortBy('trending')}
                        className={sortBy === 'trending' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'border-gray-600 hover:border-purple-500'}
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Trending</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={sortBy === 'recent' ? 'default' : 'outline'}
                        onClick={() => setSortBy('recent')}
                        className={sortBy === 'recent' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'border-gray-600 hover:border-purple-500'}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Recent</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={sortBy === 'hot' ? 'default' : 'outline'}
                        onClick={() => setSortBy('hot')}
                        className={sortBy === 'hot' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'border-gray-600 hover:border-orange-500'}
                      >
                        <Flame className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Hot</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{filteredPosts.length} posts</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced Posts */}
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className={`bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg group ${post.isPinned ? 'border-purple-500/50 bg-purple-900/10' : ''}`}>
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Enhanced Vote Section */}
                            <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 flex-shrink-0">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-purple-500/20 hover:text-purple-400 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                              </Button>
                              <span className="text-sm font-bold text-gray-300">{post.upvotes}</span>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Enhanced Post Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-start gap-2 mb-3">
                                {post.isPinned && (
                                  <Badge className="bg-purple-500 text-white">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Pinned
                                  </Badge>
                                )}
                                {post.isHot && (
                                  <Badge className="bg-orange-500 text-white">
                                    <Flame className="w-3 h-3 mr-1" />
                                    Hot
                                  </Badge>
                                )}
                                {post.hasAcceptedAnswer && (
                                  <Badge className="bg-green-500 text-white">
                                    <Check className="w-3 h-3 mr-1" />
                                    Solved
                                  </Badge>
                                )}
                                {post.isAnonymous && (
                                  <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                                    <EyeOff className="w-3 h-3 mr-1" />
                                    Anonymous
                                  </Badge>
                                )}
                                <Badge className={`${getDifficultyColor(post.difficulty)} text-white text-xs`}>
                                  {post.difficulty}
                                </Badge>
                              </div>
                              
                              <h3 className="text-lg sm:text-xl font-semibold text-white hover:text-purple-400 cursor-pointer transition-colors mb-2 group-hover:text-purple-300 break-words">
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-300 mb-4 leading-relaxed break-words">{post.content}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 text-xs hover:border-purple-500 hover:text-purple-400 cursor-pointer transition-colors">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
                                <div className="flex flex-wrap items-center gap-4">
                                  <span className="flex items-center">
                                    <User className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">{post.author}</span>
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                                    {post.timestamp}
                                  </span>
                                  <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                                    {post.views} views
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs">
                                    <Reply className="w-3 h-3 mr-1" />
                                    {post.replies}
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 p-2">
                                    <Share2 className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 p-2">
                                    <Bookmark className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 p-2">
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

            {/* Enhanced Ask Tab */}
            <TabsContent value="ask" className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-500" />
                    Ask for Help
                  </CardTitle>
                  <p className="text-gray-400">Get help from the community with your automation challenges</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <Input
                      placeholder="Briefly describe your question..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Details</label>
                    <Textarea
                      placeholder="Provide more details about your question. Include relevant code, error messages, or workflow descriptions."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white min-h-32 focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-purple-500 transition-colors">
                        <option>Technical Help</option>
                        <option>Bug Report</option>
                        <option>Feature Request</option>
                        <option>General Question</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
                      <select className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-purple-500 transition-colors">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {['Bug', 'Deployment', 'Templates', 'API', 'Performance', 'UI/UX', 'Integration', 'Automation'].map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300 cursor-pointer hover:bg-purple-500/20 hover:border-purple-500 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <label className="text-sm text-gray-300">Mark as urgent (requires immediate attention)</label>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Question
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Showcase Tab */}
            <TabsContent value="showcase" className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Rocket className="w-5 h-5 mr-2 text-green-500" />
                    Showcase Your Work
                  </CardTitle>
                  <p className="text-gray-400">Share your automation workflows with the community</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Workflow Title</label>
                    <Input
                      placeholder="Give your workflow a catchy title..."
                      className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <Textarea
                      placeholder="Describe what your workflow does, what problems it solves, and any interesting features."
                      className="bg-gray-700/50 border-gray-600 text-white min-h-32 focus:border-green-500 transition-colors"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-green-500 transition-colors">
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Content Creation</option>
                        <option>Customer Service</option>
                        <option>Analytics</option>
                        <option>E-commerce</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Complexity</label>
                      <select className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-green-500 transition-colors">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Results Achieved</label>
                      <Input
                        placeholder="e.g., 10x sales increase"
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600" />
                      <label className="text-sm text-gray-300">Allow others to clone this workflow</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600" />
                      <label className="text-sm text-gray-300">Include in marketplace</label>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all w-full sm:w-auto">
                    <Rocket className="w-4 h-4 mr-2" />
                    Share Workflow
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Enhanced Top Contributors */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Top Contributors
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">This Month</Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 hover:border-purple-500 cursor-pointer">All Time</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user, index) => (
                        <div key={user.rank} className={`flex items-center space-x-4 p-4 rounded-lg transition-all hover:bg-gray-700/30 ${index < 3 ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20' : 'bg-gray-700/20'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                            index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-black' :
                            'bg-gray-700 text-white'
                          }`}>
                            {user.rank}
                            {index < 3 && <Crown className="absolute -top-2 -right-1 w-4 h-4 text-yellow-400" />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-medium text-white truncate">{user.name}</span>
                              {user.isAnonymous && (
                                <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                                  <EyeOff className="w-2 h-2 mr-1" />
                                  Anon
                                </Badge>
                              )}
                              <Badge className={`${getBadgeColor(user.badge)} text-white text-xs`}>
                                {user.badge}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
                              <span>{user.contributions} contributions</span>
                              <span>•</span>
                              <span>{user.streak} day streak</span>
                              <span>•</span>
                              <span className="text-purple-400 truncate">{user.level}</span>
                            </div>
                          </div>
                          
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-purple-400">{user.points.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">XP</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Achievement System */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-500" />
                      Achievements & Badges
                    </CardTitle>
                    <p className="text-gray-400 text-sm">Unlock rewards by contributing to the community</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: 'First Workflow', description: 'Create your first automation', earned: true, rarity: 'Common', points: 10 },
                        { title: 'Helper', description: 'Answer 10 community questions', earned: true, rarity: 'Common', points: 25 },
                        { title: 'Popular Creator', description: 'Get 100 installs on a template', earned: false, rarity: 'Rare', points: 100 },
                        { title: 'Expert Contributor', description: 'Reach 1000 XP points', earned: false, rarity: 'Epic', points: 250 },
                        { title: 'Community Leader', description: 'Get 50 upvotes on posts', earned: false, rarity: 'Legendary', points: 500 },
                      ].map((achievement, index) => (
                        <div key={index} className={`flex items-center space-x-3 p-4 rounded-lg transition-all hover:bg-gray-700/30 ${
                          achievement.earned ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30' : 'bg-gray-700/20'
                        }`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            achievement.earned ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-600'
                          }`}>
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-medium text-white truncate">{achievement.title}</h4>
                              <Badge className={`text-xs ${
                                achievement.rarity === 'Common' ? 'bg-green-500' :
                                achievement.rarity === 'Rare' ? 'bg-blue-500' :
                                achievement.rarity === 'Epic' ? 'bg-purple-500' :
                                'bg-yellow-500'
                              }`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 break-words">{achievement.description}</p>
                            <div className="text-xs text-purple-400 mt-1">+{achievement.points} XP</div>
                          </div>
                          {achievement.earned && (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
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
