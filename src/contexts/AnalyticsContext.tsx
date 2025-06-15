
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UsageMetrics {
  id: string;
  user_id: string;
  event_type: string;
  event_data: Record<string, any>;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalAgents: number;
  totalWorkflows: number;
  totalTemplates: number;
  agentExecutions: number;
  workflowExecutions: number;
  templatesDownloaded: number;
  mostUsedAgent?: string;
  mostUsedWorkflow?: string;
  recentActivity: UsageMetrics[];
}

interface AnalyticsContextType {
  analytics: AnalyticsSummary | null;
  loading: boolean;
  trackEvent: (eventType: string, eventData: Record<string, any>) => Promise<void>;
  fetchAnalytics: (timeRange?: string) => Promise<void>;
  getAgentPerformance: (agentId: string) => Promise<any>;
  getWorkflowPerformance: (workflowId: string) => Promise<any>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const trackEvent = async (eventType: string, eventData: Record<string, any>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('usage_analytics')
        .insert({
          user_id: user.id,
          event_type: eventType,
          event_data: eventData
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error tracking event:', error);
    }
  };

  const fetchAnalytics = async (timeRange: string = '30d') => {
    if (!user) return;

    setLoading(true);
    try {
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          startDate.setDate(endDate.getDate() - 30);
      }

      // Fetch agents count
      const { data: agents } = await supabase
        .from('agents')
        .select('id')
        .eq('user_id', user.id);

      // Fetch workflows count
      const { data: workflows } = await supabase
        .from('workflows')
        .select('id')
        .eq('user_id', user.id);

      // Fetch templates count
      const { data: templates } = await supabase
        .from('templates')
        .select('id')
        .eq('user_id', user.id);

      // Fetch usage analytics
      const { data: usageData } = await supabase
        .from('usage_analytics')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      // Calculate metrics
      const agentExecutions = usageData?.filter(u => u.event_type === 'agent_execution').length || 0;
      const workflowExecutions = usageData?.filter(u => u.event_type === 'workflow_execution').length || 0;
      const templatesDownloaded = usageData?.filter(u => u.event_type === 'template_download').length || 0;

      // Most used agent/workflow (simplified)
      const agentUsage = usageData?.filter(u => u.event_type === 'agent_execution');
      const workflowUsage = usageData?.filter(u => u.event_type === 'workflow_execution');

      const mostUsedAgent = agentUsage?.length > 0 ? agentUsage[0].event_data?.agent_id : undefined;
      const mostUsedWorkflow = workflowUsage?.length > 0 ? workflowUsage[0].event_data?.workflow_id : undefined;

      setAnalytics({
        totalAgents: agents?.length || 0,
        totalWorkflows: workflows?.length || 0,
        totalTemplates: templates?.length || 0,
        agentExecutions,
        workflowExecutions,
        templatesDownloaded,
        mostUsedAgent,
        mostUsedWorkflow,
        recentActivity: usageData?.slice(0, 10) || []
      });

    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getAgentPerformance = async (agentId: string) => {
    if (!user) return null;

    try {
      const { data } = await supabase
        .from('usage_analytics')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_type', 'agent_execution')
        .contains('event_data', { agent_id: agentId })
        .order('created_at', { ascending: false });

      return data;
    } catch (error: any) {
      console.error('Error fetching agent performance:', error);
      return null;
    }
  };

  const getWorkflowPerformance = async (workflowId: string) => {
    if (!user) return null;

    try {
      const { data } = await supabase
        .from('usage_analytics')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_type', 'workflow_execution')
        .contains('event_data', { workflow_id: workflowId })
        .order('created_at', { ascending: false });

      return data;
    } catch (error: any) {
      console.error('Error fetching workflow performance:', error);
      return null;
    }
  };

  return (
    <AnalyticsContext.Provider value={{
      analytics,
      loading,
      trackEvent,
      fetchAnalytics,
      getAgentPerformance,
      getWorkflowPerformance
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
