
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, XCircle, Mail, ArrowRight } from 'lucide-react';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const { verifyOtp } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const type = searchParams.get('type') as 'signup' | 'recovery';

    if (!token || !email || !type) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verify = async () => {
      try {
        await verifyOtp(email, token, type);
        setStatus('success');
        setMessage(type === 'signup' ? 'Email verified successfully!' : 'You can now reset your password');
        
        // Redirect after successful verification
        setTimeout(() => {
          if (type === 'signup') {
            navigate('/dashboard');
          } else {
            navigate('/reset-password');
          }
        }, 2000);
      } catch (error) {
        setStatus('error');
        setMessage('Verification failed. The link may be invalid or expired.');
      }
    };

    verify();
  }, [searchParams, verifyOtp, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
            status === 'success' ? 'bg-green-500/20 text-green-400' :
            status === 'error' ? 'bg-red-500/20 text-red-400' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {status === 'verifying' && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
            )}
            {status === 'success' && <CheckCircle className="w-8 h-8" />}
            {status === 'error' && <XCircle className="w-8 h-8" />}
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {status === 'verifying' && 'Verifying your email...'}
            {status === 'success' && 'Email verified!'}
            {status === 'error' && 'Verification failed'}
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base">
            {message}
          </p>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700 shadow-xl">
          {status === 'success' && (
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm">
                You'll be redirected automatically, or click below to continue.
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm">
                The verification link may have expired or been used already.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Request new verification
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full border-gray-600 hover:bg-gray-700"
                >
                  Back to login
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {status !== 'success' && (
          <div className="text-center">
            <Link 
              to="/" 
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              ← Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
