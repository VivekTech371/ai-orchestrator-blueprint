
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Zap, 
  MessageSquare, 
  Code, 
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              How OrchestrAI Works
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From simple text input to powerful AI agents - your automation workflow simplified
            </p>
          </div>

          {/* Interactive Explainer */}
          <div className="mb-20 animate-fade-in animation-delay-200">
            <div className="relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl border border-blue-500/30 p-8 overflow-hidden hover-scale glow transition-all duration-500">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  See OrchestrAI in Action
                </h2>
                
                {/* Demo Animation Placeholder */}
                <div className="relative h-96 bg-gray-800/50 rounded-xl border border-gray-700 mb-8 overflow-hidden hover-scale transition-all">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 pulse">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-400">Interactive Animation</p>
                    <p className="text-sm text-gray-500 mt-2">Watch how AI builds your workflow</p>
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  {[
                    {
                      icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
                      title: 'Describe Your Goal',
                      description: 'Start with simple text description of what you need automated'
                    },
                    {
                      icon: <Code className="w-8 h-8 text-cyan-400" />,
                      title: 'AI Builds Workflows',
                      description: 'Our AI creates the optimal agent network for your needs'
                    },
                    {
                      icon: <Zap className="w-8 h-8 text-green-400" />,
                      title: 'Deploy & Run',
                      description: 'One-click deployment with real-time monitoring'
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover-scale glow-hover transition-all animate-fade-in"
                      style={{ animationDelay: `${600 + index * 200}ms` }}
                    >
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step by Step Walkthrough */}
          <div className="mb-20 animate-fade-in animation-delay-400">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Step-by-Step Walkthrough
            </h2>
            
            <div className="space-y-24">
              {[
                {
                  step: 1,
                  title: 'Natural Language Goal Input',
                  description: 'Start by describing what you want to automate in plain English. No technical jargon needed - our AI understands your intent and goals.',
                  image: 'https://images.unsplash.com/photo-1682099379502-2a99a16ee84a?w=500&h=350&fit=crop',
                  points: [
                    'Describe your automation needs conversationally',
                    'No technical knowledge required',
                    'The more detail you provide, the better your results'
                  ]
                },
                {
                  step: 2,
                  title: 'AI Clarification Dialogue',
                  description: 'Our AI asks targeted questions to understand your specific needs, constraints, and expectations for the automation workflow.',
                  image: 'https://images.unsplash.com/photo-1560472354-b33ff641246a?w=500&h=350&fit=crop',
                  points: [
                    'Answer simple questions about your requirements',
                    'AI learns your preferences and constraints',
                    'Each answer refines the workflow design'
                  ]
                },
                {
                  step: 3,
                  title: 'Workflow Options Suggested',
                  description: 'Based on your inputs, the system generates multiple workflow options with different approaches, complexities, and capabilities.',
                  image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&h=350&fit=crop',
                  points: [
                    'Compare different automation approaches',
                    'Review agent configurations and data flows',
                    'Choose the option that best fits your needs'
                  ]
                },
                {
                  step: 4,
                  title: 'Choose & Customize Workflow',
                  description: 'Select your preferred workflow and customize it further with additional tweaks, integrations, or modifications.',
                  image: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=500&h=350&fit=crop',
                  points: [
                    'Fine-tune agent behaviors and parameters',
                    'Add or remove specific components',
                    'Set schedules and triggers'
                  ]
                },
                {
                  step: 5,
                  title: 'Enter API Keys',
                  description: 'Securely connect your third-party services by entering API keys with our guided setup process.',
                  image: 'https://images.unsplash.com/photo-1633265486501-0cf524a07213?w=500&h=350&fit=crop',
                  points: [
                    'Step-by-step API connection guides',
                    'End-to-end encryption for security',
                    'Test connections before deployment'
                  ]
                },
                {
                  step: 6,
                  title: 'Agent Generation & Deployment',
                  description: 'Our system generates, tests, and deploys your AI agents, creating a fully functioning automation workflow ready to use.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop',
                  points: [
                    'Automated testing ensures reliability',
                    'One-click deployment to production',
                    'Real-time monitoring and logging'
                  ]
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center animate-fade-in`}
                  style={{ animationDelay: `${600 + index * 200}ms` }}
                >
                  <div className="w-full md:w-1/2">
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover-scale transition-all">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold glow">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16 animate-fade-in animation-delay-800">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "Do I need to know Make or Crew?",
                    answer: "No. OrchestrAI is designed to be completely no-code. All workflows are built automatically based on your natural language descriptions."
                  },
                  {
                    question: "Where do agents run?",
                    answer: "All agents run on our secure cloud infrastructure. You don't need to provision servers, manage containers, or worry about scaling. Everything is handled automatically."
                  },
                  {
                    question: "Can I make private workflows?",
                    answer: "Yes! All your workflows are private by default. You can choose to share them with specific team members or make them public in the marketplace if you wish."
                  },
                  {
                    question: "What integrations are available?",
                    answer: "We support over 100 popular services including Google Workspace, Microsoft 365, Slack, Notion, Zapier, and many more. New integrations are added regularly."
                  },
                  {
                    question: "How am I charged for usage?",
                    answer: "We offer a usage-based pricing model. You're only charged for the compute time and API calls your workflows actually use. Free tier is available for hobbyists and testing."
                  },
                  {
                    question: "Can I edit the workflows manually?",
                    answer: "Absolutely. While OrchestrAI generates workflows automatically, you can always dive in and make manual adjustments to any aspect of your workflows."
                  }
                ].map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-gray-700 rounded-lg overflow-hidden hover-scale transition-all animate-fade-in"
                    style={{ animationDelay: `${1000 + index * 100}ms` }}
                  >
                    <AccordionTrigger className="bg-gray-800 px-5 py-4 hover:bg-gray-700 hover:no-underline transition-all">
                      <span className="text-white">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-800/50 px-5 py-4 text-gray-300">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center animate-fade-in animation-delay-1000">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to automate your workflow?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agent-builder">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all">
                  Start Building Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-700 hover-scale transition-all">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
