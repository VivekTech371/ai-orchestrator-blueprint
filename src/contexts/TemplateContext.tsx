
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Template {
  id: string;
  user_id: string;
  name: string;
  description: string;
  category: string;
  template_data: Record<string, any>;
  is_public: boolean;
  downloads: number;
  rating: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface TemplateContextType {
  templates: Template[];
  loading: boolean;
  addTemplate: (template: Omit<Template, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'downloads' | 'rating'>) => Promise<Template>;
  updateTemplate: (id: string, updates: Partial<Template>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  getTemplate: (id: string) => Template | undefined;
  fetchTemplates: () => Promise<void>;
  fetchPublicTemplates: () => Promise<Template[]>;
  downloadTemplate: (id: string) => Promise<void>;
  rateTemplate: (id: string, rating: number) => Promise<void>;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  const fetchTemplates = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicTemplates = async (): Promise<Template[]> => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_public', true)
        .order('downloads', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching public templates:', error);
      toast({
        title: "Error",
        description: "Failed to load public templates",
        variant: "destructive"
      });
      return [];
    }
  };

  const addTemplate = async (templateData: Omit<Template, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'downloads' | 'rating'>): Promise<Template> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('templates')
        .insert({
          ...templateData,
          user_id: user.id,
          downloads: 0,
          rating: 0
        })
        .select()
        .single();

      if (error) throw error;

      setTemplates(prev => [data, ...prev]);
      toast({
        title: "Template created",
        description: "Your template has been created successfully"
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

  const updateTemplate = async (id: string, updates: Partial<Template>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('templates')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setTemplates(prev =>
        prev.map(template =>
          template.id === id ? { ...template, ...data } : template
        )
      );

      toast({
        title: "Template updated",
        description: "Your template has been updated successfully"
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

  const deleteTemplate = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTemplates(prev => prev.filter(template => template.id !== id));
      toast({
        title: "Template deleted",
        description: "Your template has been deleted successfully"
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

  const downloadTemplate = async (id: string) => {
    try {
      // Get current downloads count first
      const { data: template } = await supabase
        .from('templates')
        .select('downloads')
        .eq('id', id)
        .single();

      if (template) {
        const { error } = await supabase
          .from('templates')
          .update({ downloads: template.downloads + 1 })
          .eq('id', id);

        if (error) throw error;
      }

      toast({
        title: "Template downloaded",
        description: "Template has been added to your collection"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const rateTemplate = async (id: string, rating: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // In a real implementation, you'd calculate the average rating
      const { error } = await supabase
        .from('templates')
        .update({ rating })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getTemplate = (id: string) => {
    return templates.find(template => template.id === id);
  };

  return (
    <TemplateContext.Provider value={{
      templates,
      loading,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      getTemplate,
      fetchTemplates,
      fetchPublicTemplates,
      downloadTemplate,
      rateTemplate
    }}>
      {children}
    </TemplateContext.Provider>
  );
};
