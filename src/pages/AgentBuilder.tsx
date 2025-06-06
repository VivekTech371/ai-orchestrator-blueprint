
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Play, 
  Settings, 
  Zap,
  Bot,
  Brain,
  Workflow,
  Globe,
  Key,
  Monitor,
  ChevronRight,
  Clock,
  Target,
  Send,
  Lightbulb,
  Rocket,
  Share2,
  Eye,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Save
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type Step = 'prompt' | 'clarify' | 'suggestions' | 'apis' | 'deploy' | 'monitor';

interface WorkflowSuggestion {
  id: string;
  title: string;
  description: string;
  complexity: 'Simple' | 'Medium' | 'Advanced';
  estimatedTime: string;
  apis: string[];
  preview: {
    steps: string[];
  };
}

interface APIConnection {
  name: string;
  description: string;
  status: 'connected' | 'pending' | 'error';
  required: boolean;
}

const AgentBuilder = () => {
  const [currentStep, setCurrentStep] = useState<Step>('prompt');
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const stepProgress = {
    prompt: 20,
    clarify: 40,
    suggestions: 60,
    apis: 80,
    deploy: 90,
    monitor: 100
  };

  const suggestedPrompts = [
    "I want to post a blog every day using AI",
    "Summarize top news and email me each morning",
    "Generate tweets from my Substack and schedule them",
    "Monitor my competitors' pricing and notify me of changes",
    "Create personalized cold outreach emails for my leads",
    "Analyze customer feedback and generate weekly reports"
  ];

  const workflowSuggestions: WorkflowSuggestion[] = [
    {
      id: '1',
      title: 'AI Content Creation Pipeline',
      description: 'Generate blog posts using AI, publish to your blog, and share on social media',
      complexity: 'Medium',
      estimatedTime: '15 mins setup',
      apis: ['OpenAI', 'WordPress', 'Twitter', 'Buffer'],
      preview: {
        steps: ['Generate content ideas', 'Create blog post with AI', 'Publish to WordPress', 'Share on social media']
      }
    },
    {
      id: '2',
      title: 'News Digest Automation',
      description: 'Collect news from multiple sources, summarize with AI, and send daily email',
      complexity: 'Simple',
      estimatedTime: '10 mins setup',
      apis: ['NewsAPI', 'OpenAI', 'Gmail', 'RSS'],
      preview: {
        steps: ['Fetch latest news', 'AI summarization', 'Format email', 'Send daily digest']
      }
    },
    {
      id: '3',
      title: 'Advanced Multi-Agent Team',
      description: 'Complex workflow with multiple AI agents working together',
      complexity: 'Advanced',
      estimatedTime: '30 mins setup',
      apis: ['OpenAI', 'CrewAI', 'Notion', 'Slack', 'Google Sheets'],
      preview: {
        steps: ['Research agent gathers data', 'Writer agent creates content', 'Editor agent reviews', 'Publisher agent distributes']
      }
    }
  ];

  const apiConnections: APIConnection[] = [
    { name: 'OpenAI', description: 'For AI content generation', status: 'pending', required: true },
    { name: 'Gmail', description: 'For sending emails', status: 'pending', required: true },
    { name: 'NewsAPI', description: 'For fetching news data', status: 'pending', required: false },
    { name: 'Buffer', description: 'For social media scheduling', status: 'pending', required: false }
  ];

  const handlePromptSubmit = async () => {
    if (!userPrompt.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep('clarify');
  };

  const handleClarificationComplete = () => {
    setCurrentStep('suggestions');
  };

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setCurrentStep('apis');
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep('monitor');
  };

  const renderPromptStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <MessageSquare className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">What do you want to automate?</h2>
          <p className="text-gray-400 text-lg">Describe your goal in plain English - no technical knowledge required</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your automation goal here... For example: 'I want to create daily social media posts about my industry'"
            className="min-h-32 bg-gray-800/60 border-gray-600 text-white text-lg p-6 rounded-xl focus:border-blue-500 resize-none"
          />
          
          <Button
            onClick={handlePromptSubmit}
            disabled={!userPrompt.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-3" />
                Analyzing your request...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-3" />
                Create My AI Agent
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-gray-400 text-sm font-medium">Need inspiration? Try these:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setUserPrompt(prompt)}
                className="text-left p-4 bg-gray-800/40 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all text-sm text-gray-300 hover:text-white"
              >
                <Lightbulb className="w-4 h-4 text-yellow-400 mb-2" />
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClarifyStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Let's make it perfect</h2>
          <p className="text-gray-400 text-lg">I'll ask a few questions to understand exactly what you need</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">AI Assistant</CardTitle>
                <CardDescription>Understanding your needs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-white">Great! I see you want to create daily social media posts. Let me ask a few questions:</p>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 mb-3 font-medium">What industry or topics should the posts focus on?</p>
                <Input
                  placeholder="e.g., Technology, Marketing, Finance..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 mb-3 font-medium">Which social media platforms?</p>
                <div className="flex flex-wrap gap-2">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((platform) => (
                    <Badge key={platform} variant="outline" className="cursor-pointer hover:bg-blue-500/20">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 mb-3 font-medium">What time should posts be published?</p>
                <Input
                  type="time"
                  className="bg-gray-800 border-gray-600 text-white w-40"
                />
              </div>
            </div>

            <Button
              onClick={handleClarificationComplete}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Generate Workflow Suggestions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSuggestionsStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Workflow className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Choose Your Workflow</h2>
          <p className="text-gray-400 text-lg">I've created several options based on your requirements</p>
        </div>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {workflowSuggestions.map((workflow) => (
          <Card 
            key={workflow.id}
            className={`bg-gray-800/60 border-2 cursor-pointer transition-all hover:border-gray-600 ${
              selectedWorkflow === workflow.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
            }`}
            onClick={() => setSelectedWorkflow(workflow.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-white text-xl">{workflow.title}</CardTitle>
                    <Badge variant={workflow.complexity === 'Simple' ? 'default' : workflow.complexity === 'Medium' ? 'secondary' : 'destructive'}>
                      {workflow.complexity}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">{workflow.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workflow.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {workflow.apis.length} integrations
                    </div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedWorkflow === workflow.id ? 'border-blue-500 bg-blue-500' : 'border-gray-600'
                }`}>
                  {selectedWorkflow === workflow.id && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Workflow Steps:</h4>
                  <div className="space-y-2">
                    {workflow.preview.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="text-gray-300 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Required APIs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {workflow.apis.map((api) => (
                      <Badge key={api} variant="outline" className="text-xs">
                        {api}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedWorkflow && (
        <div className="flex justify-center">
          <Button
            onClick={() => handleWorkflowSelect(selectedWorkflow)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-3 text-lg"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Continue with This Workflow
          </Button>
        </div>
      )}
    </div>
  );

  const renderApisStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Key className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Connect Your Services</h2>
          <p className="text-gray-400 text-lg">Let's connect the APIs your workflow needs to function</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {apiConnections.map((api, index) => (
          <Card key={index} className="bg-gray-800/60 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    api.status === 'connected' ? 'bg-green-500/20' :
                    api.status === 'error' ? 'bg-red-500/20' : 'bg-gray-600/20'
                  }`}>
                    {api.status === 'connected' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : api.status === 'error' ? (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    ) : (
                      <Globe className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      {api.name}
                      {api.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
                    </h3>
                    <p className="text-gray-400 text-sm">{api.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {api.status === 'connected' ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Connected
                    </Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              {api.status === 'pending' && (
                <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
                  <Label className="text-gray-300 text-sm">API Key</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="password"
                      placeholder="Enter your API key..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Don't have an API key? 
                    <a href="#" className="text-blue-400 hover:underline ml-1">Get it here</a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={() => setCurrentStep('deploy')}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Deploy My Workflow
        </Button>
      </div>
    </div>
  );

  const renderDeployStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Rocket className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Deploying Your AI Agent</h2>
          <p className="text-gray-400 text-lg">Setting up your automation in the cloud</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {isLoading ? (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <RefreshCw className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">Creating your workflow...</h3>
                    <div className="space-y-2 text-gray-400 text-sm">
                      <p>✓ Configuring AI agents</p>
                      <p>✓ Setting up API connections</p>
                      <p className="animate-pulse">⏳ Deploying to cloud infrastructure</p>
                      <p className="text-gray-600">⏳ Running initial tests</p>
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleDeploy}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 text-lg"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Launch My AI Agent
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMonitorStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">🎉 Your AI Agent is Live!</h2>
          <p className="text-gray-400 text-lg">Your automation is now running and working for you</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Workflow Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <Badge className="bg-green-500/20 text-green-400">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Next Run</span>
              <span className="text-white">Tomorrow 9:00 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-white">100%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700">
              <Settings className="w-4 h-4 mr-2" />
              Modify Workflow
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700">
              <Share2 className="w-4 h-4 mr-2" />
              Share with Community
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <Button
          onClick={() => {
            setCurrentStep('prompt');
            setUserPrompt('');
            setSelectedWorkflow(null);
            setChatMessages([]);
          }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Another Agent
        </Button>
      </div>
    </div>
  );

  const steps = [
    { id: 'prompt', label: 'Describe Goal', icon: MessageSquare },
    { id: 'clarify', label: 'Clarify Details', icon: Bot },
    { id: 'suggestions', label: 'Choose Workflow', icon: Workflow },
    { id: 'apis', label: 'Connect APIs', icon: Key },
    { id: 'deploy', label: 'Deploy', icon: Rocket },
    { id: 'monitor', label: 'Monitor', icon: Monitor }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      {/* Header */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Agent Builder</h1>
                <p className="text-gray-400">Create powerful automations with natural language</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800/30 border-b border-gray-700/50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg' :
                      isCompleted ? 'bg-green-500' : 'bg-gray-700'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-600 ml-4" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-sm text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
          <Progress value={stepProgress[currentStep]} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'prompt' && renderPromptStep()}
          {currentStep === 'clarify' && renderClarifyStep()}
          {currentStep === 'suggestions' && renderSuggestionsStep()}
          {currentStep === 'apis' && renderApisStep()}
          {currentStep === 'deploy' && renderDeployStep()}
          {currentStep === 'monitor' && renderMonitorStep()}
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
