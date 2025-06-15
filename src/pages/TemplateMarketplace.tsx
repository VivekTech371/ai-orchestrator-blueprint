
import React, { useState, useEffect } from 'react';
import { useTemplate } from '@/contexts/TemplateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  Search, 
  Star, 
  Filter,
  FileText,
  TrendingUp
} from 'lucide-react';

const TemplateMarketplace = () => {
  const { fetchPublicTemplates, downloadTemplate } = useTemplate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const publicTemplates = await fetchPublicTemplates();
      setTemplates(publicTemplates);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'chatbot', 'automation', 'analytics', 'customer-service', 'content'];

  const handleDownload = async (templateId: string) => {
    await downloadTemplate(templateId);
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
        <h1 className="text-3xl font-bold text-white mb-2">Template Marketplace</h1>
        <p className="text-gray-400">Discover and download AI agent templates created by the community</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
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
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Featured Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.slice(0, 3).map((template) => (
            <Card key={template.id} className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                      <Badge className="bg-blue-500 text-white text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 line-clamp-3 mb-4">
                  {template.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {template.downloads}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {template.rating.toFixed(1)}
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleDownload(template.id)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">All Templates</h2>
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="bg-gray-800/60 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">{template.name}</CardTitle>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 line-clamp-2 mb-4">
                    {template.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {template.downloads}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {template.rating.toFixed(1)}
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(template.id)}
                      className="border-gray-600 hover:bg-gray-700 text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateMarketplace;
