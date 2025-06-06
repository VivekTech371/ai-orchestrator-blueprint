
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  reputation: number;
  badge: string;
  anonymousMode: boolean;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    mfaEnabled: boolean;
  };
  stats: {
    agentsCreated: number;
    templatesShared: number;
    communityScore: number;
    earnings: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  toggleAnonymousMode: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
    reputation: 2847,
    badge: 'Expert',
    anonymousMode: false,
    preferences: {
      darkMode: true,
      notifications: true,
      mfaEnabled: false
    },
    stats: {
      agentsCreated: 15,
      templatesShared: 8,
      communityScore: 95,
      earnings: 142.50
    }
  });

  const login = async (email: string, password: string) => {
    // Simulate login
    console.log('Logging in:', email);
    // Set user after successful login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: 'JD',
      reputation: 2847,
      badge: 'Expert',
      anonymousMode: false,
      preferences: {
        darkMode: true,
        notifications: true,
        mfaEnabled: false
      },
      stats: {
        agentsCreated: 15,
        templatesShared: 8,
        communityScore: 95,
        earnings: 142.50
      }
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate signup
    console.log('Signing up:', name, email);
    // Set user after successful signup
    setUser({
      id: '1',
      name: name,
      email: email,
      avatar: name.charAt(0).toUpperCase(),
      reputation: 0,
      badge: 'Newcomer',
      anonymousMode: false,
      preferences: {
        darkMode: true,
        notifications: true,
        mfaEnabled: false
      },
      stats: {
        agentsCreated: 0,
        templatesShared: 0,
        communityScore: 0,
        earnings: 0
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const toggleAnonymousMode = () => {
    setUser(prev => prev ? { ...prev, anonymousMode: !prev.anonymousMode } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateUser,
      toggleAnonymousMode,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
