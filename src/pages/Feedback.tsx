
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Send, 
  CheckCircle, 
  MessageSquare,
  Lightbulb,
  Bug,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('general');
  const [satisfaction, setSatisfaction] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const feedbackTypes = [
    {
      id: 'general',
      title: 'General Feedback',
      description: 'Share your overall experience',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'feature',
      title: 'Feature Request',
      description: 'Suggest new features or improvements',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'bug',
      title: 'Bug Report',
      description: 'Report issues or problems',
      icon: Bug,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'compliment',
      title: 'Compliment',
      description: 'Tell us what you love',
      icon: Heart,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const satisfactionOptions = [
    { id: 'very-happy', label: 'Very Happy', icon: Smile, color: 'text-green-400' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-400' },
    { id: 'unhappy', label: 'Unhappy', icon: Frown, color: 'text-red-400' }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-400 mb-6">
              Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setRating(0);
                setSatisfaction('');
                setFeedbackType('general');
                setFormData({
                  title: '',
                  description: '',
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            We Value Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Feedback</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Help us improve OrchestrAI by sharing your thoughts, suggestions, and experiences
          </p>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Feedback Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">What type of feedback would you like to share?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div 
                      key={type.id}
                      onClick={() => setFeedbackType(type.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-scale ${
                        feedbackType === type.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-white font-medium mb-1 text-sm">{type.title}</h3>
                      <p className="text-gray-400 text-xs">{type.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Satisfaction */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">How satisfied are you with OrchestrAI?</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {satisfactionOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div 
                      key={option.id}
                      onClick={() => setSatisfaction(option.id)}
                      className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-scale text-center ${
                        satisfaction === option.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">Rate your experience (optional)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      star <= (hoverRating || rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-600'
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-gray-400 self-center">
                    {rating} star{rating !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Brief summary of your feedback"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
                <span className="text-red-400 ml-1">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Please provide detailed feedback. The more specific you are, the better we can help..."
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="your@email.com (if you'd like a response)"
              />
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="text-gray-300">
                Submit feedback anonymously
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="border-gray-600 hover:bg-gray-700"
                onClick={() => {
                  setRating(0);
                  setSatisfaction('');
                  setFeedbackType('general');
                  setFormData({
                    title: '',
                    description: '',
                    email: '',
                    anonymous: false
                  });
                }}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Other Ways to Share Feedback</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <ThumbsUp className="w-5 h-5 text-green-400" />
              <div>
                <h4 className="text-white font-medium text-sm">Feature Requests</h4>
                <p className="text-gray-400 text-xs">Vote on our community forum</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <div>
                <h4 className="text-white font-medium text-sm">Live Chat</h4>
                <p className="text-gray-400 text-xs">Real-time feedback during support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
