
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AgentProvider } from './contexts/AgentContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import AgentBuilder from './pages/AgentBuilder';
import Templates from './pages/Templates';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import Settings from './pages/Settings';
import HowItWorks from './pages/HowItWorks';
import Notifications from './pages/Notifications';
import Drafts from './pages/Drafts';
import Bookmarks from './pages/Bookmarks';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Payments from './pages/Payments';
import BrowseWorkflows from './pages/BrowseWorkflows';
import Appearance from './pages/Appearance';
import ApiKeys from './pages/ApiKeys';

function App() {
  return (
    <AuthProvider>
      <AgentProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/browse-workflows" element={<BrowseWorkflows />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/community" element={<Community />} />
              <Route path="/marketplace" element={<Marketplace />} />
              
              {/* Auth routes (redirect to dashboard if already logged in) */}
              <Route 
                path="/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Signup />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <ForgotPassword />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reset-password" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <ResetPassword />
                  </ProtectedRoute>
                } 
              />
              <Route path="/verify-email" element={<EmailVerification />} />

              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/agent-builder" 
                element={
                  <ProtectedRoute>
                    <AgentBuilder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/drafts" 
                element={
                  <ProtectedRoute>
                    <Drafts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bookmarks" 
                element={
                  <ProtectedRoute>
                    <Bookmarks />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/feedback" 
                element={
                  <ProtectedRoute>
                    <Feedback />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payments" 
                element={
                  <ProtectedRoute>
                    <Payments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/appearance" 
                element={
                  <ProtectedRoute>
                    <Appearance />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/api-keys" 
                element={
                  <ProtectedRoute>
                    <ApiKeys />
                  </ProtectedRoute>
                } 
              />
              <Route path="/profile/:userId" element={<Profile />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </AgentProvider>
    </AuthProvider>
  );
}

export default App;
