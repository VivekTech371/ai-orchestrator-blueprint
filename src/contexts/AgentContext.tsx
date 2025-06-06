
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error' | 'stopped';
  performance: {
    score: number;
    executionTime: number;
    successRate: number;
    costPerRun: number;
    qualityScore: number;
  };
  version: string;
  createdAt: string;
  updatedAt: string;
  runs: number;
  type: string;
  triggers: string[];
  collaborators?: string[];
  health: {
    uptime: number;
    errors: number;
    avgRuntime: number;
    apiCosts: number;
  };
}

interface AgentContextType {
  agents: Agent[];
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  createAgent: (agent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Daily News Summarizer',
      description: 'Fetches and summarizes top news daily',
      status: 'active',
      performance: {
        score: 92,
        executionTime: 1.2,
        successRate: 98,
        costPerRun: 0.05,
        qualityScore: 95
      },
      version: 'v1.2.3',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      runs: 156,
      type: 'News Aggregator',
      triggers: ['daily', 'webhook'],
      health: {
        uptime: 99.5,
        errors: 2,
        avgRuntime: 1.2,
        apiCosts: 7.8
      }
    },
    {
      id: '2',
      name: 'Social Media Scheduler',
      description: 'Automatically posts content across platforms',
      status: 'active',
      performance: {
        score: 87,
        executionTime: 0.8,
        successRate: 95,
        costPerRun: 0.03,
        qualityScore: 89
      },
      version: 'v2.1.0',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-22',
      runs: 234,
      type: 'Social Media',
      triggers: ['schedule', 'manual'],
      health: {
        uptime: 97.2,
        errors: 5,
        avgRuntime: 0.8,
        apiCosts: 12.3
      }
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates, updatedAt: new Date().toISOString() } : agent
    ));
  };

  const deleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const createAgent = (agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setAgents(prev => [...prev, newAgent]);
  };

  return (
    <AgentContext.Provider value={{
      agents,
      selectedAgent,
      setSelectedAgent,
      updateAgent,
      deleteAgent,
      createAgent
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};
