
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Inbox, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Star,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';

interface AgentMessage {
  id: string;
  agentName: string;
  type: 'output' | 'notification' | 'error' | 'pending';
  title: string;
  content: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  isStarred: boolean;
}

const AgentInbox: React.FC = () => {
  const [messages] = useState<AgentMessage[]>([
    {
      id: '1',
      agentName: 'Daily News Summarizer',
      type: 'output',
      title: 'Daily news summary generated',
      content: 'Successfully generated and sent daily news summary with 15 top stories',
      timestamp: '5 minutes ago',
      priority: 'medium',
      isRead: false,
      isStarred: true
    },
    {
      id: '2',
      agentName: 'Social Media Scheduler',
      type: 'notification',
      title: 'Posts scheduled for tomorrow',
      content: '5 posts have been scheduled across Twitter, LinkedIn, and Facebook',
      timestamp: '1 hour ago',
      priority: 'low',
      isRead: true,
      isStarred: false
    },
    {
      id: '3',
      agentName: 'Email Automation',
      type: 'error',
      title: 'Authentication failed',
      content: 'Gmail API authentication expired. Please reconnect your account.',
      timestamp: '2 hours ago',
      priority: 'high',
      isRead: false,
      isStarred: false
    },
    {
      id: '4',
      agentName: 'Data Analyzer',
      type: 'pending',
      title: 'Approval required',
      content: 'Report generation completed. Awaiting your approval before sending.',
      timestamp: '3 hours ago',
      priority: 'medium',
      isRead: false,
      isStarred: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'output': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'notification': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread' && message.isRead) return false;
    if (filter === 'starred' && !message.isStarred) return false;
    if (filter === 'pending' && message.type !== 'pending') return false;
    if (searchQuery && !message.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !message.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <Card className="bg-gray-800/60 border-gray-700 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Inbox className="w-5 h-5" />
            Agent Inbox
            <Badge variant="secondary" className="ml-2">
              {messages.filter(m => !m.isRead).length}
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white"
            />
          </div>
          <div className="flex gap-1">
            {['all', 'unread', 'starred', 'pending'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter(filterType as any)}
                className="capitalize"
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-l-4 ${getPriorityColor(message.priority)} ${
                !message.isRead ? 'bg-gray-700/30' : 'bg-gray-800/30'
              } hover:bg-gray-700/50 transition-colors cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(message.type)}
                  <span className="text-sm text-gray-300">{message.agentName}</span>
                  {message.isStarred && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                </div>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              
              <h4 className={`font-medium mb-1 ${!message.isRead ? 'text-white' : 'text-gray-300'}`}>
                {message.title}
              </h4>
              
              <p className="text-sm text-gray-400 line-clamp-2">
                {message.content}
              </p>
              
              <div className="flex items-center gap-2 mt-3">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                {message.type === 'pending' && (
                  <Button variant="outline" size="sm" className="h-6 px-2 text-xs border-green-500 text-green-400">
                    Approve
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-red-400">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No messages found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentInbox;
