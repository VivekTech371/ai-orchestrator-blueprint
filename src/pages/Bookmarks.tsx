import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import LikeButton from '@/components/LikeButton';
import { 
  Bookmark, 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Star,
  Clock,
  FileText,
  Bot,
  Workflow,
  Trash2,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Bookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'Advanced Customer Support AI Agent',
      description: 'Intelligent customer support agent with multi-language support and sentiment analysis capabilities.',
      type: 'agent',
      author: 'TechCorp Solutions',
      rating: 4.8,
      reviews: 124,
      savedDate: '2 days ago',
      category: 'Customer Service',
      tags: ['AI', 'Support', 'Multilingual'],
      isLiked: true,
      likes: 89
    },
    {
      id: 2,
      title: 'Automated Data Analysis Workflow',
      description: 'Workflow for automatically analyzing and reporting on large datasets.',
      type: 'workflow',
      author: 'Data Insights Pro',
      rating: 4.5,
      reviews: 78,
      savedDate: '5 days ago',
      category: 'Data Analysis',
      tags: ['Data', 'Analysis', 'Automation'],
      isLiked: false,
      likes: 56
    },
    {
      id: 3,
      title: 'E-commerce Email Marketing Template',
      description: 'High-converting email template for promoting e-commerce products and offers.',
      type: 'template',
      author: 'Marketing Ace Templates',
      rating: 4.9,
      reviews: 156,
      savedDate: '1 week ago',
      category: 'Marketing',
      tags: ['Email', 'Marketing', 'E-commerce'],
      isLiked: true,
      likes: 112
    },
    {
      id: 4,
      title: 'AI-Powered Content Generation Agent',
      description: 'Agent for generating high-quality content for blogs, articles, and social media posts.',
      type: 'agent',
      author: 'ContentGenius AI',
      rating: 4.7,
      reviews: 95,
      savedDate: '2 weeks ago',
      category: 'Content Creation',
      tags: ['AI', 'Content', 'Generation'],
      isLiked: false,
      likes: 78
    }
  ]);

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || bookmark.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return Bot;
      case 'workflow':
        return Workflow;
      case 'template':
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'agent':
        return 'from-blue-500 to-cyan-500';
      case 'workflow':
        return 'from-purple-500 to-pink-500';
      case 'template':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Bookmarks
              </h1>
              <p className="text-gray-400">
                Your saved agents, workflows, and templates
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="agent">Agents</option>
              <option value="workflow">Workflows</option>
              <option value="template">Templates</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Saved</p>
                  <p className="text-lg font-semibold text-white">{bookmarks.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Agents</p>
                  <p className="text-lg font-semibold text-white">
                    {bookmarks.filter(b => b.type === 'agent').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Workflow className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Workflows</p>
                  <p className="text-lg font-semibold text-white">
                    {bookmarks.filter(b => b.type === 'workflow').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Templates</p>
                  <p className="text-lg font-semibold text-white">
                    {bookmarks.filter(b => b.type === 'template').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length === 0 ? (
          <div className="bg-gray-800/60 p-8 sm:p-12 rounded-xl border border-gray-700 text-center">
            <Bookmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No bookmarks found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start exploring and save your favorite agents, workflows, and templates.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark) => {
              const TypeIcon = getTypeIcon(bookmark.type);
              const typeColor = getTypeColor(bookmark.type);
              
              return (
                <div key={bookmark.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${typeColor} rounded-lg flex items-center justify-center`}>
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {bookmark.type}
                      </Badge>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900/95 border-gray-800">
                        <DropdownMenuItem 
                          onClick={() => removeBookmark(bookmark.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Bookmark
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {bookmark.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {bookmark.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white font-medium">{bookmark.rating}</span>
                      <span className="text-xs text-gray-500">({bookmark.reviews})</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-xs text-gray-500">by {bookmark.author}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {bookmark.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Saved {bookmark.savedDate}</span>
                    </div>
                    
                    <LikeButton 
                      itemId={bookmark.id.toString()}
                      initialLiked={bookmark.isLiked}
                      initialCount={bookmark.likes}
                      size="sm"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <WorkingButton 
                      action="view"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-sm"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </WorkingButton>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeBookmark(bookmark.id)}
                      className="border-gray-600 hover:bg-gray-700 text-red-400 hover:text-red-300 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
