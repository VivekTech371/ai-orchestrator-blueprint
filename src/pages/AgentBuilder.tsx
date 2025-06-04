
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Play, 
  Download,
  MessageSquare,
  Zap,
  Settings,
  Check,
  AlertCircle
} from 'lucide-react';

const AgentBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [goalInput, setGoalInput] = useState('');
  const [clarificationResponses, setClarificationResponses] = useState<string[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});

  const steps = [
    'Goal Input',
    'AI Clarification',
    'Workflow Selection',
    'API Configuration',
    'Review & Deploy'
  ];

  const clarificationQuestions = [
    'What type of content do you want to automate? (blogs, social media, emails)',
    'How frequently should this automation run? (daily, weekly, triggered)',
    'Which platforms or services do you want to integrate with?',
    'What level of human review do you want before publishing?'
  ];

  const workflowSuggestions = [
    {
      id: 1,
      title: 'Content Research & Writing Pipeline',
      description: 'Researches topics, generates content, and schedules publication',
      agents: ['Research Agent', 'Content Writer', 'SEO Optimizer', 'Publisher'],
      complexity: 'Intermediate',
      estimatedCost: '$12/month'
    },
    {
      id: 2,
      title: 'Simple Blog Automation',
      description: 'Basic content generation and posting workflow',
      agents: ['Content Generator', 'Publisher'],
      complexity: 'Easy',
      estimatedCost: '$5/month'
    },
    {
      id: 3,
      title: 'Advanced Multi-Platform Content',
      description: 'Comprehensive content strategy across multiple platforms',
      agents: ['Research Agent', 'Content Writer', 'Editor', 'Platform Optimizer', 'Scheduler', 'Analytics Tracker'],
      complexity: 'Advanced',
      estimatedCost: '$25/month'
    }
  ];

  const requiredServices = [
    { name: 'OpenAI', description: 'For AI content generation', required: true },
    { name: 'Google Sheets', description: 'For data storage and tracking', required: true },
    { name: 'WordPress', description: 'For publishing content', required: false },
    { name: 'Twitter API', description: 'For social media posting', required: false },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Agent Builder</h1>
          <p className="text-gray-400">Let's create your custom automation workflow</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {index + 1 <= currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      index + 1 < currentStep ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <span className="mr-2">{currentStep}.</span>
              {steps[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Goal Input */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe your automation goal
                  </label>
                  <Textarea
                    placeholder="Example: I want to automatically research trending topics in my niche, write high-quality blog posts about them, optimize for SEO, and publish them to my WordPress site twice a week."
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-32"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Need inspiration? Try these examples:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Automate social media content creation and scheduling',
                      'Create a lead generation and nurturing pipeline',
                      'Set up automated email marketing campaigns',
                      'Build a customer support chatbot system'
                    ].map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setGoalInput(example)}
                        className="p-3 text-left bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-300"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: AI Clarification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="font-medium text-blue-400">AI Assistant</span>
                  </div>
                  <p className="text-gray-300">
                    Great! I understand you want to automate content creation. Let me ask a few questions to build the perfect workflow for you.
                  </p>
                </div>

                {clarificationQuestions.map((question, index) => (
                  <div key={index} className="space-y-3">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <p className="text-gray-300">{question}</p>
                    </div>
                    <Textarea
                      placeholder="Your response..."
                      value={clarificationResponses[index] || ''}
                      onChange={(e) => {
                        const newResponses = [...clarificationResponses];
                        newResponses[index] = e.target.value;
                        setClarificationResponses(newResponses);
                      }}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Workflow Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-gray-300">
                  Based on your requirements, here are the workflow options I've generated:
                </p>
                
                <div className="space-y-4">
                  {workflowSuggestions.map((workflow) => (
                    <div
                      key={workflow.id}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        selectedWorkflow === workflow.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedWorkflow(workflow.id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{workflow.title}</h3>
                          <p className="text-gray-400 mb-3">{workflow.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <Badge variant="outline" className="border-gray-500 text-gray-300">
                              {workflow.complexity}
                            </Badge>
                            <span className="text-green-400 font-medium">{workflow.estimatedCost}</span>
                          </div>
                        </div>
                        {selectedWorkflow === workflow.id && (
                          <Check className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Agents involved:</h4>
                        <div className="flex flex-wrap gap-2">
                          {workflow.agents.map((agent, index) => (
                            <Badge key={index} className="bg-gray-600 text-gray-200">
                              {agent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: API Configuration */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-yellow-400 font-medium">Security Note</span>
                  </div>
                  <p className="text-gray-300 mt-2">
                    Your API keys are encrypted and stored securely. We never share them with third parties.
                  </p>
                </div>

                <div className="space-y-6">
                  {requiredServices.map((service, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white flex items-center">
                            {service.name}
                            {service.required && <span className="text-red-400 ml-1">*</span>}
                          </h3>
                          <p className="text-sm text-gray-400">{service.description}</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-gray-600">
                          Guide
                        </Button>
                      </div>
                      <Input
                        type="password"
                        placeholder={`Enter your ${service.name} API key`}
                        value={apiKeys[service.name] || ''}
                        onChange={(e) => setApiKeys({...apiKeys, [service.name]: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600">
                          Validate Key
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600">
                          Test Connection
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Review & Deploy */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Workflow Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400">Goal:</span>
                      <p className="text-white mt-1">{goalInput}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Selected Workflow:</span>
                      <p className="text-white mt-1">
                        {workflowSuggestions.find(w => w.id === selectedWorkflow)?.title}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Estimated Cost:</span>
                      <p className="text-green-400 mt-1 font-medium">
                        {workflowSuggestions.find(w => w.id === selectedWorkflow)?.estimatedCost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-green-400 font-medium">Ready to Deploy</span>
                  </div>
                  <p className="text-gray-300 mt-2">
                    Your workflow is configured and ready to be deployed. Click "Deploy Now" to activate your AI agents.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            
            {currentStep === steps.length ? (
              <div className="flex space-x-2">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Config
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  <Play className="w-4 h-4 mr-2" />
                  Deploy Now
                </Button>
              </div>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
