
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Workflow, 
  Settings, 
  TestTube, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle,
  Circle,
  Sparkles,
  Zap,
  Target,
  Cpu,
  Database,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AgentBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: 'Agent Type',
      description: 'Choose your agent foundation',
      icon: Bot,
      gradient: 'from-blue-500 to-cyan-500',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Configuration',
      description: 'Set up core parameters',
      icon: Settings,
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple'
    },
    {
      id: 3,
      title: 'Workflow Design',
      description: 'Build your logic flow',
      icon: Workflow,
      gradient: 'from-green-500 to-emerald-500',
      color: 'green'
    },
    {
      id: 4,
      title: 'Testing',
      description: 'Validate functionality',
      icon: TestTube,
      gradient: 'from-orange-500 to-red-500',
      color: 'orange'
    },
    {
      id: 5,
      title: 'Deployment',
      description: 'Launch your agent',
      icon: Rocket,
      gradient: 'from-indigo-500 to-purple-500',
      color: 'indigo'
    }
  ];

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepActive = (stepId: number) => stepId === currentStep;
  const isStepAccessible = (stepId: number) => stepId <= currentStep || completedSteps.includes(stepId);

  const renderStepContent = () => {
    const currentStepData = steps.find(step => step.id === currentStep);
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Choose Your Agent Type</h3>
              <p className="text-gray-400 text-lg">Select the foundation that best fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Sparkles, title: 'AI Assistant', desc: 'Conversational AI for customer support', popular: true },
                { icon: Zap, title: 'Automation Bot', desc: 'Process workflows and tasks' },
                { icon: Target, title: 'Analytics Agent', desc: 'Data analysis and reporting' },
                { icon: Cpu, title: 'Custom Logic', desc: 'Build from scratch with flexibility' },
                { icon: Database, title: 'Data Processor', desc: 'Handle data transformation' },
                { icon: Globe, title: 'API Connector', desc: 'Integrate external services' }
              ].map((type, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105">
                    {type.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                        Popular
                      </Badge>
                    )}
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{type.title}</h4>
                        <p className="text-gray-400 text-sm">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Agent Configuration</h3>
              <p className="text-gray-400 text-lg">Set up your agent's core parameters and behavior</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Basic Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Agent Name</label>
                      <input className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none" placeholder="My Awesome Agent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-24" placeholder="Describe what your agent does..." />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Advanced Options</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Response Time</label>
                      <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                        <option>Real-time</option>
                        <option>Fast (1-2s)</option>
                        <option>Standard (3-5s)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Model Type</label>
                      <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                        <option>GPT-4</option>
                        <option>GPT-3.5 Turbo</option>
                        <option>Claude</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-16">
            <div className={`w-24 h-24 bg-gradient-to-r ${currentStepData?.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
              {currentStepData?.icon && <currentStepData.icon className="w-12 h-12 text-white" />}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{currentStepData?.title}</h3>
            <p className="text-gray-400 text-lg mb-8">{currentStepData?.description}</p>
            <p className="text-gray-500">Content for this step is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            AI Agent Builder
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create powerful AI agents with our intuitive step-by-step builder
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">Progress</span>
            <span className="text-sm font-medium text-gray-400">
              {completedSteps.length + (currentStep > completedSteps.length ? 1 : 0)} of {steps.length} steps
            </span>
          </div>
          <Progress 
            value={(completedSteps.length / steps.length) * 100} 
            className="h-2 bg-gray-800"
          />
        </div>

        {/* Steps Navigation */}
        <div className="mb-12">
          <div className="relative">
            {/* Desktop Steps */}
            <div className="hidden lg:flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = isStepCompleted(step.id);
                const isActive = isStepActive(step.id);
                const isAccessible = isStepAccessible(step.id);
                
                return (
                  <div key={step.id} className="flex flex-col items-center relative">
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-8 left-full w-full h-0.5 bg-gray-700 z-0">
                        <div 
                          className={cn(
                            "h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500",
                            isCompleted ? "w-full" : "w-0"
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step Circle */}
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={cn(
                        "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group",
                        isActive 
                          ? `bg-gradient-to-r ${step.gradient} scale-110 shadow-lg shadow-blue-500/25` 
                          : isCompleted
                            ? "bg-gray-700 hover:bg-gray-600"
                            : !isAccessible
                              ? "bg-gray-800 opacity-50 cursor-not-allowed"
                              : "bg-gray-800 hover:bg-gray-700 cursor-pointer"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <Icon className={cn(
                          "w-8 h-8 transition-all duration-300",
                          isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-white"
                        )} />
                      )}
                    </button>
                    
                    {/* Step Info */}
                    <div className="mt-4 text-center max-w-24">
                      <h3 className={cn(
                        "text-sm font-semibold transition-colors duration-300",
                        isActive ? "text-white" : isCompleted ? "text-gray-300" : "text-gray-500"
                      )}>
                        {step.title}
                      </h3>
                      <p className={cn(
                        "text-xs mt-1 transition-colors duration-300",
                        isActive ? "text-gray-300" : "text-gray-500"
                      )}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Steps */}
            <div className="lg:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = isStepCompleted(step.id);
                  const isActive = isStepActive(step.id);
                  const isAccessible = isStepAccessible(step.id);
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={cn(
                        "flex-shrink-0 flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 min-w-[200px]",
                        isActive 
                          ? `bg-gradient-to-r ${step.gradient} text-white scale-105 shadow-lg` 
                          : isCompleted
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : !isAccessible
                              ? "bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        isActive ? "bg-white/20" : "bg-gray-700"
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                        <p className="text-xs opacity-80">{step.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="border-gray-600 hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              Save Draft
            </Button>
            
            {currentStep === steps.length ? (
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Rocket className="w-4 h-4 mr-2" />
                Deploy Agent
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
