import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Save,
  Shield,
  Users,
  Crown,
  Layers,
  GitBranch,
  Gauge,
  Inbox,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import RealTimeCollaboration from '@/components/RealTimeCollaboration';
import VersionControl from '@/components/VersionControl';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'prompt' | 'clarify' | 'suggestions' | 'apis' | 'guardrails' | 'collaboration' | 'deploy' | 'monitor';

interface WorkflowSuggestion {
  id: string;
  title: string;
  description: string;
  complexity: 'Simple' | 'Medium' | 'Advanced';
  estimatedTime: string;
  apis: string[];
  agentTypes: string[];
  preview: {
    steps: string[];
  };
  performance: {
    score: number;
    reliability: number;
    cost: string;
  };
}

interface APIConnection {
  name: string;
  description: string;
  status: 'connected' | 'pending' | 'error';
  required: boolean;
  oauth?: boolean;
  scopes?: string[];
}

interface Guardrail {
  id: string;
  name: string;
  description: string;
  type: 'input' | 'output' | 'cost' | 'rate';
  enabled: boolean;
  config: any;
}

const AgentBuilder = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('prompt');
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [justDoItMode, setJustDoItMode] = useState(false);
  const [collaborationEnabled, setCollaborationEnabled] = useState(false);
  const [isMobileStepsOpen, setIsMobileStepsOpen] = useState(false);
  const [isStepsExpanded, setIsStepsExpanded] = useState(true);
  
  const [guardrails, setGuardrails] = useState<Guardrail[]>([
    {
      id: '1',
      name: 'Cost Limit',
      description: 'Maximum cost per execution',
      type: 'cost',
      enabled: true,
      config: { maxCost: 5.00 }
    },
    {
      id: '2',
      name: 'Rate Limiting',
      description: 'Maximum executions per hour',
      type: 'rate',
      enabled: true,
      config: { maxPerHour: 100 }
    },
    {
      id: '3',
      name: 'Content Filter',
      description: 'AI-powered content moderation',
      type: 'output',
      enabled: false,
      config: { strictness: 'medium' }
    }
  ]);

  const stepProgress = {
    prompt: 15,
    clarify: 30,
    suggestions: 45,
    apis: 60,
    guardrails: 75,
    collaboration: 85,
    deploy: 95,
    monitor: 100
  };

  const suggestedPrompts = [
    "I want to post a blog every day using AI",
    "Summarize top news and email me each morning",
    "Generate tweets from my Substack and schedule them",
    "Monitor my competitors' pricing and notify me of changes",
    "Create personalized cold outreach emails for my leads",
    "Analyze customer feedback and generate weekly reports",
    "Auto-respond to customer support tickets",
    "Generate and post LinkedIn content about my industry"
  ];

  const workflowSuggestions: WorkflowSuggestion[] = [
    {
      id: '1',
      title: 'Multi-Agent Content Pipeline',
      description: 'Research agent finds topics, writer creates content, editor reviews, publisher distributes',
      complexity: 'Advanced',
      estimatedTime: '20 mins setup',
      apis: ['OpenAI', 'NewsAPI', 'WordPress', 'Twitter', 'LinkedIn'],
      agentTypes: ['Research Agent', 'Content Writer', 'Editor Agent', 'Publisher Agent'],
      preview: {
        steps: ['Research trending topics', 'Generate content ideas', 'Write blog post', 'Review and edit', 'Publish and share']
      },
      performance: {
        score: 95,
        reliability: 98,
        cost: '$0.15/post'
      }
    },
    {
      id: '2',
      title: 'Smart News Digest with AI Summarization',
      description: 'Advanced news aggregation with semantic clustering and personalized summarization',
      complexity: 'Medium',
      estimatedTime: '12 mins setup',
      apis: ['NewsAPI', 'OpenAI', 'Gmail', 'RSS', 'Reddit'],
      agentTypes: ['News Aggregator', 'AI Summarizer', 'Email Agent'],
      preview: {
        steps: ['Fetch latest news', 'Cluster similar stories', 'AI summarization', 'Personalize content', 'Send digest']
      },
      performance: {
        score: 92,
        reliability: 96,
        cost: '$0.08/digest'
      }
    },
    {
      id: '3',
      title: 'Conversational Agent Team',
      description: 'Multiple AI agents collaborating to handle complex customer interactions',
      complexity: 'Advanced',
      estimatedTime: '35 mins setup',
      apis: ['OpenAI', 'CrewAI', 'Notion', 'Slack', 'Zendesk'],
      agentTypes: ['Intake Agent', 'Specialist Agent', 'Escalation Agent', 'QA Agent'],
      preview: {
        steps: ['Receive customer query', 'Classify intent', 'Route to specialist', 'Generate response', 'Quality check']
      },
      performance: {
        score: 89,
        reliability: 94,
        cost: '$0.25/interaction'
      }
    }
  ];

  const apiConnections: APIConnection[] = [
    { 
      name: 'OpenAI', 
      description: 'For AI content generation and processing', 
      status: 'pending', 
      required: true,
      oauth: false
    },
    { 
      name: 'Gmail', 
      description: 'For sending emails and notifications', 
      status: 'pending', 
      required: true,
      oauth: true,
      scopes: ['gmail.send', 'gmail.readonly']
    },
    { 
      name: 'NewsAPI', 
      description: 'For fetching news data and articles', 
      status: 'pending', 
      required: false,
      oauth: false
    },
    { 
      name: 'Twitter/X API', 
      description: 'For social media posting and monitoring', 
      status: 'pending', 
      required: false,
      oauth: true,
      scopes: ['tweet.write', 'users.read', 'tweet.read']
    }
  ];

  const handlePromptSubmit = async () => {
    if (!userPrompt.trim()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    if (justDoItMode) {
      setCurrentStep('suggestions');
    } else {
      setCurrentStep('clarify');
    }
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep('monitor');
  };

  const toggleGuardrail = (id: string) => {
    setGuardrails(prev => prev.map(g => 
      g.id === id ? { ...g, enabled: !g.enabled } : g
    ));
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
    setIsMobileStepsOpen(false);
  };

  const goToPreviousStep = () => {
    const steps: Step[] = ['prompt', 'clarify', 'suggestions', 'apis', 'guardrails', 'collaboration', 'deploy', 'monitor'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderPromptStep = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
          <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What do you want to automate?</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Describe your goal in plain English - no technical knowledge required</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Just Do It Mode Toggle - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <Crown className="w-5 h-5 text-purple-400" />
          <Label className="text-purple-300 font-medium text-center sm:text-left">Just Do It Mode</Label>
          <Switch 
            checked={justDoItMode}
            onCheckedChange={setJustDoItMode}
          />
          <span className="text-xs sm:text-sm text-gray-400 text-center">Skip clarifications, deploy with best defaults</span>
        </div>

        <div className="space-y-4">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your automation goal here... For example: 'I want to create daily social media posts about my industry'"
            className="min-h-24 sm:min-h-32 bg-gray-800/60 border-gray-600 text-white text-base sm:text-lg p-4 sm:p-6 rounded-xl focus:border-blue-500 resize-none"
          />
          
          <Button
            onClick={handlePromptSubmit}
            disabled={!userPrompt.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-3" />
                {justDoItMode ? 'Creating your agent...' : 'Analyzing your request...'}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-3" />
                {justDoItMode ? 'Deploy Instantly' : 'Create My AI Agent'}
              </>
            )}
          </Button>
        </div>

        {/* Suggested Prompts - Responsive Grid */}
        <div className="space-y-3">
          <p className="text-gray-400 text-sm font-medium text-center">Need inspiration? Try these:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setUserPrompt(prompt)}
                className="text-left p-3 sm:p-4 bg-gray-800/40 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all text-xs sm:text-sm text-gray-300 hover:text-white hover-scale"
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
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Let's make it perfect</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">I'll ask a few questions to understand exactly what you need</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-base sm:text-lg">AI Assistant</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Understanding your needs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                <p className="text-white text-sm sm:text-base">Great! I see you want to create daily social media posts. Let me ask a few questions:</p>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
                <p className="text-blue-300 mb-3 font-medium text-sm sm:text-base">What industry or topics should the posts focus on?</p>
                <Input
                  placeholder="e.g., Technology, Marketing, Finance..."
                  className="bg-gray-800 border-gray-600 text-white text-sm sm:text-base"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
                <p className="text-blue-300 mb-3 font-medium text-sm sm:text-base">Which social media platforms?</p>
                <div className="flex flex-wrap gap-2">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((platform) => (
                    <Badge key={platform} variant="outline" className="cursor-pointer hover:bg-blue-500/20 text-xs sm:text-sm">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
                <p className="text-blue-300 mb-3 font-medium text-sm sm:text-base">What time should posts be published?</p>
                <Input
                  type="time"
                  className="bg-gray-800 border-gray-600 text-white w-full sm:w-40"
                />
              </div>
            </div>

            <Button
              onClick={handleClarificationComplete}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12"
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
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Workflow className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">AI-Powered Workflow Suggestions</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Our AI analyzed your request and generated these optimized workflows</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto">
        {workflowSuggestions.map((workflow) => (
          <Card 
            key={workflow.id}
            className={`bg-gray-800/60 border-2 cursor-pointer transition-all hover:border-gray-600 hover:shadow-xl ${
              selectedWorkflow === workflow.id ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/25' : 'border-gray-700'
            }`}
            onClick={() => setSelectedWorkflow(workflow.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <CardTitle className="text-white text-lg sm:text-xl">{workflow.title}</CardTitle>
                    <Badge variant={workflow.complexity === 'Simple' ? 'default' : workflow.complexity === 'Medium' ? 'secondary' : 'destructive'}>
                      {workflow.complexity}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400 text-sm sm:text-base">{workflow.description}</CardDescription>
                  
                  {/* Performance Metrics - Mobile Stack */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      <span className="text-gray-300">{workflow.performance.score}% Performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span className="text-gray-300">{workflow.performance.reliability}% Reliability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-gray-300">{workflow.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedWorkflow === workflow.id ? 'border-blue-500 bg-blue-500' : 'border-gray-600'
                }`}>
                  {selectedWorkflow === workflow.id && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Agent Types */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      AI Agents ({workflow.agentTypes.length})
                    </h4>
                    <div className="space-y-2">
                      {workflow.agentTypes.map((agentType, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </div>
                          <span className="text-gray-300 text-xs sm:text-sm">{agentType}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Workflow Steps */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Process Flow
                    </h4>
                    <div className="space-y-2">
                      {workflow.preview.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </div>
                          <span className="text-gray-300 text-xs sm:text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* APIs and Cost - Mobile Stack */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-700 space-y-3 sm:space-y-0">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Required Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {workflow.apis.map((api) => (
                        <Badge key={api} variant="outline" className="text-xs border-gray-600">
                          {api}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-400">Estimated cost</p>
                    <p className="text-lg font-bold text-green-400">{workflow.performance.cost}</p>
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
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Continue with This Workflow
          </Button>
        </div>
      )}
    </div>
  );

  const renderApisStep = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Key className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Connect Your Services</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Let's connect the APIs your workflow needs to function</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {apiConnections.map((api, index) => (
          <Card key={index} className="bg-gray-800/60 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                    api.status === 'connected' ? 'bg-green-500/20' :
                    api.status === 'error' ? 'bg-red-500/20' : 'bg-gray-600/20'
                  }`}>
                    {api.status === 'connected' ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    ) : api.status === 'error' ? (
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                    ) : (
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base">{api.name}</span>
                      {api.required && <Badge variant="secondary" className="text-xs w-fit">Required</Badge>}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{api.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {api.status === 'connected' ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      Connected
                    </Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              {api.status === 'pending' && (
                <div className="mt-4 p-3 sm:p-4 bg-gray-700/30 rounded-lg">
                  <Label className="text-gray-300 text-xs sm:text-sm">API Key</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="password"
                      placeholder="Enter your API key..."
                      className="bg-gray-800 border-gray-600 text-white text-sm"
                    />
                    <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700 px-2 sm:px-3">
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
          onClick={() => setCurrentStep('guardrails')}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Continue to Safety Settings
        </Button>
      </div>
    </div>
  );

  const renderGuardrailsStep = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Configure Safety Guardrails</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Set up safety measures and limits for your AI agents</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {guardrails.map((guardrail) => (
          <Card key={guardrail.id} className="bg-gray-800/60 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                    guardrail.enabled ? 'bg-green-500/20' : 'bg-gray-600/20'
                  }`}>
                    <Shield className={`w-5 h-5 sm:w-6 sm:h-6 ${guardrail.enabled ? 'text-green-400' : 'text-gray-400'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base">{guardrail.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{guardrail.description}</p>
                  </div>
                </div>
                
                <Switch 
                  checked={guardrail.enabled}
                  onCheckedChange={() => toggleGuardrail(guardrail.id)}
                />
              </div>
              
              {guardrail.enabled && (
                <div className="mt-4 p-3 sm:p-4 bg-gray-700/30 rounded-lg">
                  {guardrail.type === 'cost' && (
                    <div className="space-y-3">
                      <Label className="text-gray-300 text-sm">Maximum cost per execution</Label>
                      <Input
                        type="number"
                        value={guardrail.config.maxCost}
                        className="bg-gray-800 border-gray-600 text-white text-sm"
                        step="0.01"
                      />
                    </div>
                  )}
                  
                  {guardrail.type === 'rate' && (
                    <div className="space-y-3">
                      <Label className="text-gray-300 text-sm">Maximum executions per hour</Label>
                      <Input
                        type="number"
                        value={guardrail.config.maxPerHour}
                        className="bg-gray-800 border-gray-600 text-white text-sm"
                      />
                    </div>
                  )}
                  
                  {guardrail.type === 'output' && (
                    <div className="space-y-3">
                      <Label className="text-gray-300 text-sm">Content filtering strictness</Label>
                      <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={() => setCurrentStep('collaboration')}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-12"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Continue to Collaboration
        </Button>
      </div>
    </div>
  );

  const renderCollaborationStep = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Team Collaboration</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Enable real-time collaboration and version control</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RealTimeCollaboration workflowId="current" isOwner={true} />
        <VersionControl />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setCurrentStep('deploy')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Deploy My Workflow
        </Button>
      </div>
    </div>
  );

  const renderDeployStep = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Deploying Your AI Agent</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Setting up your automation in the cloud</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4 sm:space-y-6">
              {isLoading ? (
                <>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Creating your workflow...</h3>
                    <div className="space-y-2 text-gray-400 text-xs sm:text-sm">
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
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
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
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎉 Your AI Agent is Live!</h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">Your automation is now running and working for you</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
              Workflow Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Status</span>
              <Badge className="bg-green-500/20 text-green-400 text-xs">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Next Run</span>
              <span className="text-white text-sm">Tomorrow 9:00 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Success Rate</span>
              <span className="text-white text-sm">100%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700 text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Modify Workflow
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700 text-sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share with Community
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700 text-sm">
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
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Another Agent
        </Button>
      </div>
    </div>
  );

  const steps = [
    { id: 'prompt', label: 'Describe Goal', icon: MessageSquare, description: 'Tell us what you want to automate' },
    { id: 'clarify', label: 'Clarify Details', icon: Bot, description: 'Refine your requirements' },
    { id: 'suggestions', label: 'Choose Workflow', icon: Workflow, description: 'Select the best AI workflow' },
    { id: 'apis', label: 'Connect APIs', icon: Key, description: 'Link your services and tools' },
    { id: 'guardrails', label: 'Safety Settings', icon: Shield, description: 'Configure limits and protections' },
    { id: 'collaboration', label: 'Team Setup', icon: Users, description: 'Enable team collaboration' },
    { id: 'deploy', label: 'Deploy', icon: Rocket, description: 'Launch your AI agent' },
    { id: 'monitor', label: 'Monitor', icon: Monitor, description: 'Track performance and activity' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      {/* Enhanced Header */}
      <div className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50 px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">AI Agent Builder</h1>
                <p className="text-gray-400 text-xs sm:text-sm">Create powerful automations with natural language</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
              {currentStepIndex > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToPreviousStep}
                  className="border-gray-600 hover:bg-gray-700 text-xs whitespace-nowrap"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Back
                </Button>
              )}
              {user?.anonymousMode && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs whitespace-nowrap">
                  <Eye className="w-3 h-3 mr-1" />
                  Anonymous
                </Badge>
              )}
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700 text-xs whitespace-nowrap">
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Section */}
      <div className="bg-gray-800/40 backdrop-blur-sm border-b border-gray-700/30 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Improved Collapsible Steps */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileStepsOpen(!isMobileStepsOpen)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    {React.createElement(steps[currentStepIndex].icon, { className: "w-5 h-5 text-white" })}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{currentStepIndex + 1}</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-base">{steps[currentStepIndex].label}</div>
                  <div className="text-gray-400 text-sm">{steps[currentStepIndex].description}</div>
                  <div className="text-gray-500 text-xs">Step {currentStepIndex + 1} of {steps.length}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400">{Math.round(stepProgress[currentStep])}%</div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isMobileStepsOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {isMobileStepsOpen && (
              <div className="mt-4 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-3 animate-fade-in shadow-xl">
                <div className="grid grid-cols-1 gap-2">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStepIndex;
                    const isCompleted = index < currentStepIndex;
                    const isAccessible = index <= currentStepIndex;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => isAccessible && goToStep(step.id as Step)}
                        disabled={!isAccessible}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                            : isCompleted 
                              ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/20' 
                              : isAccessible
                                ? 'hover:bg-gray-700/30 border border-transparent'
                                : 'opacity-50 cursor-not-allowed border border-transparent'
                        }`}
                      >
                        <div className="relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg' 
                              : isCompleted 
                                ? 'bg-green-500 shadow-md' 
                                : 'bg-gray-600'
                          }`}>
                            {isCompleted ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <Icon className="w-4 h-4 text-white" />
                            )}
                          </div>
                          {isActive && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping opacity-20"></div>
                          )}
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive 
                              ? 'bg-white text-blue-600' 
                              : isCompleted 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-500 text-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <div className={`font-medium text-sm ${
                            isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 max-w-[100px] leading-tight">
                            {step.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                            Current
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Enhanced Horizontal Steps */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsStepsExpanded(!isStepsExpanded)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isStepsExpanded ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">
                  {isStepsExpanded ? 'Collapse' : 'Expand'} Steps
                </span>
              </button>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Step {currentStepIndex + 1} of {steps.length} • {Math.round(stepProgress[currentStep])}% Complete
              </div>
            </div>

            {isStepsExpanded && (
              <div className="relative animate-fade-in">
                <div className="flex items-center justify-between overflow-x-auto pb-2">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStepIndex;
                    const isCompleted = index < currentStepIndex;
                    const isAccessible = index <= currentStepIndex;
                    
                    return (
                      <div key={step.id} className="flex items-center flex-shrink-0">
                        <button
                          onClick={() => isAccessible && goToStep(step.id as Step)}
                          disabled={!isAccessible}
                          className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 min-w-[120px] ${
                            isActive 
                              ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 shadow-lg' 
                              : isCompleted 
                                ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/20' 
                                : isAccessible
                                  ? 'hover:bg-gray-700/30 border border-transparent'
                                  : 'opacity-50 cursor-not-allowed border border-transparent'
                          }`}
                        >
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isActive 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg scale-110' 
                                : isCompleted 
                                  ? 'bg-green-500 shadow-md' 
                                  : 'bg-gray-600'
                            }`}>
                              {isCompleted ? (
                                <Check className="w-6 h-6 text-white" />
                              ) : (
                                <Icon className="w-6 h-6 text-white" />
                              )}
                            </div>
                            {isActive && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping opacity-20"></div>
                            )}
                            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isActive 
                                ? 'bg-white text-blue-600' 
                                : isCompleted 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-gray-500 text-gray-300'
                            }`}>
                              {index + 1}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className={`font-semibold text-sm ${
                              isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 max-w-[100px] leading-tight">
                              {step.description}
                            </div>
                          </div>
                        </button>
                        {index < steps.length - 1 && (
                          <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-600'
                          }`}>
                            <div className={`h-full transition-all duration-500 ${
                              isCompleted ? 'w-full bg-green-400' : 'w-0'
                            }`}></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">Overall Progress</span>
              <span className="text-sm font-medium text-white">{Math.round(stepProgress[currentStep])}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={stepProgress[currentStep]} 
                className="h-3 bg-gray-700/50 rounded-full overflow-hidden"
              />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${stepProgress[currentStep]}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            {currentStep === 'prompt' && renderPromptStep()}
            {currentStep === 'clarify' && renderClarifyStep()}
            {currentStep === 'suggestions' && renderSuggestionsStep()}
            {currentStep === 'apis' && renderApisStep()}
            {currentStep === 'guardrails' && renderGuardrailsStep()}
            {currentStep === 'collaboration' && renderCollaborationStep()}
            {currentStep === 'deploy' && renderDeployStep()}
            {currentStep === 'monitor' && renderMonitorStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
