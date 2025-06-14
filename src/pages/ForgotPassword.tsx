
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (err) {
      // Error is handled by the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-blue-500/25">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Check your email</h2>
            <p className="mt-2 text-gray-400 text-sm sm:text-base">
              We've sent a password reset link to <span className="text-white font-medium">{email}</span>
            </p>
          </div>
          
          <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full border-gray-600 hover:bg-gray-700"
              >
                Try different email
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-4 sm:mb-6 hover-scale transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center pulse shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-base sm:text-lg">AI</span>
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Reset your password</h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Enter your email address and we'll send you a reset link
          </p>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700 shadow-xl hover-scale transition-all">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="animate-fade-in">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-blue-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 transition-all h-10 sm:h-11 text-sm sm:text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="animate-fade-in animation-delay-200">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all h-10 sm:h-12 text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="text-center animate-fade-in animation-delay-300">
          <Link 
            to="/login" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
