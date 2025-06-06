
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
  MousePointer,
  Settings,
  Sparkles,
  Clock,
  Star,
  Globe
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Design Your Workflow",
      description: "Use our intuitive drag-and-drop interface to create powerful automation workflows without writing a single line of code.",
      icon: Puzzle,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Visual workflow builder",
        "Pre-built components",
        "Real-time preview",
        "Template library"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Configure & Connect",
      description: "Connect your favorite tools and services, configure triggers, and set up conditions to make your workflow intelligent and responsive.",
      icon: Settings,
      color: "from-purple-500 to-pink-500",
      features: [
        "500+ integrations",
        "Custom triggers",
        "Smart conditions",
        "Data mapping"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Deploy & Monitor",
      description: "Launch your workflow with one click and monitor its performance with detailed analytics and real-time insights.",
      icon: Rocket,
      color: "from-green-500 to-emerald-500",
      features: [
        "One-click deployment",
        "Real-time monitoring",
        "Performance analytics",
        "Error handling"
      ],
      image: "/api/placeholder/600/400"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce manual work by up to 80% with intelligent automation",
      stat: "80%"
    },
    {
      icon: Zap,
      title: "Boost Productivity",
      description: "Increase team efficiency and focus on high-value tasks",
      stat: "3x"
    },
    {
      icon: Shield,
      title: "Reduce Errors",
      description: "Eliminate human errors with consistent, reliable automation",
      stat: "99.9%"
    },
    {
      icon: BarChart3,
      title: "Scale Operations",
      description: "Handle growing workloads without additional resources",
      stat: "10x"
    }
  ];

  const useCases = [
    {
      title: "Customer Support",
      description: "Automate ticket routing, response generation, and escalation processes",
      icon: Users,
      examples: ["Auto-ticket assignment", "Response templates", "SLA monitoring"]
    },
    {
      title: "Sales & Marketing",
      description: "Streamline lead nurturing, email campaigns, and follow-up sequences",
      icon: Sparkles,
      examples: ["Lead scoring", "Email automation", "CRM updates"]
    },
    {
      title: "Data Processing",
      description: "Transform, validate, and sync data across multiple systems",
      icon: Code,
      examples: ["ETL pipelines", "Data validation", "System sync"]
    },
    {
      title: "Operations",
      description: "Automate routine tasks, reporting, and compliance workflows",
      icon: Globe,
      examples: ["Report generation", "Compliance checks", "Task automation"]
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Operations Manager",
      company: "TechStart Inc.",
      content: "OrchestrAI helped us automate our entire customer onboarding process. What used to take 3 days now happens in 30 minutes.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Marketing Director",
      company: "Growth Co.",
      content: "The visual workflow builder is incredibly intuitive. Our team built complex marketing automations without any technical knowledge.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "Enterprise Solutions",
      content: "The platform's reliability and scalability have been game-changing for our operations. Highly recommended.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      {/* Hero Section - Enhanced */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/20 mb-8">
              <Play className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">See How It Works</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              From Idea to Automation
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                In Three Simple Steps
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how OrchestrAI transforms complex business processes into simple, 
              automated workflows that save time and boost productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300">
                  Start Building Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-800/50 text-white px-8 py-4 text-lg backdrop-blur-sm hover-scale transition-all duration-300">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - Enhanced */}
      <section className="section-padding bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              How <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">It Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build powerful automations in minutes with our intuitive platform
            </p>
          </div>

          {/* Interactive Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <div key={step.id} className={`animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm text-blue-400 font-semibold">
                          Step {step.id}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {step.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className={`bg-gradient-to-r ${step.color} hover:opacity-90 hover-scale transition-all duration-300`}
                        onClick={() => setActiveStep(index)}
                      >
                        Explore Step {step.id}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Visual */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-20 rounded-2xl blur-xl`}></div>
                        <div className="relative bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover-scale transition-all duration-500">
                          <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <Icon className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                              <p className="text-gray-400">Interactive Demo</p>
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

      {/* Benefits Section - Enhanced */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">OrchestrAI</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable results that transform your business operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {benefit.stat}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section - Enhanced */}
      <section className="section-padding bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Perfect for <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Every Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how different teams use OrchestrAI to streamline their workflows
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 group animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {useCase.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-3">
                    {useCase.examples.map((example, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-400">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from real businesses using OrchestrAI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-12 rounded-3xl border border-blue-500/20 animate-fade-in hover-scale transition-all duration-500">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Started?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of teams already automating their workflows with OrchestrAI. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300">
                  Start Free Trial
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-800/50 text-white px-10 py-4 text-lg backdrop-blur-sm hover-scale transition-all duration-300">
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
