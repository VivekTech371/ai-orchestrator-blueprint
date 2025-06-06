
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Heart, 
  Reply, 
  MoreHorizontal, 
  Send,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Edit3,
  Trash2,
  Clock
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
    badge?: string;
    reputation: number;
  };
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
  isLiked: boolean;
  isDisliked: boolean;
}

interface CommentsInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: 'template' | 'post' | 'workflow';
}

const CommentsInterface: React.FC<CommentsInterfaceProps> = ({ 
  isOpen, 
  onClose, 
  itemTitle, 
  itemType 
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: 'Alex Kim',
        avatar: 'AK',
        badge: 'Expert',
        reputation: 4532
      },
      content: 'This is incredibly well thought out! The automation flow you\'ve created here saves so much time. I\'ve been looking for something exactly like this for our customer support team.',
      timestamp: '2 hours ago',
      likes: 23,
      dislikes: 1,
      replies: [
        {
          id: 2,
          author: {
            name: 'Sarah Chen',
            avatar: 'SC',
            badge: 'Author',
            reputation: 2847
          },
          content: 'Thank you! I\'m glad it\'s helpful. Feel free to customize it for your specific needs.',
          timestamp: '1 hour ago',
          likes: 12,
          dislikes: 0,
          replies: [],
          isLiked: false,
          isDisliked: false
        }
      ],
      isLiked: true,
      isDisliked: false
    },
    {
      id: 3,
      author: {
        name: 'David Park',
        avatar: 'DP',
        badge: 'Contributor',
        reputation: 1823
      },
      content: 'Great work! One question - how do you handle edge cases where the customer doesn\'t respond within the timeout period?',
      timestamp: '4 hours ago',
      likes: 15,
      dislikes: 0,
      replies: [],
      isLiked: false,
      isDisliked: false
    }
  ]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now(),
        author: {
          name: 'You',
          avatar: 'YU',
          reputation: 856
        },
        content: newComment,
        timestamp: 'just now',
        likes: 0,
        dislikes: 0,
        replies: [],
        isLiked: false,
        isDisliked: false
      };
      setComments([...comments, comment]);
      setNewComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: 'YU',
        reputation: 856
      },
      content: replyContent,
      timestamp: 'just now',
      likes: 0,
      dislikes: 0,
      replies: [],
      isLiked: false,
      isDisliked: false
    };

    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    setReplyContent('');
    setReplyTo(null);
  };

  const toggleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? {
                      ...reply,
                      isLiked: !reply.isLiked,
                      isDisliked: false,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              isDisliked: false,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes
            }
          : comment
      ));
    }
  };

  const CommentComponent = ({ comment, isReply = false, parentId }: { 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: number;
  }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : ''} space-y-3`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          {comment.author.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-white font-medium text-sm">{comment.author.name}</h4>
            {comment.author.badge && (
              <Badge className={`text-xs ${
                comment.author.badge === 'Expert' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                comment.author.badge === 'Author' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                'bg-gradient-to-r from-blue-500 to-cyan-500'
              } text-white border-0`}>
                {comment.author.badge}
              </Badge>
            )}
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-400 text-xs">{comment.author.reputation} rep</span>
            <span className="text-gray-400 text-xs">•</span>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>{comment.timestamp}</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => toggleLike(comment.id, isReply, parentId)}
              className={`flex items-center gap-1 text-xs transition-colors ${
                comment.isLiked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
              <ThumbsDown className="w-4 h-4" />
              <span>{comment.dislikes}</span>
            </button>
            {!isReply && (
              <button 
                onClick={() => setReplyTo(comment.id)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
              <Flag className="w-4 h-4" />
              <span>Report</span>
            </button>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-300 transition-colors p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      {replyTo === comment.id && (
        <div className="ml-12 mt-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              YU
            </div>
            <div className="flex-1">
              <Input
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="bg-gray-700/50 border-gray-600 text-white mb-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitReply(comment.id)}
              />
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleSubmitReply(comment.id)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Reply
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setReplyTo(null)}
                  className="border-gray-600 hover:bg-gray-700/50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map(reply => (
            <CommentComponent 
              key={reply.id} 
              comment={reply} 
              isReply={true} 
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Comments</h2>
            <p className="text-gray-400 text-sm line-clamp-1">{itemTitle}</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="hover:bg-gray-700">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Comments List */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-6">
          {comments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </div>

        {/* New Comment */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              YU
            </div>
            <div className="flex-1">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="bg-gray-700/50 border-gray-600 text-white mb-3"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              />
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-xs">Be respectful and constructive</p>
                <Button 
                  onClick={handleSubmitComment}
                  disabled={isSubmitting || !newComment.trim()}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsInterface;
