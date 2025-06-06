
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  X, 
  Plus, 
  Hash, 
  Eye, 
  EyeOff, 
  Image, 
  Link as LinkIcon, 
  Code,
  FileText,
  Zap,
  HelpCircle,
  Lightbulb,
  Star,
  Send
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'workflows', name: 'Workflows', icon: Zap, description: 'Share automation workflows' },
    { id: 'tutorials', name: 'Tutorials', icon: FileText, description: 'Step-by-step guides' },
    { id: 'showcase', name: 'Showcase', icon: Star, description: 'Show off your projects' },
    { id: 'help', name: 'Help & Support', icon: HelpCircle, description: 'Get help from community' },
    { id: 'feature-requests', name: 'Feature Requests', icon: Lightbulb, description: 'Suggest new features' }
  ];

  const commonTags = [
    'automation', 'ai', 'workflow', 'tutorial', 'beginner', 'advanced',
    'integration', 'api', 'database', 'email', 'scheduling', 'data-processing'
  ];

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !selectedCategory) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Reset form
      setTitle('');
      setContent('');
      setSelectedCategory('');
      setTags([]);
      setIsAnonymous(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Post</h2>
            <Button variant="ghost" onClick={onClose} className="hover:bg-gray-700 p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-6">
          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-3">
              {isAnonymous ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-blue-400" />
              )}
              <div>
                <h3 className="text-white font-medium">Post Anonymously</h3>
                <p className="text-gray-400 text-sm">Hide your identity for this post</p>
              </div>
            </div>
            <Switch
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your post about?"
              className="bg-gray-700/50 border-gray-600 text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-400 text-sm mb-3">Category *</label>
            <div className="grid grid-cols-1 gap-3">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 text-left ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50'
                        : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      selectedCategory === category.id ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                    <div>
                      <h4 className="text-white font-medium text-sm">{category.name}</h4>
                      <p className="text-gray-400 text-xs">{category.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, ask questions, or provide help..."
              rows={6}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <LinkIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <Code className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-gray-400 text-xs">{content.length}/2000</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Tags (max 5)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="border-blue-500 text-blue-400 bg-blue-500/10"
                >
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="bg-gray-700/50 border-gray-600 text-white text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addTag(newTag)}
                />
                <Button 
                  onClick={() => addTag(newTag)}
                  size="sm"
                  disabled={!newTag || tags.length >= 5}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-400 text-xs mr-2">Suggestions:</span>
              {commonTags.filter(tag => !tags.includes(tag)).slice(0, 6).map(tag => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  disabled={tags.length >= 5}
                >
                  <Hash className="w-3 h-3 inline mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              {isAnonymous ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Posting anonymously</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Posting as yourself</span>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="border-gray-600 hover:bg-gray-700/50">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !title.trim() || !content.trim() || !selectedCategory}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Publish Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
