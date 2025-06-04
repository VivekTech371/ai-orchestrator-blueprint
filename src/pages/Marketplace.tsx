
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
  Heart
} from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'blogging', label: 'Blogging' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Sales' },
    { id: 'chatbots', label: 'Chatbots' },
    { id: 'crm', label: 'CRM' },
    { id: 'email', label: 'Email Marketing' }
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
      thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop'
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
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
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
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Customer Support Chatbot Pro',
      description: 'Enterprise-level chatbot with NLP, multilingual support, and seamless human handoff',
      price: 39.99,
      creator: 'AI Support Systems',
      rating: 4.6,
      reviews: 156,
      sales: 840,
      category: 'chatbots',
      tags: ['Chatbot', 'NLP', 'Support', 'Multilingual'],
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Email Campaign Optimizer',
      description: 'Advanced email marketing automation with A/B testing, personalization, and deliverability optimization',
      price: 24.99,
      creator: 'EmailMaster Pro',
      rating: 4.8,
      reviews: 178,
      sales: 1450,
      category: 'email',
      tags: ['Email', 'A/B Testing', 'Personalization', 'Analytics'],
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'CRM Data Sync Engine',
      description: 'Powerful CRM integration tool that syncs data across multiple platforms and maintains data consistency',
      price: 34.99,
      creator: 'DataSync Solutions',
      rating: 4.5,
      reviews: 92,
      sales: 520,
      category: 'crm',
      tags: ['CRM', 'Data Sync', 'Integration', 'Automation'],
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    }
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
      status: 'active'
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
      status: 'active'
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

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">AI Agent Marketplace</h1>
            <p className="text-gray-400">Discover, buy, and sell premium automation workflows</p>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96 bg-gray-800 border-gray-700">
              <TabsTrigger value="browse" className="data-[state=active]:bg-purple-500">
                Browse
              </TabsTrigger>
              <TabsTrigger value="my-agents" className="data-[state=active]:bg-purple-500">
                My Agents
              </TabsTrigger>
              <TabsTrigger value="earnings" className="data-[state=active]:bg-purple-500">
                Earnings
              </TabsTrigger>
            </TabsList>

            {/* Browse Tab */}
            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <div className="grid lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
                
                <select 
                  value={priceFilter} 
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Featured Section */}
              {filteredAgents.filter(agent => agent.featured).length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Featured Agents</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredAgents.filter(agent => agent.featured).map((agent) => (
                      <Card key={agent.id} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 hover:border-purple-400 transition-all">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img 
                              src={agent.thumbnail} 
                              alt={agent.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <Badge className="absolute top-4 left-4 bg-purple-500 text-white">
                              Featured
                            </Badge>
                            <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                              ${agent.price}
                            </Badge>
                          </div>
                          
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-2">{agent.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {agent.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                  {agent.rating} ({agent.reviews})
                                </span>
                                <span className="flex items-center">
                                  <Download className="w-3 h-3 mr-1" />
                                  {agent.sales}
                                </span>
                              </div>
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {agent.creator}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Buy Now
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Agents Grid */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">All Agents</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgents.map((agent) => (
                    <Card key={agent.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img 
                            src={agent.thumbnail} 
                            alt={agent.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                            ${agent.price}
                          </Badge>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2">{agent.title}</h3>
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
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
                              Buy
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* My Agents Tab */}
            <TabsContent value="my-agents" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">My Published Agents</h2>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  Publish New Agent
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAgents.map((agent) => (
                  <Card key={agent.id} className="bg-gray-800 border-gray-700">
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
                        <div>
                          <span className="text-gray-400">Price:</span>
                          <p className="text-white font-medium">${agent.price}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Sales:</span>
                          <p className="text-white font-medium">{agent.sales}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Revenue:</span>
                          <p className="text-green-400 font-medium">${agent.revenue}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Rating:</span>
                          <p className="text-white font-medium">{agent.rating} ⭐</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          Stats
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          Promote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Earnings Stats */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">$487.65</p>
                    <p className="text-sm text-gray-400">Total Earnings</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <ShoppingCart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">35</p>
                    <p className="text-sm text-gray-400">Total Sales</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">$124.50</p>
                    <p className="text-sm text-gray-400">This Month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">4.3</p>
                    <p className="text-sm text-gray-400">Avg Rating</p>
                  </CardContent>
                </Card>
              </div>

              {/* Earnings Chart Placeholder */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Earnings chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Sales */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { agent: 'Personal Blog Assistant', buyer: 'user_1234', amount: 15.99, date: '2 hours ago' },
                      { agent: 'Lead Capture Bot', buyer: 'user_5678', amount: 9.99, date: '1 day ago' },
                      { agent: 'Personal Blog Assistant', buyer: 'user_9012', amount: 15.99, date: '2 days ago' },
                    ].map((sale, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                        <div>
                          <p className="text-white font-medium">{sale.agent}</p>
                          <p className="text-sm text-gray-400">Sold to {sale.buyer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-medium">${sale.amount}</p>
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
