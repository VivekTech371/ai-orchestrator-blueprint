
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  itemId: string;
  initialLiked?: boolean;
  initialCount?: number;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  showCount?: boolean;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  itemId,
  initialLiked = false,
  initialCount = 0,
  size = 'default',
  variant = 'ghost',
  showCount = true,
  className
}) => {
  const { liked, likeCount, isLoading, toggleLike } = useLike(itemId, initialLiked, initialCount);

  const iconSizes = {
    sm: 'w-3 h-3',
    default: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base'
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLike}
      disabled={isLoading}
      className={cn(
        'gap-1 transition-all duration-300',
        liked ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-red-400',
        className
      )}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          'transition-all duration-300',
          liked ? 'fill-current scale-110' : 'scale-100',
          isLoading && 'animate-pulse'
        )} 
      />
      {showCount && (
        <span className={cn(textSizes[size], 'font-medium')}>
          {likeCount}
        </span>
      )}
    </Button>
  );
};

export default LikeButton;
