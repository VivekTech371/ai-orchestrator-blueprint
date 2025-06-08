import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import LikeButton from '@/components/LikeButton';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  TrendingUp,
  DollarSign,
  Users,
  Clock
} from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'customer-service', label: 'Customer Service' },
    { id: 'sales', label: 'Sales & Marketing' },
    { id: 'data-analysis', label: 'Data Analysis' },
    { id: 'automation', label: 'Automation' },
    { id: 'finance', label: 'Finance' }
  ];

  const agents = [
    {
      id: 1,
      title: 'Advanced Customer Support AI',
      description: 'Intelligent customer support agent with multi-language support and sentiment analysis.',
      author: 'TechCorp Solutions',
      price: 99,
      originalPrice: 149,
      rating: 4.8,
      reviews: 124,
      downloads: 1247,
      category: 'customer-service',
      tags: ['AI', 'Support', 'Multilingual'],
      featured: true,
      isLiked: false,
      likes: 89
    },
    {
      id: 2,
      title: 'Sales Lead Qualifier Bot',
      description: 'Automatically qualify and score sales leads based on predefined criteria.',
      author: 'SalesMax Inc',
      price: 0,
      rating: 4.6,
      reviews: 89,
      downloads: 2156,
      category: 'sales',
      tags: ['Sales', 'CRM', 'Automation'],
      featured: false,
      isLiked: true,
      likes: 156
    },
    {
      id: 3,
      title: 'Data Analysis & Reporting Agent',
      description: 'Comprehensive data analysis agent for generating reports and insights.',
      author: 'DataWise Analytics',
      price: 49,
      rating: 4.5,
      reviews: 67,
      downloads: 894,
      category: 'data-analysis',
      tags: ['Data', 'Analytics', 'Reporting'],
      featured: false,
      isLiked: false,
      likes: 72
    },
    {
      id: 4,
      title: 'Automated Workflow Manager',
      description: 'Streamline your business processes with this automated workflow management agent.',
      author: 'AutoFlow Systems',
      price: 79,
      rating: 4.7,
      reviews: 102,
      downloads: 1532,
      category: 'automation',
      tags: ['Workflow', 'Automation', 'Management'],
      featured: true,
      isLiked: true,
      likes: 112
    },
    {
      id: 5,
      title: 'Financial Analysis AI Agent',
      description: 'Analyze financial data, generate reports, and provide investment recommendations.',
      author: 'FinInsight Solutions',
      price: 129,
      originalPrice: 199,
      rating: 4.9,
      reviews: 156,
      downloads: 987,
      category: 'finance',
      tags: ['Finance', 'Analysis', 'Investment'],
      featured: false,
      isLiked: false,
      likes: 134
    },
    {
      id: 6,
      title: 'Basic Customer Support AI',
      description: 'Simple customer support agent with basic question answering capabilities.',
      author: 'SupportAI',
      price: 0,
      rating: 4.2,
      reviews: 45,
      downloads: 3456,
      category: 'customer-service',
      tags: ['AI', 'Support', 'Basic'],
      featured: false,
      isLiked: true,
      likes: 234
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'free' && agent.price === 0) ||
                        (priceFilter === 'paid' && agent.price > 0);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                AI Agent Marketplace
              </h1>
              <p className="text-gray-400">
                Discover, purchase, and deploy powerful AI agents
              </p>
            </div>
            
            <WorkingButton 
              action="startSelling"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Start Selling
            </WorkingButton>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search AI agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
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
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Agents</p>
                  <p className="text-lg font-semibold text-white">{agents.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Downloads</p>
                  <p className="text-lg font-semibold text-white">12.5k</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Creators</p>
                  <p className="text-lg font-semibold text-white">234</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">This Month</p>
                  <p className="text-lg font-semibold text-white">+47%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {agent.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                    {categories.find(c => c.id === agent.category)?.label}
                  </Badge>
                </div>
                
                <LikeButton 
                  itemId={agent.id.toString()}
                  initialLiked={agent.isLiked}
                  initialCount={agent.likes}
                  size="sm"
                />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {agent.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {agent.description}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-white font-medium">{agent.rating}</span>
                  <span className="text-xs text-gray-500">({agent.reviews})</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-xs text-gray-500">{agent.downloads} downloads</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    {agent.price === 0 ? (
                      <span className="text-green-400 font-bold text-lg">Free</span>
                    ) : (
                      <>
                        <span className="text-white font-bold text-lg">${agent.price}</span>
                        {agent.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">${agent.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">by {agent.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {agent.price === 0 ? (
                  <WorkingButton 
                    action="download"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-sm"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </WorkingButton>
                ) : (
                  <WorkingButton 
                    action="purchase"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-sm"
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    Purchase
                  </WorkingButton>
                )}
                <WorkingButton 
                  action="view"
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-700 text-sm"
                >
                  <Eye className="w-3 h-3" />
                </WorkingButton>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
