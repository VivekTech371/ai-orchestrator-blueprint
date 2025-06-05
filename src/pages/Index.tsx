
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowDown, Check, Star, TrendingUp, Users, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            Describe your goal.
            <br />
            We build your AI agents.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            No code. Fully automated. Built for creators and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-400">
            <Link to="/agent-builder">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg px-8 py-4 hover-scale transition-all">
                Try It Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 hover:bg-gray-700 text-lg px-8 py-4 hover-scale transition-all"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>
          
          {/* Interactive Animation Placeholder */}
          <div className="mt-16 relative animate-fade-in animation-delay-600">
            <div className="w-full h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-gray-700 flex items-center justify-center hover-scale transition-all">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 pulse"></div>
                <p className="text-gray-400">AI Agent Network Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in">How It Works</h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-fade-in animation-delay-200">Four simple steps to automate anything</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Type your automation goal',
                description: 'Describe what you want to automate in plain English',
                icon: '✍️'
              },
              {
                step: '02',
                title: 'AI asks relevant questions',
                description: 'Our AI clarifies requirements to build the perfect solution',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Select from suggested workflows',
                description: 'Choose from AI-generated workflow options',
                icon: '⚡'
              },
              {
                step: '04',
                title: 'Deploy AI agents',
                description: 'We generate and deploy your automation instantly',
                icon: '🚀'
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in hover-scale transition-all" style={{animationDelay: `${400 + index * 200}ms`}}>
                <div className="text-4xl mb-4 transform hover:scale-110 transition-transform">{item.icon}</div>
                <div className="text-sm text-blue-400 font-semibold mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in animation-delay-1000">
            <Link to="/templates">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all">
                Start with a Template
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">Platform Highlights</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Workflow Builder',
                description: 'Visual multi-agent workflow designer with drag-and-drop interface',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Agent Templates Library',
                description: 'Pre-built automation templates for every use case',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Community Marketplace',
                description: 'Share, discover, and monetize AI automation workflows',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Anonymous & Public Modes',
                description: 'Choose your privacy level while building and sharing',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: <Check className="w-8 h-8" />,
                title: 'Gamified System',
                description: 'Earn points, badges, and level up as you create',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Monetizable Agents',
                description: 'Turn your automation skills into income streams',
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group hover-scale animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Transformed my content workflow completely. What used to take hours now happens automatically.",
                author: "Sarah Chen",
                role: "Content Creator",
                category: "Blogging",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2cd?w=100&h=100&fit=crop&crop=face"
              },
              {
                quote: "The AI asks exactly the right questions. It's like having a technical co-founder who gets it.",
                author: "Marcus Rodriguez",
                role: "Marketing Manager",
                category: "Marketing",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              },
              {
                quote: "From zero automation to a full sales pipeline in under an hour. Incredible platform.",
                author: "Emily Watson",
                role: "Sales Director",
                category: "Sales",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover-scale transition-all animate-fade-in" style={{animationDelay: `${200 + index * 150}ms`}}>
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 hover:scale-110 transition-transform"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  <span className="ml-auto bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                    {testimonial.category}
                  </span>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            Your AI workflow, zero code.
          </h2>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-200">
            Join thousands of creators and businesses automating their success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg px-8 py-4 hover-scale transition-all">
                Get Started Free
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 hover:bg-gray-700 text-lg px-8 py-4 hover-scale transition-all"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
