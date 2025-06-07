
import { useState, useEffect } from 'react';

interface LikeData {
  id: string;
  liked: boolean;
  likeCount: number;
}

export const useLike = (itemId: string, initialLiked: boolean = false, initialCount: number = 0) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLike = localStorage.getItem(`like_${itemId}`);
    if (savedLike) {
      const likeData: LikeData = JSON.parse(savedLike);
      setLiked(likeData.liked);
      setLikeCount(likeData.likeCount);
    }
  }, [itemId]);

  const toggleLike = async () => {
    setIsLoading(true);
    
    try {
      const newLiked = !liked;
      const newCount = newLiked ? likeCount + 1 : likeCount - 1;
      
      // Update state
      setLiked(newLiked);
      setLikeCount(newCount);
      
      // Save to localStorage
      const likeData: LikeData = {
        id: itemId,
        liked: newLiked,
        likeCount: newCount
      };
      localStorage.setItem(`like_${itemId}`, JSON.stringify(likeData));
      
      // Here you would typically make an API call to save the like status
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
      
    } catch (error) {
      // Revert on error
      setLiked(!liked);
      setLikeCount(liked ? likeCount + 1 : likeCount - 1);
      console.error('Failed to toggle like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    liked,
    likeCount,
    isLoading,
    toggleLike
  };
};
