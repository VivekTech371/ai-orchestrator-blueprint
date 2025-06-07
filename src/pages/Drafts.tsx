
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Search,
  Filter,
  Calendar,
  ArrowRight,
  Save
} from 'lucide-react';

const Drafts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drafts, setDrafts] = useState([
    {
      id: 1,
      title: 'Customer Support AI Agent',
      description: 'An intelligent agent for handling customer inquiries and support tickets automatically.',
      type: 'agent',
      lastModified: '2 hours ago',
      progress: 75,
      category: 'Customer Service'
    },
    {
      id: 2,
      title: 'Data Processing Workflow',
      description: 'Automated data validation and processing workflow for incoming CSV files.',
      type: 'workflow',
      lastModified: '1 day ago',
      progress: 45,
      category: 'Data Processing'
    },
    {
      id: 3,
      title: 'E-commerce Order Assistant',
      description: 'AI assistant for managing e-commerce orders, inventory, and customer communications.',
      type: 'agent',
      lastModified: '3 days ago',
      progress: 90,
      category: 'E-commerce'
    },
    {
      id: 4,
      title: 'Content Moderation Bot',
      description: 'Automated content moderation system for social media posts and user-generated content.',
      type: 'agent',
      lastModified: '1 week ago',
      progress: 30,
      category: 'Content Management'
    }
  ]);

  const deleteDraft = (id: number) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  };

  const filteredDrafts = drafts.filter(draft =>
    draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Drafts
              </h1>
              <p className="text-gray-400">
                Continue working on your saved agent drafts and workflows
              </p>
            </div>
            
            <Link to="/agent-builder">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                New Draft
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search drafts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Drafts</p>
                <p className="text-lg font-semibold text-white">{drafts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-lg font-semibold text-white">
                  {drafts.filter(d => d.progress > 0 && d.progress < 100).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <Save className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Near Complete</p>
                <p className="text-lg font-semibold text-white">
                  {drafts.filter(d => d.progress >= 75).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Recent</p>
                <p className="text-lg font-semibold text-white">
                  {drafts.filter(d => d.lastModified.includes('hour') || d.lastModified.includes('day')).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Drafts Grid */}
        {filteredDrafts.length === 0 ? (
          <div className="bg-gray-800/60 p-8 sm:p-12 rounded-xl border border-gray-700 text-center">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No drafts found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start creating your first agent or workflow draft.'}
            </p>
            <Link to="/agent-builder">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Create New Draft
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrafts.map((draft) => (
              <div key={draft.id} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {draft.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {draft.lastModified}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {draft.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {draft.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-blue-400">{draft.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${draft.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                    {draft.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-xs"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Continue
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-700 text-xs"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteDraft(draft.id)}
                    className="border-gray-600 hover:bg-gray-700 text-red-400 hover:text-red-300 text-xs"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drafts;
