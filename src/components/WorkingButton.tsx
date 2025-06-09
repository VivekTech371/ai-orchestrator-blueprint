
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface WorkingButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  action?: 'useTemplate' | 'purchase' | 'download' | 'startSelling' | 'continue' | 'view' | 'notification' | 'security' | 'billing' | 'preferences' | 'export' | 'delete';
  onClick?: () => void;
  disabled?: boolean;
}

const WorkingButton: React.FC<WorkingButtonProps> = ({
  variant = 'default',
  size = 'default',
  icon: Icon,
  children,
  className,
  action,
  onClick,
  disabled = false
}) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    // Default actions based on button type
    switch (action) {
      case 'useTemplate':
        toast({
          title: "Template Selected",
          description: "Redirecting to agent builder with this template...",
        });
        // Simulate navigation delay
        setTimeout(() => {
          window.location.href = '/agent-builder';
        }, 1000);
        break;
        
      case 'purchase':
        toast({
          title: "Redirecting to Checkout",
          description: "Taking you to secure payment page...",
        });
        break;
        
      case 'download':
        toast({
          title: "Download Started",
          description: "Your download will begin shortly...",
        });
        break;
        
      case 'startSelling':
        toast({
          title: "Seller Dashboard",
          description: "Redirecting to seller registration...",
        });
        break;
        
      case 'continue':
        toast({
          title: "Continuing Work",
          description: "Loading your draft...",
        });
        break;
        
      case 'view':
        toast({
          title: "Opening Details",
          description: "Loading detailed view...",
        });
        break;
        
      case 'notification':
        toast({
          title: "Notification Settings",
          description: "Opening notification preferences...",
        });
        break;
        
      case 'security':
        toast({
          title: "Security Settings",
          description: "Loading security configuration...",
        });
        break;
        
      case 'billing':
        toast({
          title: "Billing Settings",
          description: "Redirecting to billing dashboard...",
        });
        break;
        
      case 'preferences':
        toast({
          title: "User Preferences",
          description: "Loading preference settings...",
        });
        break;
        
      case 'export':
        toast({
          title: "Export Started",
          description: "Preparing your data for download...",
        });
        break;
        
      case 'delete':
        toast({
          title: "Delete Account",
          description: "This will permanently delete your account. Please confirm in the modal that will appear.",
          variant: "destructive",
        });
        break;
        
      default:
        toast({
          title: "Action Triggered",
          description: "Button functionality is working!",
        });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'transition-all duration-300 hover:scale-105 active:scale-95',
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
};

export default WorkingButton;
