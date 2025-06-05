
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '../hooks/useAuth';
import { 
  Mail, 
  Lock, 
  User,
  Github, 
  Twitter,
  Check
} from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    { id: 'uppercase', label: 'At least 1 uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'lowercase', label: 'At least 1 lowercase letter', met: /[a-z]/.test(password) },
    { id: 'number', label: 'At least 1 number', met: /[0-9]/.test(password) },
    { id: 'special', label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-4 sm:mb-6 hover-scale">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center glow shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-base sm:text-lg">AI</span>
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Sign up to start building AI workflows
          </p>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 animate-fade-in text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="animate-fade-in animation-delay-200">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all h-10 sm:h-11"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="animate-fade-in animation-delay-300">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all h-10 sm:h-11"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="animate-fade-in animation-delay-400">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all h-10 sm:h-11"
                  required
                  disabled={isLoading}
                />
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                  {passwordRequirements.map((requirement) => (
                    <div 
                      key={requirement.id}
                      className={`flex items-center text-xs transition-all duration-300 ${
                        requirement.met ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      {requirement.met && <Check className="w-3 h-3 mr-1 animate-fade-in" />}
                      <span className="truncate">{requirement.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div className="animate-fade-in animation-delay-500">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 bg-gray-700 border-gray-600 text-white transition-all h-10 sm:h-11 ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-400 animate-fade-in">Passwords don't match</p>
              )}
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start animate-fade-in animation-delay-600">
              <input 
                id="agree-terms" 
                type="checkbox" 
                className="h-4 w-4 mt-0.5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 transition-all" 
                required
                disabled={isLoading}
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-300 leading-relaxed">
                I agree to the <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors underline">Terms</Link> and <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors underline">Privacy Policy</Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all animate-fade-in animation-delay-700 h-11 sm:h-12 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          {/* Social Login */}
          <div className="mt-6 animate-fade-in animation-delay-800">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or sign up with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700 hover-scale transition-all h-10 sm:h-11"
                disabled={isLoading}
              >
                <Github className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">GitHub</span>
                <span className="sm:hidden">Git</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700 hover-scale transition-all h-10 sm:h-11"
                disabled={isLoading}
              >
                <Twitter className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Twitter</span>
                <span className="sm:hidden">X</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Login Link */}
        <div className="text-center animate-fade-in animation-delay-1000">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
