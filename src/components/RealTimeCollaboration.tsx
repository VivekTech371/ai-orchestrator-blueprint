
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  Users, 
  Eye, 
  Edit, 
  MessageSquare, 
  Share2,
  UserPlus,
  Crown,
  Circle
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
  cursor?: {
    x: number;
    y: number;
    color: string;
  };
}

interface RealTimeCollaborationProps {
  workflowId: string;
  isOwner?: boolean;
}

const RealTimeCollaboration: React.FC<RealTimeCollaborationProps> = ({ 
  workflowId, 
  isOwner = false 
}) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'You',
      avatar: 'YO',
      role: 'owner',
      status: 'online',
      lastSeen: 'now',
      cursor: { x: 0, y: 0, color: '#3b82f6' }
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'SC',
      role: 'editor',
      status: 'online',
      lastSeen: 'now',
      cursor: { x: 100, y: 50, color: '#10b981' }
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'MJ',
      role: 'viewer',
      status: 'away',
      lastSeen: '5 minutes ago'
    },
    {
      id: '4',
      name: 'Lisa Zhang',
      avatar: 'LZ',
      role: 'editor',
      status: 'offline',
      lastSeen: '2 hours ago'
    }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'editor': return <Edit className="w-3 h-3 text-blue-400" />;
      case 'viewer': return <Eye className="w-3 h-3 text-gray-400" />;
      default: return null;
    }
  };

  const onlineCollaborators = collaborators.filter(c => c.status === 'online');
  const offlineCollaborators = collaborators.filter(c => c.status !== 'online');

  return (
    <Card className="bg-gray-800/60 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Collaboration
            <Badge variant="outline" className="border-green-500 text-green-400">
              {onlineCollaborators.length} online
            </Badge>
          </CardTitle>
          
          {isOwner && (
            <Button 
              size="sm" 
              onClick={() => setShowInviteModal(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Online Collaborators */}
        {onlineCollaborators.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Online Now</h4>
            <div className="space-y-3">
              {onlineCollaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/30">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {collaborator.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(collaborator.status)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{collaborator.name}</span>
                      {getRoleIcon(collaborator.role)}
                    </div>
                    <p className="text-xs text-gray-400 capitalize">{collaborator.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Circle className="w-2 h-2 text-green-400 fill-current" />
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Collaborators */}
        {offlineCollaborators.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Recently Active</h4>
            <div className="space-y-2">
              {offlineCollaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/20">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-300 font-semibold text-sm">
                      {collaborator.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(collaborator.status)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 font-medium text-sm">{collaborator.name}</span>
                      {getRoleIcon(collaborator.role)}
                    </div>
                    <p className="text-xs text-gray-500">Last seen {collaborator.lastSeen}</p>
                  </div>
                  
                  <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                    {collaborator.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collaboration Features */}
        <div className="pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
              <MessageSquare className="w-3 h-3 mr-2" />
              Chat
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
              <Share2 className="w-3 h-3 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Activity</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Circle className="w-1 h-1 bg-green-400 rounded-full" />
              <span>Sarah added a new trigger at 2:34 PM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Circle className="w-1 h-1 bg-blue-400 rounded-full" />
              <span>You modified the email template at 2:31 PM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Circle className="w-1 h-1 bg-purple-400 rounded-full" />
              <span>Mike joined the workflow at 2:28 PM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeCollaboration;
