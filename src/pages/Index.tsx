
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  Play,
  Sparkles,
  Globe,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Build AI workflows in minutes, not hours. Our intuitive interface gets you started instantly.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption. Your data stays protected at all times.",
      gradient: "from-green-400 to-blue-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time collaboration and shared workflows.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy worldwide with our global infrastructure. Scale from prototype to production.",
      gradient: "from-blue-400 to-cyan-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Workflows Created", icon: TrendingUp },
    { number: "99.9%", label: "Uptime", icon: Clock },
    { number: "4.9★", label: "User Rating", icon: Award }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "OrchestrAI revolutionized how we handle automation. The intuitive interface saved us weeks of development time.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      content: "The best AI automation platform we've used. The community templates are incredibly valuable.",
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Operations Lead",
      company: "Enterprise Inc",
      content: "Seamless integration and powerful automation capabilities. Our team productivity increased by 300%.",
      avatar: "EJ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-cyan-900/10">
      {/* Hero Section - Enhanced */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto container-padding text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/20 mb-8 hover-scale">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Introducing AI-Powered Automation</span>
            </div>
            
            <h1 className="hero-text font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
              Build Powerful AI Workflows
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Without Code
              </span>
            </h1>
            
            <p className="subtitle-text text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your business with intelligent automation. Create, deploy, and scale AI workflows 
              that adapt to your needs - all through our intuitive visual interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animation-delay-300">
              <Link to="/signup">
                <Button className="enhanced-button bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300 group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" className="border-gray-600 hover:bg-gray-800/50 text-white px-8 py-4 text-lg backdrop-blur-sm hover-scale transition-all duration-300 group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 animate-fade-in animation-delay-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">14-Day Free Trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-y border-gray-700/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">OrchestrAI</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to accelerate your AI automation journey
            </p>
          </div>
          
          <div className="responsive-grid responsive-gap">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 group animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="section-padding bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Loved by <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Thousands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our users are saying about their experience
            </p>
          </div>
          
          <div className="responsive-grid responsive-gap">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`card-hover bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
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
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Business with AI?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of companies already using OrchestrAI to automate their workflows and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="enhanced-button bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover-scale transition-all duration-300 group">
                  Start Building Today
                  <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-800/50 text-white px-10 py-4 text-lg backdrop-blur-sm hover-scale transition-all duration-300">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
