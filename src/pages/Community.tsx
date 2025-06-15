
import React, { useState, useEffect } from 'react';
import { useSocial } from '@/contexts/SocialContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  MessageSquare, 
  Heart, 
  Share2,
  Plus,
  Filter,
  Users,
  Star,
  Award,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const { user } = useAuth();
  const { posts, loading, fetchPosts, likePost, searchPosts } = useSocial();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(typeFilter);
  }, [typeFilter]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchPosts(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
      fetchPosts(typeFilter);
    }
  };

  const displayPosts = searchResults.length > 0 ? searchResults : posts;

  const featuredPosts = posts.filter(post => post.is_featured).slice(0, 3);
  const postTypes = ['all', 'discussion', 'showcase', 'question', 'tutorial'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion': return <MessageSquare className="w-4 h-4" />;
      case 'showcase': return <Star className="w-4 h-4" />;
      case 'question': return <HelpCircle className="w-4 h-4" />;
      case 'tutorial': return <BookOpen className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discussion': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'showcase': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'question': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'tutorial': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
          <p className="text-gray-400">Connect, share, and learn with the AI community</p>
        </div>
        <Button 
          onClick={() => navigate('/community/feed')}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search community posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button onClick={handleSearch} variant="outline">
          Search
        </Button>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {postTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === 'all' ? 'All Posts' : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(post.type)}
                          <Badge className={getTypeColor(post.type)}>
                            {post.type}
                          </Badge>
                        </div>
                        <Badge className="bg-yellow-500 text-black text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        by {post.user?.name || post.user?.email} • {new Date(post.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 line-clamp-3 mb-4">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes_count}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.comments_count}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Community Posts</h2>
            {displayPosts.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
                <p className="text-gray-400 mb-4">Be the first to start a discussion</p>
                <Button 
                  onClick={() => navigate('/community/feed')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {displayPosts.map((post) => (
                  <Card key={post.id} className="bg-gray-800/60 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {(post.user?.name || post.user?.email || 'U')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-medium">
                                {post.user?.name || post.user?.email}
                              </h3>
                              <Badge className={getTypeColor(post.type)}>
                                {getTypeIcon(post.type)}
                                <span className="ml-1">{post.type}</span>
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {post.is_featured && (
                          <Badge className="bg-yellow-500 text-black text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-white text-xl mt-4">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 line-clamp-3">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-400">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => likePost(post.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            {post.likes_count} Likes
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-500">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {post.comments_count} Comments
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-500">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(post.type)}
                    <Badge className={getTypeColor(post.type)}>
                      {post.type}
                    </Badge>
                    <Badge className="bg-yellow-500 text-black text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{post.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    by {post.user?.name || post.user?.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 line-clamp-4">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="space-y-4">
            {posts
              .sort((a, b) => (b.likes_count + b.comments_count) - (a.likes_count + a.comments_count))
              .slice(0, 10)
              .map((post) => (
                <Card key={post.id} className="bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <CardTitle className="text-white">{post.title}</CardTitle>
                        <Badge className={getTypeColor(post.type)}>
                          {post.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{post.likes_count} likes</span>
                        <span>{post.comments_count} comments</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="space-y-4">
            {posts.slice(0, 10).map((post) => (
              <Card key={post.id} className="bg-gray-800/60 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      <Badge className={getTypeColor(post.type)}>
                        {post.type}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
