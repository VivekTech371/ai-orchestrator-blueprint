
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Settings, 
  Zap, 
  Target, 
  MessageSquare, 
  Save,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles,
  Cpu,
  Brain,
  Workflow
} from 'lucide-react';

const AgentBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [agentData, setAgentData] = useState({
    name: '',
    type: '',
    purpose: '',
    capabilities: [],
    integrations: [],
    settings: {}
  });

  const steps = [
    {
      id: 0,
      title: 'Agent Type',
      subtitle: 'Choose your agent foundation',
      icon: Bot,
      color: 'from-blue-500 to-cyan-500',
      description: 'Select the type of AI agent that best fits your needs'
    },
    {
      id: 1,
      title: 'Configuration',
      subtitle: 'Set up core parameters',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      description: 'Configure your agent\'s basic settings and behavior'
    },
    {
      id: 2,
      title: 'Capabilities',
      subtitle: 'Define what it can do',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      description: 'Choose the skills and abilities for your agent'
    },
    {
      id: 3,
      title: 'Goals & Objectives',
      subtitle: 'Set primary objectives',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      description: 'Define what your agent should accomplish'
    },
    {
      id: 4,
      title: 'Training & Testing',
      subtitle: 'Prepare for deployment',
      icon: MessageSquare,
      color: 'from-indigo-500 to-purple-500',
      description: 'Train and test your agent before going live'
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Choose Agent Type</h3>
              <p className="text-gray-400">Select the foundation for your AI agent</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { type: 'Customer Support', icon: MessageSquare, desc: 'Handle customer inquiries automatically', color: 'blue' },
                { type: 'Data Processor', icon: Brain, desc: 'Process and analyze data efficiently', color: 'purple' },
                { type: 'Workflow Automation', icon: Workflow, desc: 'Automate complex business processes', color: 'green' },
                { type: 'Content Generator', icon: Sparkles, desc: 'Create and manage content automatically', color: 'orange' },
                { type: 'Analytics Assistant', icon: Cpu, desc: 'Provide insights and analytics', color: 'cyan' },
                { type: 'Custom Agent', icon: Settings, desc: 'Build a completely custom solution', color: 'pink' }
              ].map((option, index) => (
                <div 
                  key={index}
                  onClick={() => setAgentData({...agentData, type: option.type})}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer group hover:scale-105 ${
                    agentData.type === option.type 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-700 bg-gray-800/60 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-${option.color}-500 to-${option.color}-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{option.type}</h4>
                  <p className="text-gray-400 text-sm">{option.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Agent Configuration</h3>
              <p className="text-gray-400">Set up your agent's basic parameters</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agent Name</label>
                <input
                  type="text"
                  value={agentData.name}
                  onChange={(e) => setAgentData({...agentData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="Enter your agent's name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Purpose Description</label>
                <textarea
                  value={agentData.purpose}
                  onChange={(e) => setAgentData({...agentData, purpose: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Describe what your agent should do..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Response Style</label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors duration-300">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Casual</option>
                    <option>Technical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors duration-300">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // Add cases for steps 2, 3, 4 with similar structure
      default:
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Step {currentStep + 1}</h3>
            <p className="text-gray-400">This step is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI Agent Builder
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Create powerful AI agents with our intuitive step-by-step builder
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentStep + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{steps[currentStep].title}</h3>
                  <p className="text-sm text-gray-400">{steps[currentStep].subtitle}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Improved Step Navigation */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 max-w-full">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div key={step.id} className="flex items-center flex-shrink-0">
                      <button
                        onClick={() => goToStep(index)}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group ${
                          isActive 
                            ? `bg-gradient-to-r ${step.color} shadow-lg scale-110` 
                            : isCompleted
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className={`w-5 h-5 text-white ${isActive ? 'animate-pulse' : ''}`} />
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                          {step.title}
                        </div>
                      </button>
                      
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${
                          index < currentStep ? 'bg-green-500' : 'bg-gray-700'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="border-gray-600 hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-600 hover:bg-gray-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>

            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {currentStep === steps.length - 1 ? 'Deploy Agent' : 'Next Step'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
