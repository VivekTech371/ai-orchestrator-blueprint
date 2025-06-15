
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Community from '@/pages/Community';
import Templates from '@/pages/Templates';
import Marketplace from '@/pages/Marketplace';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ResetPassword from '@/pages/ResetPassword';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Agents from '@/pages/Agents';
import AgentDetail from '@/pages/AgentDetail';
import AgentEdit from '@/pages/AgentEdit';
import AgentBuilder from '@/pages/AgentBuilder';
import Workflows from '@/pages/Workflows';
import WorkflowBuilder from '@/pages/WorkflowBuilder';
import TemplateMarketplace from '@/pages/TemplateMarketplace';
import Analytics from '@/pages/Analytics';
import CommunityFeed from '@/pages/CommunityFeed';
import MarketplaceStore from '@/pages/MarketplaceStore';
import { AgentProvider } from '@/contexts/AgentContext';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import { TemplateProvider } from '@/contexts/TemplateContext';
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import { SocialProvider } from '@/contexts/SocialContext';
import { MarketplaceProvider } from '@/contexts/MarketplaceContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AgentProvider>
            <WorkflowProvider>
              <TemplateProvider>
                <AnalyticsProvider>
                  <SocialProvider>
                    <MarketplaceProvider>
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
                          <Route path="/signup" element={<ProtectedRoute requireAuth={false}><Signup /></ProtectedRoute>} />
                          <Route path="/reset-password" element={<ProtectedRoute requireAuth={false}><ResetPassword /></ProtectedRoute>} />
                          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                          <Route path="/community" element={<Community />} />
                          <Route path="/community/feed" element={<CommunityFeed />} />
                          <Route path="/templates" element={<Templates />} />
                          <Route path="/marketplace" element={<Marketplace />} />
                          <Route path="/marketplace/store" element={<MarketplaceStore />} />
                          <Route path="/template-marketplace" element={<TemplateMarketplace />} />
                          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                          <Route path="/agents" element={
                            <ProtectedRoute>
                              <Agents />
                            </ProtectedRoute>
                          } />
                          <Route path="/agent-builder" element={
                            <ProtectedRoute>
                              <AgentBuilder />
                            </ProtectedRoute>
                          } />
                          <Route path="/agents/:id" element={
                            <ProtectedRoute>
                              <AgentDetail />
                            </ProtectedRoute>
                          } />
                          <Route path="/agents/:id/edit" element={
                            <ProtectedRoute>
                              <AgentEdit />
                            </ProtectedRoute>
                          } />
                          <Route path="/workflows" element={
                            <ProtectedRoute>
                              <Workflows />
                            </ProtectedRoute>
                          } />
                          <Route path="/workflow-builder" element={
                            <ProtectedRoute>
                              <WorkflowBuilder />
                            </ProtectedRoute>
                          } />
                        </Routes>
                      </Layout>
                    </MarketplaceProvider>
                  </SocialProvider>
                </AnalyticsProvider>
              </TemplateProvider>
            </WorkflowProvider>
          </AgentProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
