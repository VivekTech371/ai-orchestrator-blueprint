import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import { 
  Bookmark, 
  Heart, 
  Share2, 
  Eye, 
  Star,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  User,
  Zap,
  Trash2
} from 'lucide-react';

const Bookmarks = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'Customer Service AI Template',
      description: 'Advanced AI agent template for handling customer support inquiries with natural language processing.',
      type: 'template',
      category: 'Customer Support',
      author: 'AI Templates Inc.',
      rating: 4.8,
      bookmarkedAt: '2 days ago',
      tags: ['AI', 'Customer Service', 'NLP'],
      price: 'Free',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'E-commerce Order Processing Workflow',
      description: 'Automated workflow for processing e-commerce orders, inventory management, and shipping notifications.',
      type: 'workflow',
      category: 'E-commerce',
      author: 'WorkflowMaster',
      rating: 4.9,
      bookmarkedAt: '1 week ago',
      tags: ['E-commerce', 'Automation', 'Orders'],
      price: '$29',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Data Analysis Assistant',
      description: 'AI-powered data analysis tool that can process CSV files, generate insights, and create visualizations.',
      type: 'agent',
      category: 'Data Science',
      author: 'DataPro Solutions',
      rating: 4.7,
      bookmarkedAt: '3 days ago',
      tags: ['Data Analysis', 'CSV', 'Visualization'],
      price: '$15',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Social Media Content Moderator',
      description: 'Automated content moderation system for social media platforms with advanced filtering capabilities.',
      type: 'template',
      category: 'Content Management',
      author: 'SocialGuard',
      rating: 4.6,
      bookmarkedAt: '5 days ago',
      tags: ['Social Media', 'Moderation', 'AI'],
      price: 'Free',
      image: '/api/placeholder/300/200'
    }
  ]);

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && bookmark.type === filter;
  });

  const BookmarkCard = ({ bookmark, compact = false }: { bookmark: any, compact?: boolean }) => (
    <div className={`bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group ${compact ? 'p-4' : 'p-6'}`}>
      <div className={`flex ${compact ? 'items-center gap-4' : 'flex-col'}`}>
        {!compact && (
          <div className="relative mb-4 overflow-hidden rounded-lg">
            <img 
              src={bookmark.image} 
              alt={bookmark.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeBookmark(bookmark.id)}
                className="bg-black/50 border-gray-600 hover:bg-red-500/20 hover:border-red-500 text-red-400"
              >
                <Bookmark className="w-3 h-3 fill-current" />
              </Button>
            </div>
          </div>
        )}

        <div className={compact ? 'flex-1' : ''}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                {bookmark.type}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-400">{bookmark.rating}</span>
              </div>
            </div>
            {compact && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeBookmark(bookmark.id)}
                className="border-gray-600 hover:bg-red-500/20 hover:border-red-500 text-red-400"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>

          <h3 className={`font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors ${compact ? 'text-base' : 'text-lg'}`}>
            {bookmark.title}
          </h3>

          <p className={`text-gray-400 mb-3 ${compact ? 'text-sm line-clamp-1' : 'text-sm line-clamp-2'}`}>
            {bookmark.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {bookmark.tags.slice(0, compact ? 2 : 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className={`flex ${compact ? 'items-center' : 'flex-col gap-2'} justify-between`}>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <User className="w-3 h-3" />
              <span>{bookmark.author}</span>
              <Calendar className="w-3 h-3 ml-2" />
              <span>{bookmark.bookmarkedAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`font-semibold ${bookmark.price === 'Free' ? 'text-green-400' : 'text-blue-400'} ${compact ? 'text-sm' : 'text-base'}`}>
                {bookmark.price}
              </span>
              <WorkingButton 
                size="sm" 
                action="view"
                className="bg-blue-500 hover:bg-blue-600 text-xs"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </WorkingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
                Your saved templates, workflows, and agents
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`border-gray-600 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'}`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`border-gray-600 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </Button>
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter('all')}
                className={`border-gray-600 ${filter === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'}`}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter('template')}
                className={`border-gray-600 ${filter === 'template' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'}`}
              >
                Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter('workflow')}
                className={`border-gray-600 ${filter === 'workflow' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'}`}
              >
                Workflows
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter('agent')}
                className={`border-gray-600 ${filter === 'agent' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'}`}
              >
                Agents
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg font-semibold text-white">{bookmarks.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Templates</p>
                  <p className="text-lg font-semibold text-white">
                    {bookmarks.filter(b => b.type === 'template').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <List className="w-5 h-5 text-purple-400" />
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
                <Heart className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">Agents</p>
                  <p className="text-lg font-semibold text-white">
                    {bookmarks.filter(b => b.type === 'agent').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks Grid/List */}
        {filteredBookmarks.length === 0 ? (
          <div className="bg-gray-800/60 p-8 sm:p-12 rounded-xl border border-gray-700 text-center">
            <Bookmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No bookmarks found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start bookmarking templates and workflows you find interesting.'}
            </p>
            <Link to="/templates">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Search className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
            </Link>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} compact={viewMode === 'list'} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
