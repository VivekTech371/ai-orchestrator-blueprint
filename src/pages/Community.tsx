
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Heart,
  Share2,
  Eye,
  Users,
  Star,
  Bookmark,
  TrendingUp,
  Calendar,
  Award,
  Plus,
  ThumbsUp,
  Clock,
  Zap,
  Code,
  Lightbulb,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Discussions', icon: MessageSquare, count: 1247 },
    { id: 'workflows', name: 'Workflows', icon: Zap, count: 456 },
    { id: 'tutorials', name: 'Tutorials', icon: BookOpen, count: 234 },
    { id: 'showcase', name: 'Showcase', icon: Star, count: 189 },
    { id: 'help', name: 'Help & Support', icon: HelpCircle, count: 298 },
    { id: 'feature-requests', name: 'Feature Requests', icon: Lightbulb, count: 70 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Building a Complete Customer Support Automation",
      content: "Here's how I automated our entire customer support workflow, reducing response time by 90%...",
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        badge: "Expert",
        reputation: 2847
      },
      category: "workflows",
      tags: ["automation", "customer-support", "ai"],
      stats: {
        views: 1247,
        likes: 89,
        comments: 23,
        shares: 15
      },
      timestamp: "2 hours ago",
      isPinned: true,
      isTrending: true
    },
    {
      id: 2,
      title: "Tutorial: Creating Your First AI Agent in 10 Minutes",
      content: "Step-by-step guide for beginners to create a powerful AI agent using OrchestrAI's visual builder...",
      author: {
        name: "Marcus Rodriguez",
        avatar: "MR",
        badge: "Contributor",
        reputation: 1456
      },
      category: "tutorials",
      tags: ["tutorial", "beginner", "ai-agent"],
      stats: {
        views: 892,
        likes: 67,
        comments: 34,
        shares: 28
      },
      timestamp: "5 hours ago",
      isPinned: false,
      isTrending: true
    },
    {
      id: 3,
      title: "Showcase: E-commerce Order Processing Pipeline",
      content: "Check out this automated order processing system that handles 1000+ orders daily...",
      author: {
        name: "Emily Johnson",
        avatar: "EJ",
        badge: "Community Leader",
        reputation: 3421
      },
      category: "showcase",
      tags: ["ecommerce", "automation", "showcase"],
      stats: {
        views: 654,
        likes: 45,
        comments: 18,
        shares: 12
      },
      timestamp: "1 day ago",
      isPinned: false,
      isTrending: false
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "12.5K", icon: Users, growth: "+15%" },
    { label: "Discussions", value: "1.2K", icon: MessageSquare, growth: "+8%" },
    { label: "Workflows Shared", value: "847", icon: Zap, growth: "+23%" },
    { label: "Solutions Found", value: "2.3K", icon: Award, growth: "+12%" }
  ];

  const topContributors = [
    { name: "Alex Kim", avatar: "AK", posts: 89, reputation: 4532, badge: "MVP" },
    { name: "Jessica Wu", avatar: "JW", posts: 67, reputation: 3891, badge: "Expert" },
    { name: "David Park", avatar: "DP", posts: 54, reputation: 3245, badge: "Expert" },
    { name: "Lisa Zhang", avatar: "LZ", posts: 45, reputation: 2876, badge: "Contributor" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {/* Header Section - Enhanced */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Community <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow automation enthusiasts, share workflows, get help, and discover new possibilities with OrchestrAI.
          </p>
        </div>

        {/* Community Stats - Enhanced */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in animation-delay-200">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card-hover bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <span className="text-green-400 text-xs font-medium">
                  {stat.growth}
                </span>
              </div>
            );
          })}
        </div>

        {/* Search and Actions - Enhanced */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 mb-8 animate-fade-in animation-delay-300">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search discussions, workflows, tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 h-12 text-lg"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all duration-300">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Categories - Enhanced */}
            <div className="mb-8 animate-fade-in animation-delay-400">
              <h2 className="text-2xl font-bold text-white mb-6">Browse Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`card-hover p-4 rounded-xl border transition-all duration-300 hover-scale animate-fade-in ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 shadow-lg shadow-blue-500/25' 
                          : 'bg-gray-800/60 backdrop-blur-sm border-gray-700/50 hover:border-gray-600'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                      <h3 className={`font-medium text-xs mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {category.name}
                      </h3>
                      <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                        {category.count}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Posts - Enhanced */}
            <div className="animate-fade-in animation-delay-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Discussions</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Trending Now</span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <LoadingSpinner size="lg" variant="pulse" />
                </div>
              ) : (
                <div className="space-y-6">
                  {featuredPosts.map((post, index) => (
                    <div key={post.id} className={`card-hover bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {post.author.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-semibold">{post.author.name}</h4>
                              <Badge className={`text-xs ${
                                post.author.badge === 'MVP' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                post.author.badge === 'Expert' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                post.author.badge === 'Community Leader' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                'bg-gradient-to-r from-blue-500 to-cyan-500'
                              } text-white border-0`}>
                                {post.author.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span>{post.author.reputation} reputation</span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {post.isPinned && (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                              Pinned
                            </Badge>
                          )}
                          {post.isTrending && (
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed line-clamp-2">
                          {post.content}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
                            <Eye className="w-4 h-4" />
                            <span>{post.stats.views}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                            <Heart className="w-4 h-4" />
                            <span>{post.stats.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.stats.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer">
                            <Share2 className="w-4 h-4" />
                            <span>{post.stats.shares}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="hover:bg-gray-700 p-2">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-gray-700 p-2">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-gray-700 p-2">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors - Enhanced */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Top Contributors</h3>
              </div>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {contributor.avatar}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{contributor.name}</h4>
                        <p className="text-gray-400 text-xs">{contributor.posts} posts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs mb-1 ${
                        contributor.badge === 'MVP' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        contributor.badge === 'Expert' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gradient-to-r from-blue-500 to-cyan-500'
                      } text-white border-0`}>
                        {contributor.badge}
                      </Badge>
                      <p className="text-gray-400 text-xs">{contributor.reputation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Enhanced */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in animation-delay-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Workflow
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ask for Help
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Feature Request
                </Button>
              </div>
            </div>

            {/* Community Guidelines - Enhanced */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 animate-fade-in animation-delay-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Community Guidelines</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Be respectful and constructive</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share knowledge and help others</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use clear titles and descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tag posts appropriately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
