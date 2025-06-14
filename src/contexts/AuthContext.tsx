import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserPreferences, AuthContextType } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setIsSupabaseConfigured(false);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    }).catch(error => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setPreferences(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Skip actual fetching if Supabase is not configured
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Fetch user preferences
      const { data: prefs, error: prefsError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (prefsError && prefsError.code !== 'PGRST116') {
        throw prefsError;
      }

      setUser(profile);
      setPreferences(prefs || null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.session) {
        toast({
          title: "Check your email",
          description: "We've sent you a verification link to complete your registration."
        });
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully."
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You've been signed out successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user found');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setUser(data);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) throw new Error('No user found');

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...updates
        })
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved."
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link."
      });
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const verifyOtp = async (email: string, token: string, type: 'signup' | 'recovery') => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type
      });

      if (error) throw error;

      toast({
        title: "Verification successful",
        description: type === 'signup' ? "Your account has been verified!" : "You can now reset your password."
      });
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      });

      if (error) throw error;

      toast({
        title: "Verification email sent",
        description: "Check your email for the verification link."
      });
    } catch (error: any) {
      toast({
        title: "Failed to send email",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      preferences,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      updatePreferences,
      resetPassword,
      verifyOtp,
      resendVerification
    }}>
      {!isSupabaseConfigured && (
        <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black p-2 text-center text-xs md:text-sm z-50">
          Supabase is not configured. Authentication and database features will not work. 
          <a 
            href="https://docs.lovable.dev/integrations/supabase/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline ml-1 font-bold"
          >
            Learn how to connect Supabase
          </a>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};
