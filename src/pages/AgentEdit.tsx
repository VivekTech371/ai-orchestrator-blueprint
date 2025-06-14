
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '@/contexts/AgentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Bot } from 'lucide-react';

const AgentEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgent, updateAgent } = useAgent();
  
  const agent = id ? getAgent(id) : undefined;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prompt: '',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1000,
    status: 'draft' as 'draft' | 'active' | 'inactive',
    is_public: false,
    tags: [] as string[],
  });
  
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        description: agent.description,
        prompt: agent.prompt || '',
        model: agent.model,
        temperature: agent.temperature,
        max_tokens: agent.max_tokens,
        status: agent.status,
        is_public: agent.is_public,
        tags: agent.tags,
      });
      setTagsInput(agent.tags.join(', '));
    }
  }, [agent]);

  if (!agent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Agent not found</h3>
          <p className="text-gray-400 mb-6">The agent you're trying to edit doesn't exist or has been deleted.</p>
          <Button onClick={() => navigate('/agents')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await updateAgent(agent.id, {
        ...formData,
        tags,
      });

      navigate(`/agents/${agent.id}`);
    } catch (error) {
      console.error('Error updating agent:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(`/agents/${agent.id}`)}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Agent</h1>
        <p className="text-gray-400">Update your agent's configuration and settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
            <CardDescription className="text-gray-400">
              Configure the basic details of your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'draft' | 'active' | 'inactive') => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-gray-300">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="ai, chatbot, assistant"
                className="bg-gray-700 border-gray-600 text-white mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_public"
                checked={formData.is_public}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
              />
              <Label htmlFor="is_public" className="text-gray-300">Make this agent public</Label>
            </div>
          </CardContent>
        </Card>

        {/* AI Configuration */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">AI Configuration</CardTitle>
            <CardDescription className="text-gray-400">
              Configure the AI model and parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="model" className="text-gray-300">Model</Label>
                <Select 
                  value={formData.model} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="max_tokens" className="text-gray-300">Max Tokens</Label>
                <Input
                  id="max_tokens"
                  type="number"
                  value={formData.max_tokens}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_tokens: parseInt(e.target.value) }))}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  min={100}
                  max={4000}
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Temperature: {formData.temperature}</Label>
              <Slider
                value={[formData.temperature]}
                onValueChange={(value) => setFormData(prev => ({ ...prev, temperature: value[0] }))}
                max={2}
                min={0}
                step={0.1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>More Focused</span>
                <span>More Creative</span>
              </div>
            </div>

            <div>
              <Label htmlFor="prompt" className="text-gray-300">System Prompt</Label>
              <Textarea
                id="prompt"
                value={formData.prompt}
                onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white mt-1"
                rows={6}
                placeholder="You are a helpful AI assistant..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgentEdit;
