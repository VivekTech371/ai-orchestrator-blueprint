
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'draft';
  created: string;
}

interface AgentContextType {
  agents: Agent[];
  createAgent: (name: string, type: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
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

  const createAgent = (name: string, type: string) => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name,
      type,
      status: 'draft',
      created: new Date().toISOString()
    };
    setAgents(prev => [...prev, newAgent]);
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  };

  const deleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  return (
    <AgentContext.Provider value={{ agents, createAgent, updateAgent, deleteAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
