
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
  ShoppingCart,
  Eye,
  Heart,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Clock,
  Users,
  DollarSign,
  Package,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Code,
  Smartphone,
  Mail,
  BarChart3
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Package, count: 156 },
    { id: 'automation', name: 'Automation', icon: Zap, count: 45 },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, count: 28 },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 34 },
    { id: 'marketing', name: 'Marketing', icon: Mail, count: 29 },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 20 }
  ];

  const pricingFilters = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'premium', name: 'Premium' },
    { id: 'enterprise', name: 'Enterprise' }
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Advanced Customer Analytics Suite",
      description: "Comprehensive customer behavior analysis with AI-powered insights, predictive modeling, and automated reporting dashboards.",
      price: 49.99,
      originalPrice: 79.99,
      category: "analytics",
      rating: 4.9,
      reviews: 247,
      downloads: 3421,
      author: {
        name: "DataFlow Solutions",
        avatar: "DS",
        verified: true
      },
      tags: ["analytics", "ai", "reporting", "dashboard"],
      features: ["Real-time Analytics", "AI Predictions", "Custom Reports", "API Integration"],
      isFeatured: true,
      isOnSale: true,
      discount: 38,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "E-commerce Automation Pro",
      description: "Complete e-commerce workflow automation including inventory management, order processing, and customer communication.",
      price: 79.99,
      originalPrice: null,
      category: "ecommerce",
      rating: 4.8,
      reviews: 189,
      downloads: 2156,
      author: {
        name: "Commerce Tech",
        avatar: "CT",
        verified: true
      },
      tags: ["ecommerce", "automation", "inventory", "orders"],
      features: ["Order Automation", "Inventory Sync", "Customer Emails", "Multi-store Support"],
      isFeatured: true,
      isOnSale: false,
      discount: 0,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Marketing Campaign Manager",
      description: "Streamline your marketing efforts with automated campaign creation, A/B testing, and performance optimization.",
      price: 0,
      originalPrice: null,
      category: "marketing",
      rating: 4.7,
      reviews: 312,
      downloads: 5643,
      author: {
        name: "Marketing Masters",
        avatar: "MM",
        verified: true
      },
      tags: ["marketing", "campaigns", "ab-testing", "free"],
      features: ["Campaign Builder", "A/B Testing", "Performance Tracking", "Email Integration"],
      isFeatured: true,
      isOnSale: false,
      discount: 0,
      thumbnail: "/api/placeholder/400/300"
    }
  ];

  const allItems = [
    ...featuredItems,
    {
      id: 4,
      title: "Mobile App Workflow Builder",
      description: "Create powerful mobile app workflows with native integrations and cross-platform compatibility.",
      price: 29.99,
      originalPrice: null,
      category: "mobile",
      rating: 4.6,
      reviews: 156,
      downloads: 1243,
      author: {
        name: "Mobile Innovators",
        avatar: "MI",
        verified: false
      },
      tags: ["mobile", "cross-platform", "integrations"],
      features: ["Native APIs", "Cross-platform", "Push Notifications", "App Store Ready"],
      isFeatured: false,
      isOnSale: false,
      discount: 0,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Security Compliance Toolkit",
      description: "Ensure your workflows meet industry standards with automated security checks and compliance reporting.",
      price: 149.99,
      originalPrice: 199.99,
      category: "automation",
      rating: 4.9,
      reviews: 89,
      downloads: 567,
      author: {
        name: "SecureFlow Inc.",
        avatar: "SF",
        verified: true
      },
      tags: ["security", "compliance", "enterprise", "audit"],
      features: ["Security Scans", "Compliance Reports", "Audit Logs", "Enterprise Support"],
      isFeatured: false,
      isOnSale: true,
      discount: 25,
      thumbnail: "/api/placeholder/400/300"
    }
  ];

  const marketplaceStats = [
    { label: "Total Downloads", value: "2.5M+", icon: Download, growth: "+18%" },
    { label: "Active Developers", value: "1.2K", icon: Users, growth: "+12%" },
    { label: "Published Items", value: "156", icon: Package, growth: "+25%" },
    { label: "Average Rating", value: "4.8★", icon: Star, growth: "+3%" }
  ];

  const topSellers = [
    { name: "DataFlow Solutions", items: 12, revenue: "$45K", avatar: "DS" },
    { name: "Commerce Tech", items: 8, revenue: "$32K", avatar: "CT" },
    { name: "Automation Pro", items: 15, revenue: "$28K", avatar: "AP" },
    { name: "AI Workflows", items: 6, revenue: "$21K", avatar: "AW" }
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPricing = selectedPricing === 'all' || 
                          (selectedPricing === 'free' && item.price === 0) ||
                          (selectedPricing === 'premium' && item.price > 0 && item.price < 100) ||
                          (selectedPricing === 'enterprise' && item.price >= 100);
    return matchesSearch && matchesCategory && matchesPricing;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {/* Header Section - Enhanced */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Workflow <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover premium workflows, integrations, and automation tools created by our community of experts. 
            Accelerate your projects with ready-to-use solutions.
          </p>
        </div>

        {/* Marketplace Stats - Enhanced */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in animation-delay-200">
          {marketplaceStats.map((stat, index) => {
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

        {/* Search and Filters - Enhanced */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 mb-8 animate-fade-in animation-delay-300">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search workflows, integrations, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 h-12 text-lg"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                {pricingFilters.map(filter => (
                  <option key={filter.id} value={filter.id}>
                    {filter.name}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all duration-300 h-12 px-6">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Items - Enhanced */}
        <div className="mb-12 animate-fade-in animation-delay-400">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Featured Items</h2>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Editor's Choice</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <div key={item.id} className={`card-hover bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                {/* Item Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border-b border-gray-700/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Preview Available</p>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isFeatured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {item.isOnSale && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        -{item.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      {item.price === 0 ? (
                        <span className="text-green-400 font-semibold">FREE</span>
                      ) : (
                        <div className="text-white">
                          <span className="text-lg font-bold">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-1">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Item Content */}
                <div className="p-6">
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {item.author.avatar}
                    </div>
                    <span className="text-gray-400 text-sm">{item.author.name}</span>
                    {item.author.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1 flex-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400 ml-3">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{item.rating}</span>
                      <span className="text-xs text-gray-500">({item.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    {item.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-center gap-1 text-gray-400">
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{item.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300">
                      {item.price === 0 ? 'Download' : 'Purchase'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-gray-600 hover:bg-gray-700/50 hover-scale transition-all">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* All Items */}
            <div className="animate-fade-in animation-delay-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  All Items {selectedCategory !== 'all' && `(${categories.find(c => c.id === selectedCategory)?.name})`}
                </h2>
                <p className="text-gray-400">
                  {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <LoadingSpinner size="lg" variant="pulse" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item, index) => (
                    <div key={item.id} className={`card-hover bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 group animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-8 h-8 text-blue-400" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-400 ml-3">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs">
                                {item.author.avatar}
                              </div>
                              <span className="text-gray-400 text-sm">{item.author.name}</span>
                            </div>
                            
                            <div className="text-right">
                              {item.price === 0 ? (
                                <span className="text-green-400 font-semibold">FREE</span>
                              ) : (
                                <div>
                                  <span className="text-white font-bold">${item.price}</span>
                                  {item.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through ml-1">
                                      ${item.originalPrice}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
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
            {/* Top Sellers */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Top Sellers</h3>
              </div>
              <div className="space-y-4">
                {topSellers.map((seller, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {seller.avatar}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{seller.name}</h4>
                        <p className="text-gray-400 text-xs">{seller.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold text-sm">{seller.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Become a Seller */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 animate-fade-in animation-delay-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Become a Seller</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Share your workflows with the community and earn revenue from your creations.
              </p>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>70% revenue share</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Global marketplace reach</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Marketing support</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all duration-300">
                Start Selling
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
