import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye,
  Clock,
  Users,
  Zap,
  Mail,
  Database,
  ShoppingCart,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  TrendingUp,
  Plus,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CommentsInterface from '@/components/CommentsInterface';
import ShareInterface from '@/components/ShareInterface';
import TemplatePreview from '@/components/TemplatePreview';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [commentsModal, setCommentsModal] = useState<{isOpen: boolean, template: any}>({isOpen: false, template: null});
  const [shareModal, setShareModal] = useState<{isOpen: boolean, template: any}>({isOpen: false, template: null});
  const [previewModal, setPreviewModal] = useState<{isOpen: boolean, template: any}>({isOpen: false, template: null});

  const categories = [
    { id: 'all', name: 'All Templates', icon: Settings, count: 45 },
    { id: 'marketing', name: 'Marketing', icon: Mail, count: 12 },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 8 },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, count: 6 },
    { id: 'automation', name: 'Automation', icon: Zap, count: 10 },
    { id: 'crm', name: 'CRM', icon: Users, count: 9 }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest First' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'downloads', name: 'Most Downloaded' }
  ];

  const featuredTemplates = [
    {
      id: 1,
      title: "Customer Onboarding Flow",
      description: "Automated welcome sequence with personalized emails, task assignments, and progress tracking for new customers.",
      category: "marketing",
      rating: 4.9,
      downloads: 1247,
      author: "OrchestrAI Team",
      tags: ["email", "automation", "customer-success"],
      difficulty: "Beginner",
      estimatedTime: "15 min",
      isPopular: true,
      preview: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "E-commerce Order Processing",
      description: "Complete order management workflow from payment verification to shipping notifications and inventory updates.",
      category: "ecommerce",
      rating: 4.8,
      downloads: 892,
      author: "Sarah Chen",
      tags: ["orders", "inventory", "shipping"],
      difficulty: "Intermediate",
      estimatedTime: "30 min",
      isPopular: true,
      preview: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Data Analytics Pipeline",
      description: "ETL workflow for processing customer data, generating insights, and creating automated reports with visualizations.",
      category: "analytics",
      rating: 4.7,
      downloads: 654,
      author: "Data Team",
      tags: ["etl", "reports", "visualization"],
      difficulty: "Advanced",
      estimatedTime: "45 min",
      isPopular: false,
      preview: "/api/placeholder/300/200"
    }
  ];

  const allTemplates = [
    ...featuredTemplates,
    {
      id: 4,
      title: "Lead Scoring & Nurturing",
      description: "Intelligent lead qualification system with automated scoring and personalized nurturing campaigns.",
      category: "crm",
      rating: 4.6,
      downloads: 543,
      author: "Marcus Rodriguez",
      tags: ["leads", "scoring", "nurturing"],
      difficulty: "Intermediate",
      estimatedTime: "25 min",
      isPopular: false,
      preview: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Social Media Scheduler",
      description: "Multi-platform social media posting with content optimization and engagement tracking.",
      category: "marketing",
      rating: 4.5,
      downloads: 789,
      author: "Emily Johnson",
      tags: ["social-media", "scheduling", "content"],
      difficulty: "Beginner",
      estimatedTime: "20 min",
      isPopular: false,
      preview: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Inventory Management System",
      description: "Real-time inventory tracking with automated reordering and supplier notifications.",
      category: "ecommerce",
      rating: 4.8,
      downloads: 432,
      author: "Inventory Pro",
      tags: ["inventory", "automation", "suppliers"],
      difficulty: "Advanced",
      estimatedTime: "40 min",
      isPopular: false,
      preview: "/api/placeholder/300/200"
    }
  ];

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty.toLowerCase() === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest': return b.id - a.id;
      case 'rating': return b.rating - a.rating;
      case 'downloads': return b.downloads - a.downloads;
      case 'popular': 
      default: return b.isPopular ? 1 : -1;
    }
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('popular');
  };

  const openComments = (template: any) => {
    setCommentsModal({isOpen: true, template});
  };

  const openShare = (template: any) => {
    setShareModal({isOpen: true, template});
  };

  const openPreview = (template: any) => {
    setPreviewModal({isOpen: true, template});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {/* Header Section - Enhanced */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Workflow <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pre-built automation templates to accelerate your workflow development. Choose from our curated collection or customize to fit your needs.
          </p>
        </div>

        {/* Search and Filter Section - Enhanced */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 mb-8 animate-fade-in animation-delay-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search templates, categories, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 h-12 text-lg"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all duration-300 h-12 px-6"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 animate-fade-in">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Difficulty</label>
                <select 
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={clearFilters}
                  variant="outline" 
                  className="w-full border-gray-600 hover:bg-gray-700/50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Categories Section - Enhanced */}
        <div className="mb-8 animate-fade-in animation-delay-300">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
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
                  <Icon className={`w-6 h-6 mx-auto mb-3 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  <h3 className={`font-medium text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {category.name}
                  </h3>
                  <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    {category.count} templates
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Templates Section - Enhanced */}
        <div className="mb-12 animate-fade-in animation-delay-400">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Featured Templates</h2>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Popular</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((template, index) => (
              <div key={template.id} className={`card-hover bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                {/* Template Preview */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border-b border-gray-700/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Template Preview</p>
                  </div>
                  {template.isPopular && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Template Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {template.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{template.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300">
                      Use Template
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => openPreview(template)}
                      className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => openComments(template)}
                      className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Templates Section - Enhanced */}
        <div className="animate-fade-in animation-delay-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              All Templates {selectedCategory !== 'all' && `(${categories.find(c => c.id === selectedCategory)?.name})`}
            </h2>
            <p className="text-gray-400">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" variant="pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <div key={template.id} className={`card-hover bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 group animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
                        {template.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 ml-3">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{template.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{template.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300">
                      Use Template
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => openPreview(template)}
                      className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openComments(template)}
                      className="flex-1 border-gray-600 hover:bg-gray-700/50 hover-scale transition-all text-xs"
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Comments
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openShare(template)}
                      className="flex-1 border-gray-600 hover:bg-gray-700/50 hover-scale transition-all text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredTemplates.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                onClick={clearFilters}
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700/50"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section - Enhanced */}
        <div className="mt-16 text-center animate-fade-in animation-delay-600">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't find what you need?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Create your own custom workflow or request a template from our community. Our experts are here to help you build the perfect automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agent-builder">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Custom Workflow
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all duration-300">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Template
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CommentsInterface
        isOpen={commentsModal.isOpen}
        onClose={() => setCommentsModal({isOpen: false, template: null})}
        itemTitle={commentsModal.template?.title || ''}
        itemType="template"
      />

      <ShareInterface
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({isOpen: false, template: null})}
        itemTitle={shareModal.template?.title || ''}
        itemType="template"
      />

      <TemplatePreview
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({isOpen: false, template: null})}
        template={previewModal.template || {}}
      />
    </div>
  );
};

export default Templates;
