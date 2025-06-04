
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Star, 
  Download, 
  DollarSign, 
  User, 
  TrendingUp,
  Eye,
  ShoppingCart,
  Filter,
  Heart,
  Zap,
  Award,
  Clock,
  Users,
  BarChart3,
  Rocket,
  Sparkles,
  Crown,
  Globe
} from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', label: 'All Categories', icon: Globe, count: 156 },
    { id: 'blogging', label: 'Content & Blogging', icon: Users, count: 34 },
    { id: 'marketing', label: 'Marketing Automation', icon: TrendingUp, count: 42 },
    { id: 'sales', label: 'Sales & CRM', icon: BarChart3, count: 28 },
    { id: 'chatbots', label: 'AI Chatbots', icon: Sparkles, count: 31 },
    { id: 'email', label: 'Email Marketing', icon: Zap, count: 21 }
  ];

  const agents = [
    {
      id: 1,
      title: 'Ultimate Blog Content Engine',
      description: 'Professional-grade content creation system with SEO optimization, research capabilities, and multi-platform publishing',
      price: 29.99,
      creator: 'ContentPro Studio',
      rating: 4.9,
      reviews: 127,
      sales: 1240,
      category: 'blogging',
      tags: ['Content', 'SEO', 'WordPress', 'Research'],
      featured: true,
      verified: true,
      updatedAt: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop',
      previewUrl: '#',
      demoAvailable: true,
      instantSetup: true,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Advanced Lead Scoring System',
      description: 'AI-powered lead qualification and scoring with CRM integration and automated follow-up sequences',
      price: 49.99,
      creator: 'SalesForce AI',
      rating: 4.8,
      reviews: 89,
      sales: 650,
      category: 'sales',
      tags: ['Lead Gen', 'CRM', 'Scoring', 'Automation'],
      featured: true,
      verified: true,
      updatedAt: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      previewUrl: '#',
      demoAvailable: true,
      instantSetup: false,
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'Social Media Command Center',
      description: 'Complete social media management with content creation, scheduling, and analytics across all platforms',
      price: 19.99,
      creator: 'SocialBot Inc',
      rating: 4.7,
      reviews: 203,
      sales: 2100,
      category: 'marketing',
      tags: ['Social Media', 'Scheduling', 'Analytics', 'Multi-platform'],
      featured: false,
      verified: false,
      updatedAt: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      previewUrl: '#',
      demoAvailable: true,
      instantSetup: true,
      difficulty: 'Intermediate'
    },
    // ... more agents
  ];

  const myAgents = [
    {
      id: 1,
      title: 'Personal Blog Assistant',
      description: 'My custom blog automation workflow',
      price: 15.99,
      sales: 23,
      revenue: 367.77,
      rating: 4.2,
      reviews: 8,
      status: 'active',
      views: 245,
      conversionRate: 9.4
    },
    {
      id: 2,
      title: 'Lead Capture Bot',
      description: 'Simple lead generation system',
      price: 9.99,
      sales: 12,
      revenue: 119.88,
      rating: 4.0,
      reviews: 3,
      status: 'active',
      views: 156,
      conversionRate: 7.7
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'free' && agent.price === 0) ||
                        (priceFilter === 'paid' && agent.price > 0);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Agent Marketplace
                </h1>
                <p className="text-gray-400 text-lg">Discover, buy, and sell premium automation workflows</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Live Marketplace
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  156 Active Agents
                </Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96 bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
              <TabsTrigger value="browse" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500">
                <Eye className="w-4 h-4 mr-2" />
                Browse
              </TabsTrigger>
              <TabsTrigger value="my-agents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500">
                <User className="w-4 h-4 mr-2" />
                My Agents
              </TabsTrigger>
              <TabsTrigger value="earnings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500">
                <DollarSign className="w-4 h-4 mr-2" />
                Earnings
              </TabsTrigger>
            </TabsList>

            {/* Enhanced Browse Tab */}
            <TabsContent value="browse" className="space-y-6">
              {/* Advanced Search and Filters */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <div className="grid lg:grid-cols-5 gap-4 mb-4">
                  <div className="lg:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search agents, creators, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 transition-colors"
                    />
                  </div>
                  
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-purple-500 transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                  
                  <select 
                    value={priceFilter} 
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-purple-500 transition-colors"
                  >
                    <option value="all">All Prices</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>

                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:border-purple-500 transition-colors"
                  >
                    <option value="trending">Trending</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Quick Filter Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Most Popular', 'Recently Updated', 'Free', 'Instant Setup', 'Beginner Friendly'].map((tag) => (
                    <Badge key={tag} variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 cursor-pointer transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured Section with Enhanced Cards */}
              {filteredAgents.filter(agent => agent.featured).length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Crown className="w-6 h-6 mr-2 text-yellow-500" />
                      Featured Agents
                    </h2>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium">
                      Editor's Choice
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredAgents.filter(agent => agent.featured).map((agent) => (
                      <Card key={agent.id} className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden group">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden">
                            <img 
                              src={agent.thumbnail} 
                              alt={agent.title}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            {/* Enhanced Badges */}
                            <div className="absolute top-4 left-4 flex flex-col space-y-2">
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                                <Crown className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                              {agent.verified && (
                                <Badge className="bg-blue-500 text-white">
                                  <Award className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            
                            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                              <Badge className="bg-green-500 text-white font-bold">
                                ${agent.price}
                              </Badge>
                              <Badge className={`${getDifficultyColor(agent.difficulty)} text-white text-xs`}>
                                {agent.difficulty}
                              </Badge>
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {agent.demoAvailable && (
                                <Button size="sm" variant="outline" className="bg-black/50 border-gray-600 hover:bg-gray-700">
                                  <Eye className="w-3 h-3" />
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="bg-black/50 border-gray-600 hover:bg-gray-700">
                                <Heart className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                {agent.title}
                              </h3>
                              {agent.instantSetup && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Instant
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{agent.description}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {agent.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs hover:border-purple-500 transition-colors">
                                  {tag}
                                </Badge>
                              ))}
                              {agent.tags.length > 3 && (
                                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                                  +{agent.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mb-4 text-sm">
                              <div className="flex items-center space-x-4 text-gray-400">
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                  {agent.rating} ({agent.reviews})
                                </span>
                                <span className="flex items-center">
                                  <Download className="w-3 h-3 mr-1" />
                                  {agent.sales.toLocaleString()}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {agent.updatedAt}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="flex items-center text-sm text-gray-400">
                                <User className="w-3 h-3 mr-1" />
                                {agent.creator}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all">
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Buy Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Agents Grid with Enhanced Cards */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">All Agents</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{filteredAgents.length} results</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgents.map((agent) => (
                    <Card key={agent.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg group overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <img 
                            src={agent.thumbnail} 
                            alt={agent.title}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          
                          <div className="absolute top-2 right-2 flex flex-col space-y-1">
                            <Badge className="bg-green-500 text-white text-xs">
                              ${agent.price}
                            </Badge>
                            {agent.verified && (
                              <Badge className="bg-blue-500 text-white text-xs">
                                <Award className="w-2 h-2 mr-1" />
                              </Badge>
                            )}
                          </div>

                          <div className="absolute top-2 left-2">
                            <Badge className={`${getDifficultyColor(agent.difficulty)} text-white text-xs`}>
                              {agent.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                            {agent.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{agent.description}</p>
                          
                          <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {agent.rating}
                            </span>
                            <span className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              {agent.sales}
                            </span>
                            <span className="text-xs">{agent.updatedAt}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600 transition-colors">
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Buy
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                              <Heart className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Enhanced My Agents Tab */}
            <TabsContent value="my-agents" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">My Published Agents</h2>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  <Rocket className="w-4 h-4 mr-2" />
                  Publish New Agent
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAgents.map((agent) => (
                  <Card key={agent.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-white text-lg">{agent.title}</CardTitle>
                        <Badge className={agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{agent.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <span className="text-gray-400 block">Price</span>
                          <p className="text-white font-medium text-lg">${agent.price}</p>
                        </div>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <span className="text-gray-400 block">Sales</span>
                          <p className="text-white font-medium text-lg">{agent.sales}</p>
                        </div>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <span className="text-gray-400 block">Revenue</span>
                          <p className="text-green-400 font-medium text-lg">${agent.revenue}</p>
                        </div>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <span className="text-gray-400 block">Rating</span>
                          <p className="text-white font-medium text-lg">{agent.rating} ⭐</p>
                        </div>
                      </div>

                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                        <div>
                          <span className="text-gray-400">Views:</span>
                          <span className="text-white ml-2">{agent.views}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Conversion:</span>
                          <span className="text-green-400 ml-2">{agent.conversionRate}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <BarChart3 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <TrendingUp className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Enhanced Earnings Tab */}
            <TabsContent value="earnings" className="space-y-6">
              {/* Enhanced Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-white">$487.65</p>
                    <p className="text-sm text-gray-400">Total Earnings</p>
                    <div className="mt-2 flex items-center justify-center text-xs text-green-400">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5% this month
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <ShoppingCart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-white">35</p>
                    <p className="text-sm text-gray-400">Total Sales</p>
                    <div className="mt-2 flex items-center justify-center text-xs text-blue-400">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5 this week
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-white">$124.50</p>
                    <p className="text-sm text-gray-400">This Month</p>
                    <div className="mt-2 flex items-center justify-center text-xs text-purple-400">
                      <Clock className="w-3 h-3 mr-1" />
                      Best month yet
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/30">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-white">4.3</p>
                    <p className="text-sm text-gray-400">Avg Rating</p>
                    <div className="mt-2 flex items-center justify-center text-xs text-yellow-400">
                      <Award className="w-3 h-3 mr-1" />
                      Top 10% creators
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Earnings Chart */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                    Earnings Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded-lg flex items-center justify-center border border-gray-600/50">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400">Interactive earnings chart</p>
                      <p className="text-gray-500 text-sm">Coming soon with detailed analytics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Recent Sales */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <Rocket className="w-5 h-5 mr-2 text-green-500" />
                      Recent Sales
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Live Updates
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { agent: 'Personal Blog Assistant', buyer: 'user_1234', amount: 15.99, date: '2 hours ago', location: 'USA' },
                      { agent: 'Lead Capture Bot', buyer: 'user_5678', amount: 9.99, date: '1 day ago', location: 'UK' },
                      { agent: 'Personal Blog Assistant', buyer: 'user_9012', amount: 15.99, date: '2 days ago', location: 'Canada' },
                    ].map((sale, index) => (
                      <div key={index} className="flex items-center justify-between py-4 px-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div>
                            <p className="text-white font-medium">{sale.agent}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <span>Sold to {sale.buyer}</span>
                              <span>•</span>
                              <span>{sale.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-lg">${sale.amount}</p>
                          <p className="text-sm text-gray-400">{sale.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
