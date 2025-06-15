
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  GitBranch, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Eye,
  Filter,
  Zap
} from 'lucide-react';

const Workflows = () => {
  const navigate = useNavigate();
  const { workflows, loading, deleteWorkflow, toggleWorkflowStatus, executeWorkflow } = useWorkflow();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'draft'>('all');

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteWorkflow(id);
    }
  };

  const handleExecute = async (id: string, name: string) => {
    if (window.confirm(`Execute workflow "${name}"?`)) {
      await executeWorkflow(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Workflows</h1>
          <p className="text-gray-400">Automate your AI processes with custom workflows</p>
        </div>
        <Button 
          onClick={() => navigate('/workflow-builder')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700">
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>Inactive</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('draft')}>Draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Workflows Grid */}
      {filteredWorkflows.length === 0 ? (
        <div className="text-center py-12">
          <GitBranch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {workflows.length === 0 ? 'No workflows yet' : 'No workflows found'}
          </h3>
          <p className="text-gray-400 mb-6">
            {workflows.length === 0 
              ? 'Create your first workflow to automate AI processes' 
              : 'Try adjusting your search or filters'
            }
          </p>
          {workflows.length === 0 && (
            <Button 
              onClick={() => navigate('/workflow-builder')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Workflow
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id} className="bg-gray-800/60 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{workflow.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`${getStatusColor(workflow.status)} text-white text-xs`}>
                          {workflow.status}
                        </Badge>
                        {workflow.is_public && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem onClick={() => navigate(`/workflows/${workflow.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/workflows/${workflow.id}/edit`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExecute(workflow.id, workflow.name)}>
                        <Zap className="w-4 h-4 mr-2" />
                        Execute
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleWorkflowStatus(workflow.id)}>
                        {workflow.status === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(workflow.id, workflow.name)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 line-clamp-3">
                  {workflow.description || 'No description provided'}
                </CardDescription>
                {workflow.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {workflow.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {workflow.tags.length > 3 && (
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        +{workflow.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex justify-between items-center w-full text-xs text-gray-500">
                  <span>{workflow.steps.length} steps</span>
                  <span>Created {new Date(workflow.created_at).toLocaleDateString()}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workflows;
