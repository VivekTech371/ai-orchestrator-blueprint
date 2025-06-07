
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Play, 
  CheckCircle,
  Zap,
  Puzzle,
  Rocket,
  Users,
  Shield,
  BarChart3,
  Code,
  Sparkles,
  Clock,
  Star,
  Globe,
  Brain,
  Target,
  Lightbulb
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Design Your AI Agent",
      description: "Use our intuitive visual builder to create intelligent agents that understand your business needs and automate complex workflows.",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Visual agent designer",
        "Pre-built templates",
        "Custom logic builder",
        "Real-time testing"
      ]
    },
    {
      id: 2,
      title: "Train & Configure",
      description: "Train your agent with your data, connect APIs, and configure advanced behaviors to make it truly intelligent and responsive.",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      features: [
        "Custom training data",
        "API integrations",
        "Behavior configuration",
        "Performance optimization"
      ]
    },
    {
      id: 3,
      title: "Deploy & Scale",
      description: "Launch your AI agent into production and watch it handle tasks automatically while providing detailed analytics and insights.",
      icon: Rocket,
      color: "from-green-500 to-emerald-500",
      features: [
        "One-click deployment",
        "Auto-scaling",
        "Real-time monitoring",
        "Performance analytics"
      ]
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "Intelligent Automation",
      description: "AI-powered agents that learn and adapt to your workflows",
      stat: "10x"
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce manual work and focus on strategic initiatives",
      stat: "80%"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SOC2 compliance",
      stat: "99.9%"
    },
    {
      icon: BarChart3,
      title: "Performance Boost",
      description: "Measurable improvements in productivity and efficiency",
      stat: "5x"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/20 mb-6 sm:mb-8">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">See How It Works</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Build AI Agents That
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Transform Your Business
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Create intelligent automation workflows with our visual AI agent builder. 
              No coding required - just drag, drop, and deploy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in animation-delay-300">
              <Link to="/signup">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300">
                  Start Building Free
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 hover:bg-gray-800/50 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg backdrop-blur-sm hover-scale transition-all duration-300">
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              How <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">It Works</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Transform your ideas into powerful AI agents in three simple steps
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={step.id} className={`animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} px-4 lg:px-0`}>
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="text-xs sm:text-sm text-blue-400 font-semibold">
                          Step {step.id}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        {step.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className={`w-full sm:w-auto bg-gradient-to-r ${step.color} hover:opacity-90 hover-scale transition-all duration-300`}
                        onClick={() => setActiveStep(index)}
                      >
                        Explore Step {step.id}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} px-4 lg:px-0`}>
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-20 rounded-2xl blur-xl`}></div>
                        <div className="relative bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover-scale transition-all duration-500">
                          <div className="h-48 sm:h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <Icon className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                              <p className="text-gray-400 text-sm sm:text-base">Interactive Demo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">OrchestrAI</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Powerful features that deliver measurable results
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 text-center group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.stat}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-blue-500/20 animate-fade-in hover-scale transition-all duration-500">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Build Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Agent?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Join thousands of businesses already automating their workflows with intelligent AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signup">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 sm:px-10 py-3 sm:py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300">
                  Start Free Trial
                  <Sparkles className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" className="w-full sm:w-auto border-gray-600 hover:bg-gray-800/50 text-white px-8 sm:px-10 py-3 sm:py-4 text-lg backdrop-blur-sm hover-scale transition-all duration-300">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
