
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'pulse' | 'dots' | 'bounce';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div className={cn(
          'bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse',
          sizeClasses[size]
        )} />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce',
              size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'bounce') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div className={cn(
          'bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce',
          sizeClasses[size]
        )} />
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-600 border-t-blue-500',
        sizeClasses[size]
      )} />
    </div>
  );
};
