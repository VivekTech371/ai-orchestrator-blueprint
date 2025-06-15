
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
import { AgentProvider } from '@/contexts/AgentContext';

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
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
                    <Route path="/signup" element={<ProtectedRoute requireAuth={false}><Signup /></ProtectedRoute>} />
                    <Route path="/reset-password" element={<ProtectedRoute requireAuth={false}><ResetPassword /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/template-marketplace" element={<TemplateMarketplace />} />
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
              </TemplateProvider>
            </WorkflowProvider>
          </AgentProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
