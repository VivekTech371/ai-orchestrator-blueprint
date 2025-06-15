
import React, { useState, useEffect } from 'react';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Puzzle,
  Store,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const navigate = useNavigate();
  const { items, purchases, loading, fetchItems, getFeaturedItems } = useMarketplace();
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Marketplace</h1>
          <p className="text-gray-400">Discover and purchase premium AI tools and templates</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => navigate('/marketplace/store')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Store className="w-4 h-4 mr-2" />
            Browse Store
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Sell Item
          </Button>
        </div>
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

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="mt-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-8 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Featured AI Solutions</h2>
              <p className="text-gray-300 mb-6">
                Discover the most popular and highly-rated AI agents, workflows, and templates 
                created by our community of experts.
              </p>
              <Button className="bg-white text-black hover:bg-gray-100">
                Explore Featured Items
              </Button>
            </div>
          </div>

          {/* Featured Items */}
          {featuredItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
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
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 9)
              .map((item) => (
                <Card key={item.id} className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <CardTitle className="text-white text-base">{item.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {item.type}
                          </Badge>
                          <div className="flex items-center text-xs text-green-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 line-clamp-2 mb-4">
                      {item.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">
                        {formatPrice(item.price, item.currency)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{item.downloads} downloads</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.slice(0, 12).map((item) => (
              <Card key={item.id} className="bg-gray-800/60 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-sm">{item.title}</CardTitle>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white">
                      {formatPrice(item.price, item.currency)}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {item.rating.toFixed(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="purchases" className="mt-6">
          {purchases.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No purchases yet</h3>
              <p className="text-gray-400 mb-4">Start exploring the marketplace to find amazing AI tools</p>
              <Button 
                onClick={() => navigate('/marketplace/store')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Store className="w-4 h-4 mr-2" />
                Browse Store
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((purchase) => (
                <Card key={purchase.id} className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        {getTypeIcon(purchase.item?.type || 'template')}
                      </div>
                      <div>
                        <CardTitle className="text-white text-base">{purchase.item?.title}</CardTitle>
                        <Badge 
                          variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs mt-1"
                        >
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">
                        {formatPrice(purchase.amount, purchase.currency)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(purchase.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <Card className="bg-gray-800/60 border-gray-700 text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1,200+</div>
            <div className="text-gray-400">Active Sellers</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/60 border-gray-700 text-center">
          <CardContent className="pt-6">
            <ShoppingCart className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">5,000+</div>
            <div className="text-gray-400">Items Available</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/60 border-gray-700 text-center">
          <CardContent className="pt-6">
            <Download className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">25,000+</div>
            <div className="text-gray-400">Downloads</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/60 border-gray-700 text-center">
          <CardContent className="pt-6">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">4.8</div>
            <div className="text-gray-400">Average Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Marketplace;
