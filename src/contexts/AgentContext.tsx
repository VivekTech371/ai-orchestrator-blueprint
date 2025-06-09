
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused';
  createdAt: string;
  lastRun?: string;
}

interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, 'id' | 'createdAt'>) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  getAgent: (id: string) => Agent | undefined;
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

  const addAgent = (agentData: Omit<Agent, 'id' | 'createdAt'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setAgents(prev => [...prev, newAgent]);
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === id ? { ...agent, ...updates } : agent
      )
    );
  };

  const deleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const getAgent = (id: string) => {
    return agents.find(agent => agent.id === id);
  };

  return (
    <AgentContext.Provider value={{
      agents,
      addAgent,
      updateAgent,
      deleteAgent,
      getAgent
    }}>
      {children}
    </AgentContext.Provider>
  );
};
