
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface WorkflowStep {
  id: string;
  type: 'agent' | 'condition' | 'delay' | 'webhook' | 'email';
  name: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

export interface Workflow {
  id: string;
  user_id: string;
  agent_id?: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  triggers: Record<string, any>;
  status: 'draft' | 'active' | 'inactive';
  is_public: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface WorkflowContextType {
  workflows: Workflow[];
  loading: boolean;
  addWorkflow: (workflow: Omit<Workflow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Workflow>;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  getWorkflow: (id: string) => Workflow | undefined;
  fetchWorkflows: () => Promise<void>;
  toggleWorkflowStatus: (id: string) => Promise<void>;
  executeWorkflow: (id: string, input?: any) => Promise<any>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

interface WorkflowProviderProps {
  children: ReactNode;
}

export const WorkflowProvider: React.FC<WorkflowProviderProps> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWorkflows();
    }
  }, [user]);

  const fetchWorkflows = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkflows(data || []);
    } catch (error: any) {
      console.error('Error fetching workflows:', error);
      toast({
        title: "Error",
        description: "Failed to load workflows",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addWorkflow = async (workflowData: Omit<Workflow, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Workflow> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('workflows')
        .insert({
          ...workflowData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setWorkflows(prev => [data, ...prev]);
      toast({
        title: "Workflow created",
        description: "Your workflow has been created successfully"
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

  const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('workflows')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setWorkflows(prev =>
        prev.map(workflow =>
          workflow.id === id ? { ...workflow, ...data } : workflow
        )
      );

      toast({
        title: "Workflow updated",
        description: "Your workflow has been updated successfully"
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

  const deleteWorkflow = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('workflows')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
      toast({
        title: "Workflow deleted",
        description: "Your workflow has been deleted successfully"
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

  const toggleWorkflowStatus = async (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;

    const newStatus = workflow.status === 'active' ? 'inactive' : 'active';
    await updateWorkflow(id, { status: newStatus });
  };

  const executeWorkflow = async (id: string, input?: any) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // This would typically call a Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('execute-workflow', {
        body: { workflowId: id, input }
      });

      if (error) throw error;

      toast({
        title: "Workflow executed",
        description: "Your workflow has been executed successfully"
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

  const getWorkflow = (id: string) => {
    return workflows.find(workflow => workflow.id === id);
  };

  return (
    <WorkflowContext.Provider value={{
      workflows,
      loading,
      addWorkflow,
      updateWorkflow,
      deleteWorkflow,
      getWorkflow,
      fetchWorkflows,
      toggleWorkflowStatus,
      executeWorkflow
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};
