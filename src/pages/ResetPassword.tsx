
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated"
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    { id: 'uppercase', label: 'At least 1 uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'lowercase', label: 'At least 1 lowercase letter', met: /[a-z]/.test(password) },
    { id: 'number', label: 'At least 1 number', met: /[0-9]/.test(password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-blue-500/25">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Reset your password</h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Enter your new password below
          </p>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700 shadow-xl">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white focus:border-blue-500 transition-all h-10 sm:h-11 text-sm sm:text-base"
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
            
            <div>
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
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all h-10 sm:h-12 text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              disabled={isLoading || !isPasswordValid || password !== confirmPassword}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
