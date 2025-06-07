
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Copy, 
  Mail, 
  MessageSquare, 
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Facebook,
  Check,
  Download,
  QrCode,
  Users,
  Globe,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: 'template' | 'post' | 'workflow';
  itemUrl?: string;
}

const ShareInterface: React.FC<ShareInterfaceProps> = ({ 
  isOpen, 
  onClose, 
  itemTitle, 
  itemType,
  itemUrl = window.location.href
}) => {
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const { toast } = useToast();

  const shareData = {
    title: itemTitle,
    url: itemUrl,
    text: `Check out this amazing ${itemType}: ${itemTitle}`
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'from-gray-500 to-gray-600',
      action: () => copyToClipboard()
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'from-blue-400 to-blue-500',
      action: () => shareToTwitter()
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      action: () => shareToLinkedIn()
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-500 to-blue-600',
      action: () => shareToFacebook()
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-green-500 to-green-600',
      action: () => shareViaEmail()
    },
    {
      name: 'Teams',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      action: () => shareToTeams()
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(shareData.url);
    const title = encodeURIComponent(shareData.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareData.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out: ${shareData.title}`);
    const body = encodeURIComponent(`${shareData.text}\n\n${shareData.url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareToTeams = () => {
    const url = encodeURIComponent(shareData.url);
    const text = encodeURIComponent(shareData.text);
    window.open(`https://teams.microsoft.com/share?href=${url}&msgText=${text}`, '_blank');
  };

  const generateQRCode = () => {
    toast({
      title: "QR Code",
      description: "QR code generation feature coming soon!",
    });
  };

  const downloadAsFile = () => {
    const content = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itemType}-${itemTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">Share</h2>
            <Button variant="ghost" onClick={onClose} className="hover:bg-gray-700 p-2 h-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium text-sm sm:text-base truncate">{itemTitle}</h3>
              <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs mt-1">
                {itemType}
              </Badge>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            {shareOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.action}
                  className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all duration-300 hover-scale group"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    {option.name === 'Copy Link' && copied ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                  </div>
                  <span className="text-gray-300 text-xs font-medium text-center leading-tight">{option.name}</span>
                </button>
              );
            })}
          </div>

          {/* Direct Link */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Direct Link</label>
            <div className="flex gap-2">
              <Input
                value={shareData.url}
                readOnly
                className="bg-gray-700/50 border-gray-600 text-gray-300 text-sm flex-1 min-w-0"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-gray-600 hover:bg-gray-700/50 px-3 flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Custom Message */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Add a personal message (optional)</label>
            <Input
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Why are you sharing this?"
              className="bg-gray-700/50 border-gray-600 text-white"
            />
          </div>

          {/* Additional Options */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <Button
              onClick={generateQRCode}
              variant="outline"
              className="flex-1 border-gray-600 hover:bg-gray-700/50 text-sm"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
            <Button
              onClick={downloadAsFile}
              variant="outline"
              className="flex-1 border-gray-600 hover:bg-gray-700/50 text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-400 text-xs font-medium">Public Share</p>
                <p className="text-gray-400 text-xs leading-relaxed">Anyone with this link can view this {itemType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareInterface;
