import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { Dashboard } from '@/pages/Dashboard';
import { Settings } from '@/pages/Settings';
import { Pricing } from '@/pages/Pricing';
import { Community } from '@/pages/Community';
import { Templates } from '@/pages/Templates';
import { Marketplace } from '@/pages/Marketplace';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { ResetPassword } from '@/pages/ResetPassword';
import { VerifyEmail } from '@/pages/VerifyEmail';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { QueryClient } from 'react-query';

import Agents from '@/pages/Agents';
import AgentDetail from '@/pages/AgentDetail';
import AgentEdit from '@/pages/AgentEdit';
import { AgentProvider } from '@/contexts/AgentContext';

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <AuthProvider>
          <AgentProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
                <Route path="/signup" element={<ProtectedRoute requireAuth={false}><Signup /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ProtectedRoute requireAuth={false}><ResetPassword /></ProtectedRoute>} />
                <Route path="/verify-email" element={<ProtectedRoute requireAuth={false}><VerifyEmail /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/community" element={<Community />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/agents" element={
                  <ProtectedRoute>
                    <Agents />
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
              </Routes>
            </Layout>
          </AgentProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClient>
  );
}

export default App;
