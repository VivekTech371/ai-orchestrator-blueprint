
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AgentProvider } from './contexts/AgentContext';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/toaster';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agent-builder" element={<AgentBuilder />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/community" element={<Community />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/drafts" element={<Drafts />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/browse-workflows" element={<BrowseWorkflows />} />
              <Route path="/appearance" element={<Appearance />} />
              <Route path="/api-keys" element={<ApiKeys />} />
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
