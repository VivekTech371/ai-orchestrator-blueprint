
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  description: string;
  prompt?: string;
  model: string;
  temperature: number;
  max_tokens: number;
  status: 'draft' | 'active' | 'inactive';
  is_public: boolean;
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface AgentContextType {
  agents: Agent[];
  loading: boolean;
  addAgent: (agent: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Agent>;
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  getAgent: (id: string) => Agent | undefined;
  fetchAgents: () => Promise<void>;
  toggleAgentStatus: (id: string) => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};

interface AgentProviderProps {
  children: ReactNode;
}

export const AgentProvider: React.FC<AgentProviderProps> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAgents();
    }
  }, [user]);

  const fetchAgents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (error: any) {
      console.error('Error fetching agents:', error);
      toast({
        title: "Error",
        description: "Failed to load agents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addAgent = async (agentData: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Agent> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('agents')
        .insert({
          ...agentData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setAgents(prev => [data, ...prev]);
      toast({
        title: "Agent created",
        description: "Your agent has been created successfully"
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

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setAgents(prev =>
        prev.map(agent =>
          agent.id === id ? { ...agent, ...data } : agent
        )
      );

      toast({
        title: "Agent updated",
        description: "Your agent has been updated successfully"
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

  const deleteAgent = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setAgents(prev => prev.filter(agent => agent.id !== id));
      toast({
        title: "Agent deleted",
        description: "Your agent has been deleted successfully"
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

  const toggleAgentStatus = async (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;

    const newStatus = agent.status === 'active' ? 'inactive' : 'active';
    await updateAgent(id, { status: newStatus });
  };

  const getAgent = (id: string) => {
    return agents.find(agent => agent.id === id);
  };

  return (
    <AgentContext.Provider value={{
      agents,
      loading,
      addAgent,
      updateAgent,
      deleteAgent,
      getAgent,
      fetchAgents,
      toggleAgentStatus
    }}>
      {children}
    </AgentContext.Provider>
  );
};
