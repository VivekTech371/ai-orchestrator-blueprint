
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Copy, 
  Play,
  User,
  Calendar,
  TrendingUp
} from 'lucide-react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'blogging', label: 'Blogging' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Sales' },
    { id: 'support', label: 'Customer Support' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'social', label: 'Social Media' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Blog Content Automation',
      description: 'Automatically research topics, write SEO-optimized blog posts, and schedule publication',
      category: 'blogging',
      difficulty: 'Intermediate',
      rating: 4.8,
      installs: 1240,
      creator: 'ContentPro',
      tags: ['Content', 'SEO', 'WordPress', 'Automation'],
      isPublic: true,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Lead Generation Pipeline',
      description: 'Capture leads from multiple sources, qualify them, and nurture through email sequences',
      category: 'marketing',
      difficulty: 'Advanced',
      rating: 4.9,
      installs: 890,
      creator: 'MarketingGuru',
      tags: ['Lead Gen', 'Email', 'CRM', 'Automation'],
      isPublic: true,
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Social Media Scheduler',
      description: 'Create and schedule content across multiple social platforms with AI-generated captions',
      category: 'social',
      difficulty: 'Easy',
      rating: 4.6,
      installs: 2100,
      creator: 'SocialBot',
      tags: ['Social Media', 'Scheduling', 'Content', 'Multi-platform'],
      isPublic: true,
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'Customer Support Bot',
      description: 'AI-powered chatbot that handles common customer inquiries and escalates complex issues',
      category: 'support',
      difficulty: 'Intermediate',
      rating: 4.7,
      installs: 650,
      creator: 'SupportAI',
      tags: ['Chatbot', 'Support', 'AI', 'Customer Service'],
      isPublic: true,
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      title: 'Sales Outreach Automation',
      description: 'Personalized email outreach campaigns with follow-up sequences and lead scoring',
      category: 'sales',
      difficulty: 'Advanced',
      rating: 4.5,
      installs: 430,
      creator: 'SalesForce',
      tags: ['Sales', 'Outreach', 'Email', 'Lead Scoring'],
      isPublic: true,
      lastUpdated: '1 week ago'
    },
    {
      id: 6,
      title: 'Business Analytics Dashboard',
      description: 'Automated data collection, analysis, and reporting with interactive dashboards',
      category: 'analytics',
      difficulty: 'Advanced',
      rating: 4.8,
      installs: 320,
      creator: 'DataPro',
      tags: ['Analytics', 'Dashboard', 'Reporting', 'Data'],
      isPublic: true,
      lastUpdated: '4 days ago'
    }
  ];

  const installedTemplates = [
    {
      id: 7,
      title: 'My Custom Blog Workflow',
      description: 'Modified version of Blog Content Automation for my specific needs',
      category: 'blogging',
      difficulty: 'Intermediate',
      lastModified: '1 day ago',
      isActive: true
    },
    {
      id: 8,
      title: 'Personal Lead Tracker',
      description: 'Simplified lead generation for my consulting business',
      category: 'marketing',
      difficulty: 'Easy',
      lastModified: '3 days ago',
      isActive: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Templates Library</h1>
            <p className="text-gray-400">Pre-built automation workflows ready to use</p>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-96 bg-gray-800 border-gray-700">
              <TabsTrigger value="browse" className="data-[state=active]:bg-purple-500">
                Browse Templates
              </TabsTrigger>
              <TabsTrigger value="installed" className="data-[state=active]:bg-purple-500">
                My Templates
              </TabsTrigger>
            </TabsList>

            {/* Browse Templates Tab */}
            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`whitespace-nowrap ${
                        selectedCategory === category.id
                          ? 'bg-purple-500 hover:bg-purple-600'
                          : 'border-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Templates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-white text-lg">{template.title}</CardTitle>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm">{template.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Template Info */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {template.creator}
                          </span>
                          <span className="flex items-center">
                            <Download className="w-3 h-3 mr-1" />
                            {template.installs}
                          </span>
                        </div>
                        <Badge className={`${getDifficultyColor(template.difficulty)} text-white text-xs`}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
                          <Download className="w-3 h-3 mr-1" />
                          Install
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <Play className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Installed Templates Tab */}
            <TabsContent value="installed" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">My Installed Templates</h2>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  Import Template
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {installedTemplates.map((template) => (
                  <Card key={template.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-white text-lg">{template.title}</CardTitle>
                        <Badge className={template.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Modified {template.lastModified}
                        </span>
                        <Badge className={`${getDifficultyColor(template.difficulty)} text-white text-xs`}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                          <Copy className="w-3 h-3 mr-1" />
                          Fork
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700 text-red-400">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Templates;
