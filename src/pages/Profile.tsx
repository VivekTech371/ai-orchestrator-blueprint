
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Settings, 
  Star, 
  Heart, 
  MessageSquare, 
  Share2,
  Award,
  Zap,
  Trophy,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    bio: 'AI automation enthusiast and workflow designer. Love creating efficient systems that make work easier.',
    location: 'San Francisco, CA',
    website: 'https://sarahchen.dev',
    joinDate: 'January 2024',
    avatar: 'SC'
  });

  const [editProfile, setEditProfile] = useState(profile);

  const stats = [
    { label: 'Posts', value: 89, icon: MessageSquare },
    { label: 'Workflows', value: 34, icon: Zap },
    { label: 'Reputation', value: 2847, icon: Star },
    { label: 'Followers', value: 156, icon: Heart }
  ];

  const achievements = [
    { title: 'Expert Contributor', description: 'Created 50+ helpful posts', icon: Award, color: 'from-purple-500 to-pink-500' },
    { title: 'Workflow Master', description: 'Shared 25+ automation workflows', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { title: 'Community Helper', description: 'Helped 100+ community members', icon: Trophy, color: 'from-green-500 to-emerald-500' }
  ];

  const recentActivity = [
    {
      type: 'post',
      title: 'Building a Complete Customer Support Automation',
      timestamp: '2 hours ago',
      stats: { likes: 89, comments: 23 }
    },
    {
      type: 'workflow',
      title: 'E-commerce Order Processing Pipeline',
      timestamp: '1 day ago',
      stats: { likes: 45, downloads: 234 }
    },
    {
      type: 'comment',
      title: 'Commented on "Tutorial: Creating Your First AI Agent"',
      timestamp: '2 days ago',
      stats: { likes: 12 }
    }
  ];

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProfile(editProfile);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-6xl mx-auto container-padding section-padding">
        {/* Profile Header */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              {profile.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                    className="text-2xl font-bold bg-gray-700/50 border-gray-600 text-white"
                    placeholder="Your name"
                  />
                  <Input
                    value={editProfile.bio}
                    onChange={(e) => setEditProfile({...editProfile, bio: e.target.value})}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    placeholder="Bio"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={editProfile.location}
                      onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                      className="bg-gray-700/50 border-gray-600 text-white"
                      placeholder="Location"
                    />
                    <Input
                      value={editProfile.website}
                      onChange={(e) => setEditProfile({...editProfile, website: e.target.value})}
                      className="bg-gray-700/50 border-gray-600 text-white"
                      placeholder="Website"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-gray-300 text-lg mb-4 leading-relaxed">{profile.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={profile.website} className="text-blue-400 hover:text-blue-300 transition-colors">
                        {profile.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button 
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4 mr-2" />}
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="border-gray-600 hover:bg-gray-700/50">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50">
                    <Settings className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in animation-delay-200">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover-scale">
                    <CardContent className="p-4 text-center">
                      <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 animate-fade-in animation-delay-300">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium line-clamp-1">{activity.title}</h4>
                      <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{activity.stats.likes}</span>
                        </div>
                        {activity.stats.comments && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{activity.stats.comments}</span>
                          </div>
                        )}
                        {activity.stats.downloads && (
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <span>{activity.stats.downloads}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 animate-fade-in animation-delay-400">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 animate-fade-in animation-delay-500">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New Post
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50">
                  <Zap className="w-4 h-4 mr-2" />
                  Share Workflow
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700/50">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
