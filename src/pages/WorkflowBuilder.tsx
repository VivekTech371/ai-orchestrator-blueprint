
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Save, ArrowLeft, Plus } from 'lucide-react';

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const { addWorkflow } = useWorkflow();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    steps: [],
    triggers: {},
    status: 'draft' as 'draft' | 'active' | 'inactive',
    is_public: false,
    tags: [] as string[],
  });
  
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const workflow = await addWorkflow({
        ...formData,
        tags,
      });

      navigate(`/workflows/${workflow.id}`);
    } catch (error) {
      console.error('Error creating workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/workflows')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workflows
        </Button>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Workflow</h1>
        <p className="text-gray-400">Build automated processes with custom steps and triggers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="bg-gray-800/60 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure the workflow details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    placeholder="Customer Support Workflow"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    placeholder="Describe what this workflow does..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-gray-300">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="automation, support, email"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_public"
                    checked={formData.is_public}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
                  />
                  <Label htmlFor="is_public" className="text-gray-300">Make this workflow public</Label>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Workflow'}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Workflow Designer */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800/60 border-gray-700 h-[600px]">
            <CardHeader>
              <CardTitle className="text-white">Workflow Designer</CardTitle>
              <CardDescription className="text-gray-400">
                Drag and drop components to build your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="border-2 border-dashed border-gray-600 rounded-lg h-full flex items-center justify-center">
                <div className="text-center">
                  <GitBranch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Visual Workflow Builder</h3>
                  <p className="text-gray-400 mb-4">Start by adding your first step</p>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
