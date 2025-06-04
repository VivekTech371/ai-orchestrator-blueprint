
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  Zap, 
  Crown, 
  Users, 
  Clock, 
  DollarSign, 
  Award,
  Package,
  Sparkles,
  Target,
  Rocket,
  Bot,
  MessageSquare,
  BarChart3,
  Mail,
  Plus
} from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Categories', count: 156, icon: Package },
    { id: 'content', label: 'Content Creation', count: 42, icon: MessageSquare },
    { id: 'ecommerce', label: 'E-commerce', count: 28, icon: ShoppingCart },
    { id: 'marketing', label: 'Marketing', count: 35, icon: Target },
    { id: 'support', label: 'Customer Service', count: 24, icon: Users },
    { id: 'social', label: 'Social Media', count: 19, icon: Heart },
    { id: 'analytics', label: 'Analytics', count: 18, icon: BarChart3 }
  ];

  const agents = [
    {
      id: 1,
      title: 'AI Content Creator Pro',
      description: 'Complete content creation pipeline from ideation to publication. Handles research, writing, editing, and social media distribution across multiple platforms.',
      price: 49.99,
      rating: 4.8,
      downloads: 1247,
      category: 'Content Creation',
      tags: ['Content', 'Social Media', 'AI Writing', 'SEO'],
      author: 'ContentMaster_AI',
      verified: true,
      featured: true,
      thumbnail: '/api/placeholder/300/200',
      preview: 'https://demo.example.com/content-creator',
      lastUpdated: '2 days ago',
      complexity: 'Intermediate'
    },
    {
      id: 2,
      title: 'E-commerce Sales Optimizer',
      description: 'End-to-end e-commerce automation including inventory management, customer support, pricing optimization, and marketing campaigns.',
      price: 99.99,
      rating: 4.9,
      downloads: 892,
      category: 'E-commerce',
      tags: ['Sales', 'Inventory', 'Customer Support', 'Analytics'],
      author: 'ShopFlow_Expert',
      verified: true,
      featured: true,
      thumbnail: '/api/placeholder/300/200',
      preview: 'https://demo.example.com/ecommerce-optimizer',
      lastUpdated: '1 week ago',
      complexity: 'Advanced'
    },
    {
      id: 3,
      title: 'Lead Generation Machine',
      description: 'Automated lead discovery, qualification, outreach, and nurturing system. Integrates with CRM and email platforms for seamless workflow.',
      price: 0,
      rating: 4.6,
      downloads: 2156,
      category: 'Marketing',
      tags: ['Lead Gen', 'CRM', 'Email', 'Automation'],
      author: 'MarketingGuru_Bot',
      verified: false,
      featured: false,
      thumbnail: '/api/placeholder/300/200',
      preview: 'https://demo.example.com/lead-generator',
      lastUpdated: '3 days ago',
      complexity: 'Beginner'
    },
    {
      id: 4,
      title: 'Customer Support AI Assistant',
      description: 'Intelligent customer support system with ticket routing, automated responses, sentiment analysis, and escalation management.',
      price: 79.99,
      rating: 4.7,
      downloads: 634,
      category: 'Customer Service',
      tags: ['Support', 'Chatbot', 'Sentiment', 'Ticketing'],
      author: 'SupportPro_AI',
      verified: true,
      featured: false,
      thumbnail: '/api/placeholder/300/200',
      preview: 'https://demo.example.com/support-assistant',
      lastUpdated: '5 days ago',
      complexity: 'Intermediate'
    },
    {
      id: 5,
      title: 'Social Media Manager',
      description: 'Complete social media automation including content scheduling, engagement tracking, hashtag optimization, and performance analytics.',
      price: 39.99,
      rating: 4.5,
      downloads: 1089,
      category: 'Social Media',
      tags: ['Social', 'Scheduling', 'Analytics', 'Engagement'],
      author: 'SocialBot_Pro',
      verified: false,
      featured: false,
      thumbnail: '/api/placeholder/300/200',
      preview: 'https://demo.example.com/social-manager',
      lastUpdated: '1 day ago',
      complexity: 'Beginner'
    },
    {
      id: 6,
      title: 'Financial Data Analyzer',
      description: 'Advanced financial data processing and analysis with real-time market monitoring, risk assessment, and automated reporting.',
      price: 149.99,
      rating: 4.9,
      downloads: 421,
      category: 'Analytics',
      tags: ['Finance', 'Analytics', 'Reports', 'Risk'],
      author: 'FinanceBot_Expert',
      verified: true,
      featured: true,
      thumbnail: '/api/placeholder/300/200',
      preview: 'https://demo.example.com/finance-analyzer',
      lastUpdated: '4 days ago',
      complexity: 'Advanced'
    }
  ];

  const featuredAgents = agents.filter(agent => agent.featured);
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           agent.category.toLowerCase() === selectedCategory;
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'free' && agent.price === 0) ||
                        (priceFilter === 'paid' && agent.price > 0);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              AI Agent Marketplace
            </h1>
            <p className="text-gray-400 text-base lg:text-lg">Discover, purchase, and deploy AI agents built by the community</p>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search agents, descriptions, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-green-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:border-green-500 transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                
                <select 
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:border-green-500 transition-colors"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:border-green-500 transition-colors"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Recently Updated</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <div className="w-full overflow-x-auto mb-6">
              <TabsList className="grid w-full grid-cols-3 min-w-[300px] lg:w-96 bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                <TabsTrigger value="browse" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500">
                  <Package className="w-4 h-4 mr-2" />
                  Browse
                </TabsTrigger>
                <TabsTrigger value="featured" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500">
                  <Star className="w-4 h-4 mr-2" />
                  Featured
                </TabsTrigger>
                <TabsTrigger value="my-agents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500">
                  <Bot className="w-4 h-4 mr-2" />
                  My Agents
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Browse Tab */}
            <TabsContent value="browse" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Categories Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-sm flex items-center">
                        <Filter className="w-4 h-4 mr-2 text-green-500" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div 
                            key={category.id} 
                            className={`flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-all group ${selectedCategory === category.id ? 'bg-green-500/20 border border-green-500/30' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div className="flex items-center space-x-2 min-w-0">
                              <IconComponent className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm group-hover:text-white transition-colors truncate">{category.label}</span>
                            </div>
                            <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs flex-shrink-0">
                              {category.count}
                            </Badge>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-white text-sm flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                        Marketplace Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Agents</span>
                        <span className="text-white font-medium">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Downloads Today</span>
                        <span className="text-green-400 font-medium">892</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Active Sellers</span>
                        <span className="text-blue-400 font-medium">324</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6 min-w-0">
                  {/* Results Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{filteredAgents.length} agents found</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </div>

                  {/* Agent Grid */}
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAgents.map((agent) => (
                      <Card key={agent.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg group overflow-hidden">
                        <div className="relative">
                          <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                            <Bot className="w-12 h-12 text-gray-500" />
                          </div>
                          
                          {agent.featured && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                              <Crown className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          
                          <div className="absolute top-3 right-3 flex gap-2">
                            {agent.verified && (
                              <Badge className="bg-blue-500 text-white">
                                <Award className="w-3 h-3" />
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors mb-1 break-words">
                              {agent.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed break-words line-clamp-2">
                              {agent.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {agent.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {agent.tags.length > 3 && (
                              <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                                +{agent.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-400" />
                                {agent.rating}
                              </span>
                              <span className="flex items-center">
                                <Download className="w-3 h-3 mr-1" />
                                {agent.downloads}
                              </span>
                            </div>
                            <span className="text-gray-500 text-xs">{agent.lastUpdated}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-green-400">
                                {agent.price === 0 ? 'Free' : `$${agent.price}`}
                              </span>
                              <Badge className={`text-xs ${
                                agent.complexity === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                agent.complexity === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {agent.complexity}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" className="border-gray-600 hover:border-green-500 p-2">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                                {agent.price === 0 ? (
                                  <>
                                    <Download className="w-4 h-4 mr-1" />
                                    <span className="hidden sm:inline">Install</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="w-4 h-4 mr-1" />
                                    <span className="hidden sm:inline">Buy</span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>by {agent.author}</span>
                              <span>{agent.category}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Featured Tab */}
            <TabsContent value="featured" className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAgents.map((agent) => (
                  <Card key={agent.id} className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg group overflow-hidden">
                    {/* ... keep existing card content structure but with featured styling */}
                    <div className="relative">
                      <div className="w-full h-40 bg-gradient-to-br from-yellow-700/20 to-orange-700/20 flex items-center justify-center">
                        <Bot className="w-12 h-12 text-yellow-500" />
                      </div>
                      
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                        <Crown className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors mb-1 break-words">
                          {agent.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed break-words line-clamp-2">
                          {agent.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {agent.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-yellow-600 text-yellow-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-400" />
                            {agent.rating}
                          </span>
                          <span className="flex items-center">
                            <Download className="w-3 h-3 mr-1" />
                            {agent.downloads}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-yellow-400">
                          {agent.price === 0 ? 'Free' : `$${agent.price}`}
                        </span>
                        
                        <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium">
                          {agent.price === 0 ? (
                            <>
                              <Download className="w-4 h-4 mr-1" />
                              Install
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Buy Now
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Agents Tab */}
            <TabsContent value="my-agents" className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-purple-500" />
                      My Published Agents
                    </span>
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Publish Agent
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No agents published yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Share your automation expertise with the community. Publish your first agent and start earning!
                    </p>
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      <Rocket className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
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
