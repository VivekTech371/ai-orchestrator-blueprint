
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  User,
  Github, 
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }

    if (!agreedToTerms) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      // User will be redirected after email verification
    } catch (err) {
      // Error is handled by the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'github' | 'google') => {
    // OAuth implementation would go here
    console.log(`${provider} auth not implemented yet`);
  };

  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    { id: 'uppercase', label: 'At least 1 uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'lowercase', label: 'At least 1 lowercase letter', met: /[a-z]/.test(password) },
    { id: 'number', label: 'At least 1 number', met: /[0-9]/.test(password) },
    { id: 'special', label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const isFormValid = name && email && isPasswordValid && password === confirmPassword && agreedToTerms;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-4 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-3 sm:mb-6 hover:scale-105 transition-transform">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-base sm:text-lg">AI</span>
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Sign up to start building AI workflows
          </p>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
          <form className="space-y-3 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="animate-fade-in">
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
                  className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all h-10 sm:h-11 text-sm sm:text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="animate-fade-in">
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
                  className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all h-10 sm:h-11 text-sm sm:text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="animate-fade-in">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all h-10 sm:h-11 text-sm sm:text-base"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((requirement) => (
                    <div 
                      key={requirement.id}
                      className={`flex items-center text-xs transition-all duration-300 ${
                        requirement.met ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      {requirement.met && <Check className="w-3 h-3 mr-1 animate-fade-in flex-shrink-0" />}
                      <span className="truncate">{requirement.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div className="animate-fade-in">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 pr-10 bg-gray-700 border-gray-600 text-white transition-all h-10 sm:h-11 text-sm sm:text-base ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-400 animate-fade-in">Passwords don't match</p>
              )}
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start animate-fade-in">
              <input 
                id="agree-terms" 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 transition-all flex-shrink-0" 
                required
                disabled={isLoading}
              />
              <label htmlFor="agree-terms" className="ml-2 block text-xs sm:text-sm text-gray-300 leading-relaxed">
                I agree to the <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors underline">Terms</Link> and <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors underline">Privacy Policy</Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 transition-all animate-fade-in h-10 sm:h-12 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm sm:text-base"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          {/* Social Login */}
          <div className="mt-4 sm:mt-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or sign up with</span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700 hover:scale-105 transition-all h-9 sm:h-11 text-xs sm:text-sm"
                onClick={() => handleSocialAuth('github')}
                disabled={isLoading}
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="hidden xs:inline">GitHub</span>
                <span className="xs:hidden">Git</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700 hover:scale-105 transition-all h-9 sm:h-11 text-xs sm:text-sm"
                onClick={() => handleSocialAuth('google')}
                disabled={isLoading}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="hidden xs:inline">Google</span>
                <span className="xs:hidden">Go</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Login Link */}
        <div className="text-center animate-fade-in">
          <p className="text-gray-400 text-xs sm:text-sm">
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
