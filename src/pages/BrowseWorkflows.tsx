
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Heart, 
  Download, 
  Eye, 
  Star, 
  Zap,
  Bot,
  Database,
  Globe,
  Target,
  TrendingUp,
  Clock,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BrowseWorkflows = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const workflows = [
    {
      id: 1,
      title: 'Customer Support AI Agent',
      description: 'Automated customer service bot with sentiment analysis and ticket routing',
      author: 'Sarah Chen',
      avatar: '👩‍💻',
      category: 'Customer Service',
      icon: Bot,
      likes: 342,
      downloads: 1205,
      views: 8934,
      rating: 4.8,
      tags: ['AI', 'Customer Support', 'Automation'],
      featured: true,
      price: 'Free'
    },
    {
      id: 2,
      title: 'E-commerce Analytics Dashboard',
      description: 'Real-time sales tracking, inventory management, and customer insights',
      author: 'Mike Rodriguez',
      avatar: '👨‍💼',
      category: 'Analytics',
      icon: TrendingUp,
      likes: 256,
      downloads: 892,
      views: 5432,
      rating: 4.6,
      tags: ['Analytics', 'E-commerce', 'Dashboard'],
      featured: false,
      price: '$15'
    },
    {
      id: 3,
      title: 'Social Media Content Generator',
      description: 'AI-powered content creation for multiple social media platforms',
      author: 'Alex Thompson',
      avatar: '🎨',
      category: 'Content Creation',
      icon: Zap,
      likes: 189,
      downloads: 634,
      views: 3421,
      rating: 4.4,
      tags: ['Content', 'Social Media', 'AI'],
      featured: false,
      price: '$8'
    },
    {
      id: 4,
      title: 'Data Processing Pipeline',
      description: 'Automated data cleaning, transformation, and analysis workflow',
      author: 'Emma Wilson',
      avatar: '📊',
      category: 'Data Processing',
      icon: Database,
      likes: 412,
      downloads: 1456,
      views: 9876,
      rating: 4.9,
      tags: ['Data', 'Processing', 'Analytics'],
      featured: true,
      price: 'Free'
    },
    {
      id: 5,
      title: 'API Integration Hub',
      description: 'Connect multiple APIs with automated error handling and retries',
      author: 'David Lee',
      avatar: '🔗',
      category: 'Integration',
      icon: Globe,
      likes: 298,
      downloads: 756,
      views: 4567,
      rating: 4.7,
      tags: ['API', 'Integration', 'Automation'],
      featured: false,
      price: '$12'
    },
    {
      id: 6,
      title: 'Lead Scoring Engine',
      description: 'Machine learning model to score and prioritize sales leads',
      author: 'Lisa Garcia',
      avatar: '🎯',
      category: 'Sales',
      icon: Target,
      likes: 167,
      downloads: 423,
      views: 2134,
      rating: 4.3,
      tags: ['Sales', 'ML', 'Scoring'],
      featured: false,
      price: '$25'
    }
  ];

  const categories = ['all', 'Customer Service', 'Analytics', 'Content Creation', 'Data Processing', 'Integration', 'Sales'];

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || workflow.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Browse Workflows
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover and use workflows created by the community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workflows, tags, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    activeFilter === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700'
                  )}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/60 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="downloads">Most Downloaded</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Workflows */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Workflows</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedWorkflows.filter(w => w.featured).map((workflow) => {
              const Icon = workflow.icon;
              return (
                <div key={workflow.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">{workflow.title}</h3>
                        <Badge className="bg-yellow-500 text-black text-xs">Featured</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{workflow.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{workflow.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-400">{workflow.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{workflow.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-3 h-3" />
                            <span>{workflow.downloads}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{workflow.views}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-white">{workflow.price}</span>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Workflows */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">All Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkflows.map((workflow) => {
              const Icon = workflow.icon;
              return (
                <div key={workflow.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {workflow.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {workflow.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {workflow.description}
                  </p>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg">{workflow.avatar}</span>
                    <span className="text-sm text-gray-400">{workflow.author}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {workflow.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{workflow.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{workflow.downloads}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{workflow.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">{workflow.price}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        Use
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
            Load More Workflows
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseWorkflows;
