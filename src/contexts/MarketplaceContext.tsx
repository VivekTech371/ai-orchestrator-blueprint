
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface MarketplaceItem {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  type: 'agent' | 'workflow' | 'template' | 'integration';
  price: number;
  currency: string;
  item_data: Record<string, any>;
  preview_data?: Record<string, any>;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  status: 'draft' | 'published' | 'suspended';
  created_at: string;
  updated_at: string;
  seller?: {
    id: string;
    email: string;
    name?: string;
    avatar_url?: string;
  };
}

export interface Purchase {
  id: string;
  buyer_id: string;
  item_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_intent_id?: string;
  created_at: string;
  item?: MarketplaceItem;
}

export interface Review {
  id: string;
  item_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    avatar_url?: string;
  };
}

interface MarketplaceContextType {
  items: MarketplaceItem[];
  purchases: Purchase[];
  loading: boolean;
  addItem: (item: Omit<MarketplaceItem, 'id' | 'seller_id' | 'created_at' | 'updated_at' | 'downloads' | 'rating' | 'reviews_count'>) => Promise<MarketplaceItem>;
  updateItem: (id: string, updates: Partial<MarketplaceItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItem: (id: string) => MarketplaceItem | undefined;
  fetchItems: (category?: string) => Promise<void>;
  purchaseItem: (itemId: string) => Promise<Purchase>;
  fetchPurchases: () => Promise<void>;
  addReview: (itemId: string, rating: number, comment: string) => Promise<Review>;
  fetchReviews: (itemId: string) => Promise<Review[]>;
  searchItems: (query: string) => Promise<MarketplaceItem[]>;
  getFeaturedItems: () => Promise<MarketplaceItem[]>;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

interface MarketplaceProviderProps {
  children: ReactNode;
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({ children }) => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  const fetchItems = async (category?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('marketplace_items')
        .select(`
          *,
          seller:profiles(id, email, name, avatar_url)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      console.error('Error fetching marketplace items:', error);
      toast({
        title: "Error",
        description: "Failed to load marketplace items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData: Omit<MarketplaceItem, 'id' | 'seller_id' | 'created_at' | 'updated_at' | 'downloads' | 'rating' | 'reviews_count'>): Promise<MarketplaceItem> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .insert({
          ...itemData,
          seller_id: user.id,
          downloads: 0,
          rating: 0,
          reviews_count: 0
        })
        .select(`
          *,
          seller:profiles(id, email, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setItems(prev => [data, ...prev]);
      toast({
        title: "Item listed",
        description: "Your item has been listed on the marketplace"
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

  const updateItem = async (id: string, updates: Partial<MarketplaceItem>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .update(updates)
        .eq('id', id)
        .eq('seller_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, ...data } : item
        )
      );

      toast({
        title: "Item updated",
        description: "Your marketplace item has been updated"
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

  const deleteItem = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('marketplace_items')
        .delete()
        .eq('id', id)
        .eq('seller_id', user.id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item removed",
        description: "Your item has been removed from the marketplace"
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

  const purchaseItem = async (itemId: string): Promise<Purchase> => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Get item details
      const { data: item } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (!item) throw new Error('Item not found');

      // Create purchase record
      const { data, error } = await supabase
        .from('purchases')
        .insert({
          buyer_id: user.id,
          item_id: itemId,
          amount: item.price,
          currency: item.currency,
          status: 'completed' // In real implementation, this would be 'pending' until payment confirms
        })
        .select(`
          *,
          item:marketplace_items(*)
        `)
        .single();

      if (error) throw error;

      // Update downloads count
      await supabase
        .from('marketplace_items')
        .update({ downloads: item.downloads + 1 })
        .eq('id', itemId);

      setPurchases(prev => [data, ...prev]);
      toast({
        title: "Purchase successful",
        description: "Item has been added to your collection"
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

  const fetchPurchases = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          item:marketplace_items(*)
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error: any) {
      console.error('Error fetching purchases:', error);
    }
  };

  const addReview = async (itemId: string, rating: number, comment: string): Promise<Review> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          item_id: itemId,
          user_id: user.id,
          rating,
          comment
        })
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Update item rating and reviews count (simplified calculation)
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('item_id', itemId);

      if (reviews) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await supabase
          .from('marketplace_items')
          .update({ 
            rating: avgRating,
            reviews_count: reviews.length
          })
          .eq('id', itemId);
      }

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback"
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

  const fetchReviews = async (itemId: string): Promise<Review[]> => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user:profiles(id, email, name, avatar_url)
        `)
        .eq('item_id', itemId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  };

  const searchItems = async (query: string): Promise<MarketplaceItem[]> => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          seller:profiles(id, email, name, avatar_url)
        `)
        .eq('status', 'published')
        .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error searching items:', error);
      return [];
    }
  };

  const getFeaturedItems = async (): Promise<MarketplaceItem[]> => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          seller:profiles(id, email, name, avatar_url)
        `)
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('downloads', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching featured items:', error);
      return [];
    }
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <MarketplaceContext.Provider value={{
      items,
      purchases,
      loading,
      addItem,
      updateItem,
      deleteItem,
      getItem,
      fetchItems,
      purchaseItem,
      fetchPurchases,
      addReview,
      fetchReviews,
      searchItems,
      getFeaturedItems
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
