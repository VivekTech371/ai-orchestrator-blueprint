
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  BellOff, 
  Check, 
  Trash2, 
  Settings, 
  Filter,
  Zap,
  Users,
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Agent deployment successful',
      message: 'Your customer service agent has been deployed successfully and is now active.',
      time: '2 minutes ago',
      read: false,
      category: 'system'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High API usage detected',
      message: 'Your agent "Data Processor" is approaching the monthly API limit.',
      time: '1 hour ago',
      read: false,
      category: 'usage'
    },
    {
      id: 3,
      type: 'info',
      title: 'New template available',
      message: 'Check out the new "E-commerce Assistant" template in the marketplace.',
      time: '3 hours ago',
      read: true,
      category: 'updates'
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

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Notifications
              </h1>
              <p className="text-gray-400">
                Stay updated with your agent activities and system updates
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                onClick={markAllAsRead}
                className="border-gray-600 hover:bg-gray-700 text-sm"
                disabled={unreadCount === 0}
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="border-gray-600 hover:bg-gray-700 text-red-400 hover:text-red-300 text-sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg font-semibold text-white">{notifications.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <BellOff className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Unread</p>
                  <p className="text-lg font-semibold text-white">{unreadCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">System</p>
                  <p className="text-lg font-semibold text-white">
                    {notifications.filter(n => n.category === 'system').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Updates</p>
                  <p className="text-lg font-semibold text-white">
                    {notifications.filter(n => n.category === 'updates').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="bg-gray-800/60 border border-gray-700 w-full sm:w-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Unread
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              System
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Usage
            </TabsTrigger>
            <TabsTrigger value="updates" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Updates
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-gray-800/60 p-8 sm:p-12 rounded-xl border border-gray-700 text-center">
              <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No notifications</h3>
              <p className="text-gray-400">
                {filter === 'all' ? 'You\'re all caught up!' : `No ${filter} notifications found.`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`bg-gray-800/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="text-white font-semibold">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getBadgeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-3 text-sm sm:text-base">
                      {notification.message}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {notification.time}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="border-gray-600 hover:bg-gray-700 text-xs"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteNotification(notification.id)}
                          className="border-gray-600 hover:bg-gray-700 text-red-400 hover:text-red-300 text-xs"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-xs"
                        >
                          View
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings Link */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <Button variant="outline" className="w-full sm:w-auto border-gray-600 hover:bg-gray-700">
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
