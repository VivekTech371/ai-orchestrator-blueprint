
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Star,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Bug,
  Heart,
  Zap,
  TrendingUp,
  Users
} from 'lucide-react';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    type: 'general',
    rating: 0,
    subject: '',
    message: '',
    email: '',
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast({
      title: "Feedback submitted!",
      description: "Thank you for helping us improve OrchestrAI.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFeedbackData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFeedbackData(prev => ({ ...prev, rating }));
  };

  const handleQuickFeedback = (type: string, rating: number) => {
    setFeedbackData(prev => ({ ...prev, type, rating }));
    toast({
      title: "Quick feedback recorded",
      description: "Thank you for your input!",
    });
  };

  const feedbackTypes = [
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Suggest new features or improvements',
      value: 'feature',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Bug,
      title: 'Bug Report',
      description: 'Report issues or bugs you\'ve encountered',
      value: 'bug',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'General Feedback',
      description: 'Share your overall experience',
      value: 'general',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Feedback about speed and performance',
      value: 'performance',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const quickActions = [
    {
      icon: ThumbsUp,
      title: 'Love it!',
      description: 'Everything works great',
      action: () => handleQuickFeedback('general', 5)
    },
    {
      icon: TrendingUp,
      title: 'Good Progress',
      description: 'Heading in the right direction',
      action: () => handleQuickFeedback('general', 4)
    },
    {
      icon: Users,
      title: 'Could be Better',
      description: 'Some improvements needed',
      action: () => handleQuickFeedback('general', 3)
    },
    {
      icon: ThumbsDown,
      title: 'Not Great',
      description: 'Needs significant improvements',
      action: () => handleQuickFeedback('general', 2)
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-400 mb-6">
              Your feedback helps us build a better experience for everyone.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setFeedbackData({
                  type: 'general',
                  rating: 0,
                  subject: '',
                  message: '',
                  email: '',
                  anonymous: false
                });
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Submit More Feedback
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Share Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Feedback</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Help us improve OrchestrAI by sharing your thoughts and suggestions
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group text-left"
              >
                <Icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Detailed Feedback</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">What type of feedback is this?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFeedbackData(prev => ({ ...prev, type: type.value }))}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            feedbackData.type === type.value
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-2 bg-gradient-to-r ${type.color} bg-clip-text text-transparent`} />
                          <h3 className="text-white font-medium text-sm">{type.title}</h3>
                          <p className="text-gray-400 text-xs">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">How would you rate your experience?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-all duration-200 hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || feedbackData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={feedbackData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Brief summary of your feedback"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Feedback</label>
                  <textarea
                    name="message"
                    value={feedbackData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none transition-colors"
                    placeholder="Please share your detailed feedback..."
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="your@email.com (if you'd like a response)"
                  />
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    checked={feedbackData.anonymous}
                    onChange={(e) => setFeedbackData(prev => ({ ...prev, anonymous: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-300">
                    Submit anonymously
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Updates */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Updates</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">
                    New Feature
                  </Badge>
                  <p className="text-white text-sm font-medium">Enhanced Agent Builder</p>
                  <p className="text-gray-400 text-xs">Improved workflow creation with new templates</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-2">
                    Improvement
                  </Badge>
                  <p className="text-white text-sm font-medium">Faster Performance</p>
                  <p className="text-gray-400 text-xs">50% faster agent execution times</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-2">
                    Fix
                  </Badge>
                  <p className="text-white text-sm font-medium">Bug Fixes</p>
                  <p className="text-gray-400 text-xs">Resolved issues with data export</p>
                </div>
              </div>
            </div>

            {/* Feedback Stats */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Community Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Features Requested</span>
                  <span className="text-blue-400 font-semibold">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Features Implemented</span>
                  <span className="text-green-400 font-semibold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bugs Fixed</span>
                  <span className="text-purple-400 font-semibold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold">4.7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
