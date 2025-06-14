
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Monitor, Smartphone, Tablet, Globe, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Session {
  id: string;
  ip: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
  is_current: boolean;
}

export const SessionManager: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      // Note: This is a simplified version. In a real implementation,
      // you would need to track sessions in your database
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Mock session data for demonstration
        setSessions([
          {
            id: session.access_token.substring(0, 8),
            ip: '192.168.1.1',
            user_agent: navigator.userAgent,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_current: true
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return Smartphone;
    if (userAgent.includes('Tablet')) return Tablet;
    return Monitor;
  };

  const getDeviceType = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  };

  const getBrowser = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const revokeSession = async (sessionId: string) => {
    try {
      // In a real implementation, you would revoke the specific session
      if (sessionId === sessions[0]?.id) {
        await supabase.auth.signOut();
        toast({
          title: "Session revoked",
          description: "You have been signed out successfully."
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const revokeAllOtherSessions = async () => {
    try {
      // In a real implementation, you would revoke all other sessions
      toast({
        title: "Sessions revoked",
        description: "All other sessions have been revoked."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Active Sessions</h3>
          <p className="text-sm text-gray-400">Manage your active sessions across devices</p>
        </div>
        {sessions.length > 1 && (
          <Button
            onClick={revokeAllOtherSessions}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600/10"
          >
            <Shield className="w-4 h-4 mr-2" />
            Revoke All Others
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {sessions.map((session) => {
          const DeviceIcon = getDeviceIcon(session.user_agent);
          
          return (
            <Card key={session.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <DeviceIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-white">
                          {getDeviceType(session.user_agent)} • {getBrowser(session.user_agent)}
                        </h4>
                        {session.is_current && (
                          <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>{session.ip}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            Last active {new Date(session.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!session.is_current && (
                    <Button
                      onClick={() => revokeSession(session.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-400 hover:bg-red-600/10"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
