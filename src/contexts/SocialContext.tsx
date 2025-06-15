
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: 'discussion' | 'showcase' | 'question' | 'tutorial';
  tags: string[];
  likes_count: number;
  comments_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    avatar_url?: string;
  };
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    avatar_url?: string;
  };
}

export interface Like {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  created_at: string;
}

interface SocialContextType {
  posts: Post[];
  loading: boolean;
  addPost: (post: Omit<Post, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>) => Promise<Post>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => Post | undefined;
  fetchPosts: (type?: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string, parentId?: string) => Promise<Comment>;
  fetchComments: (postId: string) => Promise<Comment[]>;
  searchPosts: (query: string) => Promise<Post[]>;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

interface SocialProviderProps {
  children: ReactNode;
}

export const SocialProvider: React.FC<SocialProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (type?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (type && type !== 'all') {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData: Omit<Post, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>): Promise<Post> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          user_id: user.id,
          likes_count: 0,
          comments_count: 0
        })
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      toast({
        title: "Post created",
        description: "Your post has been published successfully"
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setPosts(prev =>
        prev.map(post =>
          post.id === id ? { ...post, ...data } : post
        )
      );

      toast({
        title: "Post updated",
        description: "Your post has been updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setPosts(prev => prev.filter(post => post.id !== id));
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const likePost = async (postId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();

      if (existingLike) return;

      // Add like
      const { error: likeError } = await supabase
        .from('likes')
        .insert({
          user_id: user.id,
          post_id: postId
        });

      if (likeError) throw likeError;

      // Update likes count
      const { data: post } = await supabase
        .from('posts')
        .select('likes_count')
        .eq('id', postId)
        .single();

      if (post) {
        await supabase
          .from('posts')
          .update({ likes_count: post.likes_count + 1 })
          .eq('id', postId);

        setPosts(prev =>
          prev.map(p =>
            p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p
          )
        );
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const unlikePost = async (postId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Remove like
      const { error: unlikeError } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', postId);

      if (unlikeError) throw unlikeError;

      // Update likes count
      const { data: post } = await supabase
        .from('posts')
        .select('likes_count')
        .eq('id', postId)
        .single();

      if (post && post.likes_count > 0) {
        await supabase
          .from('posts')
          .update({ likes_count: post.likes_count - 1 })
          .eq('id', postId);

        setPosts(prev =>
          prev.map(p =>
            p.id === postId ? { ...p, likes_count: Math.max(0, p.likes_count - 1) } : p
          )
        );
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const addComment = async (postId: string, content: string, parentId?: string): Promise<Comment> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content,
          parent_id: parentId
        })
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Update comments count
      const { data: post } = await supabase
        .from('posts')
        .select('comments_count')
        .eq('id', postId)
        .single();

      if (post) {
        await supabase
          .from('posts')
          .update({ comments_count: post.comments_count + 1 })
          .eq('id', postId);

        setPosts(prev =>
          prev.map(p =>
            p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
          )
        );
      }

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const fetchComments = async (postId: string): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const searchPosts = async (query: string): Promise<Post[]> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .or(`title.ilike.%${query}%, content.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error searching posts:', error);
      return [];
    }
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <SocialContext.Provider value={{
      posts,
      loading,
      addPost,
      updatePost,
      deletePost,
      getPost,
      fetchPosts,
      likePost,
      unlikePost,
      addComment,
      fetchComments,
      searchPosts
    }}>
      {children}
    </SocialContext.Provider>
  );
};
