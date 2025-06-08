import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import LikeButton from '@/components/LikeButton';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Clock,
  Star,
  BookOpen
} from 'lucide-react';

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('trending');

  const posts = [
    {
      id: 1,
      title: 'How I Built a Customer Service AI Agent That Reduced Response Time by 80%',
      author: 'Sarah Chen',
      avatar: '/placeholder.svg',
      content: 'After months of development, I\'m excited to share my customer service AI agent that has transformed our support workflow...',
      tags: ['AI', 'Customer Service', 'Automation'],
      likes: 42,
      comments: 15,
      views: 234,
      timeAgo: '2 hours ago',
      isLiked: false
    },
    {
      id: 2,
      title: 'The Ultimate Guide to AI-Powered Content Creation',
      author: 'David Lee',
      avatar: '/placeholder.svg',
      content: 'In this comprehensive guide, I\'ll walk you through the process of creating high-quality content using AI tools and techniques...',
      tags: ['AI', 'Content Creation', 'Marketing'],
      likes: 78,
      comments: 23,
      views: 312,
      timeAgo: '5 hours ago',
      isLiked: true
    },
    {
      id: 3,
      title: 'Building a Community with AI: My Experience',
      author: 'Emily White',
      avatar: '/placeholder.svg',
      content: 'I\'ve been experimenting with AI to build and manage online communities, and I\'m excited to share my findings with you...',
      tags: ['AI', 'Community Building', 'Social Media'],
      likes: 56,
      comments: 18,
      views: 189,
      timeAgo: '1 day ago',
      isLiked: false
    },
    {
      id: 4,
      title: 'AI in Education: Transforming the Learning Experience',
      author: 'Michael Brown',
      avatar: '/placeholder.svg',
      content: 'AI is revolutionizing the education sector, and I\'m here to explore the possibilities and challenges of this exciting technology...',
      tags: ['AI', 'Education', 'Technology'],
      likes: 63,
      comments: 21,
      views: 267,
      timeAgo: '3 days ago',
      isLiked: true
    }
  ];

  const templates = [
    {
      id: 1,
      title: 'E-commerce Support Bot',
      author: 'Alex Rodriguez',
      description: 'Ready-to-use template for handling e-commerce customer inquiries',
      downloads: 156,
      rating: 4.8,
      category: 'Customer Service'
    },
    {
      id: 2,
      title: 'Marketing Email Generator',
      author: 'Jessica Davis',
      description: 'Template for generating personalized marketing emails with AI',
      downloads: 89,
      rating: 4.5,
      category: 'Marketing'
    },
    {
      id: 3,
      title: 'Data Analysis Workflow',
      author: 'Kevin Smith',
      description: 'Automated workflow for analyzing and visualizing data with AI',
      downloads: 112,
      rating: 4.7,
      category: 'Data Analysis'
    },
    {
      id: 4,
      title: 'Social Media Content Creator',
      author: 'Laura Johnson',
      description: 'Template for creating engaging social media content with AI',
      downloads: 67,
      rating: 4.3,
      category: 'Social Media'
    }
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Community
              </h1>
              <p className="text-gray-400">
                Connect, share, and learn from fellow AI builders
              </p>
            </div>
            
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts and discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800/60 p-1 rounded-lg">
            {[
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'recent', label: 'Recent', icon: Clock },
              { id: 'templates', label: 'Templates', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'templates' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{template.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {template.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {template.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">by {template.author}</span>
                  <span className="text-xs text-gray-500">{template.downloads} downloads</span>
                </div>

                <WorkingButton 
                  action="useTemplate"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Use Template
                </WorkingButton>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full bg-gray-700"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">{post.author}</h3>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{post.timeAgo}</span>
                    </div>
                    
                    <h2 className="text-lg font-bold text-white mb-3 hover:text-blue-400 cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <LikeButton 
                          itemId={post.id.toString()}
                          initialLiked={post.isLiked}
                          initialCount={post.likes}
                          size="sm"
                        />
                        
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </Button>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
