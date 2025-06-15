
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Star, 
  Download, 
  DollarSign,
  Filter,
  ShoppingCart,
  TrendingUp,
  Award,
  Users,
  Zap,
  FileText,
  Puzzle
} from 'lucide-react';

const MarketplaceStore = () => {
  const navigate = useNavigate();
  const { items, loading, fetchItems, purchaseItem, getFeaturedItems } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    fetchItems(categoryFilter);
    loadFeaturedItems();
  }, [categoryFilter]);

  const loadFeaturedItems = async () => {
    const featured = await getFeaturedItems();
    setFeaturedItems(featured);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['all', 'agent', 'workflow', 'template', 'integration'];

  const handlePurchase = async (itemId: string, itemTitle: string) => {
    if (window.confirm(`Purchase "${itemTitle}"?`)) {
      try {
        await purchaseItem(itemId);
      } catch (error) {
        console.error('Purchase failed:', error);
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'agent': return <Users className="w-4 h-4" />;
      case 'workflow': return <Zap className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      case 'integration': return <Puzzle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Marketplace</h1>
        <p className="text-gray-400">Discover and purchase premium AI agents, workflows, and templates</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Featured Section */}
      {featuredItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Featured Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.slice(0, 3).map((item) => (
              <Card key={item.id} className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        <Badge className="bg-yellow-500 text-black text-xs mt-1">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500 text-black text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 line-clamp-2 mb-4">
                    {item.description}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {item.downloads}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {item.rating.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {formatPrice(item.price, item.currency)}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handlePurchase(item.id, item.title)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Items */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">All Items</h2>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-gray-800/60 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">{item.title}</CardTitle>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs mt-1">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 line-clamp-3 mb-4">
                    {item.description}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {item.downloads}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {item.rating.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {formatPrice(item.price, item.currency)}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handlePurchase(item.id, item.title)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-xs"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceStore;
