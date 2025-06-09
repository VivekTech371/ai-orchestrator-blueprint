import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkingButton from '@/components/WorkingButton';
import { 
  Bell, 
  BellOff, 
  Check, 
  X, 
  Eye, 
  Trash2, 
  Settings,
  Users,
  MessageSquare,
  Heart,
  Download,
  TrendingUp,
  Clock,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      title: 'Someone liked your agent',
      message: 'Sarah Chen liked your "Customer Support AI Agent"',
      time: '2 minutes ago',
      read: false,
      action: 'view'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New comment on your post',
      message: 'Alex Rodriguez commented: "Great work! This solved our customer service issues."',
      time: '1 hour ago',
      read: false,
      action: 'view'
    },
    {
      id: 3,
      type: 'download',
      title: 'Your agent was downloaded',
      message: '15 new downloads of your "E-commerce Bot" in the last 24 hours',
      time: '3 hours ago',
      read: true,
      action: 'view'
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment processed',
      message: 'Your monthly subscription has been successfully renewed.',
      time: '1 day ago',
      read: true,
      category: 'billing'
    },
    {
      id: 5,
      type: 'error',
      title: 'Agent error detected',
      message: 'Your "Email Processor" agent encountered an error. Click to view details.',
      time: '2 days ago',
      read: false,
      category: 'system'
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return Heart;
      case 'comment':
        return MessageSquare;
      case 'download':
        return Download;
      case 'follow':
        return Users;
      case 'trending':
        return TrendingUp;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'text-red-400 bg-red-400/20';
      case 'comment':
        return 'text-blue-400 bg-blue-400/20';
      case 'download':
        return 'text-green-400 bg-green-400/20';
      case 'follow':
        return 'text-purple-400 bg-purple-400/20';
      case 'trending':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Notifications
            </h1>
            <p className="text-gray-400">
              Stay updated with your latest activity
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {unreadCount} unread
                </Badge>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <WorkingButton 
              action="notification"
              variant="outline"
              className="border-gray-600 hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </WorkingButton>
            
            {unreadCount > 0 && (
              <Button 
                onClick={markAllAsRead}
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-800/60 rounded-lg">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'like', label: 'Likes', count: notifications.filter(n => n.type === 'like').length },
            { id: 'comment', label: 'Comments', count: notifications.filter(n => n.type === 'comment').length },
            { id: 'download', label: 'Downloads', count: notifications.filter(n => n.type === 'download').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                filter === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              )}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-gray-800/60 p-8 rounded-xl border border-gray-700 text-center">
              <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No notifications</h3>
              <p className="text-gray-400">
                {filter === 'all' 
                  ? 'You\'re all caught up! Check back later for new notifications.'
                  : `No ${filter} notifications to show.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = getIcon(notification.type);
              const iconColor = getIconColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 group',
                    notification.read 
                      ? 'border-gray-700 hover:border-gray-600' 
                      : 'border-blue-500/30 bg-blue-900/10 hover:border-blue-500/50'
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      iconColor
                    )}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={cn(
                            'font-semibold mb-1 transition-colors',
                            notification.read ? 'text-gray-300' : 'text-white'
                          )}>
                            {notification.title}
                          </h3>
                          <p className={cn(
                            'text-sm mb-2 line-clamp-2',
                            notification.read ? 'text-gray-500' : 'text-gray-400'
                          )}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{notification.time}</span>
                            {!notification.read && (
                              <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <WorkingButton 
                            action="view"
                            size="sm"
                            variant="outline"
                            className="border-gray-600 hover:bg-gray-700"
                          >
                            <Eye className="w-3 h-3" />
                          </WorkingButton>
                          
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                              className="border-gray-600 hover:bg-gray-700"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteNotification(notification.id)}
                            className="border-gray-600 hover:bg-gray-700 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
