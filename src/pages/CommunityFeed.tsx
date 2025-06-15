
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '@/contexts/SocialContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Heart, 
  Search, 
  Plus, 
  Filter,
  Star,
  User,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Share2
} from 'lucide-react';

const CommunityFeed = () => {
  const navigate = useNavigate();
  const { posts, loading, addPost, fetchPosts, likePost, unlikePost } = useSocial();
  const [searchQuery, setSearchQuery] = useState('');
  const [postType, setPostType] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'discussion' as 'discussion' | 'showcase' | 'question' | 'tutorial',
    tags: [] as string[],
    is_featured: false
  });
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    fetchPosts(postType);
  }, [postType]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await addPost({
        ...newPost,
        tags
      });

      setNewPost({
        title: '',
        content: '',
        type: 'discussion',
        tags: [],
        is_featured: false
      });
      setTagsInput('');
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'discussion': return 'bg-blue-500';
      case 'showcase': return 'bg-green-500';
      case 'question': return 'bg-yellow-500';
      case 'tutorial': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Feed</h1>
          <p className="text-gray-400">Connect, share, and learn with the AI automation community</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription className="text-gray-400">
                Share your thoughts, showcase your work, or ask questions
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter post title..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Post Type</Label>
                <Select 
                  value={newPost.type} 
                  onValueChange={(value: any) => setNewPost(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="discussion">Discussion</SelectItem>
                    <SelectItem value="showcase">Showcase</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white min-h-32"
                  placeholder="Write your post content..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="ai, automation, workflows..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                  Create Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="discussion">Discussions</SelectItem>
            <SelectItem value="showcase">Showcases</SelectItem>
            <SelectItem value="question">Questions</SelectItem>
            <SelectItem value="tutorial">Tutorials</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
          <p className="text-gray-400 mb-6">
            {posts.length === 0 
              ? 'Be the first to share something with the community!' 
              : 'Try adjusting your search or filters'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-gray-800/60 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{post.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`${getPostTypeColor(post.type)} text-white text-xs`}>
                          {post.type}
                        </Badge>
                        {post.is_featured && (
                          <Badge className="bg-yellow-500 text-white text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <span className="text-gray-400 text-sm flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </CardDescription>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => likePost(post.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes_count}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/community/post/${post.id}`)}
                      className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments_count}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-400 hover:text-green-400 hover:bg-green-400/10"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/community/post/${post.id}`)}
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
