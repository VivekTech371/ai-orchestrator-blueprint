
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  role: 'user' | 'admin' | 'seller' | 'moderator';
  is_anonymous: boolean;
  anonymous_handle?: string;
  anonymous_avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications_email: boolean;
  notifications_push: boolean;
  notifications_in_app: boolean;
  email_workflow_failures: boolean;
  email_template_updates: boolean;
  email_community_replies: boolean;
  email_agent_purchases: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyOtp: (email: string, token: string, type: 'signup' | 'recovery') => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}
