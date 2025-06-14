
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Settings, 
  User, 
  Zap, 
  MessageSquare, 
  Star,
  Plus,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, preferences, signOut, updatePreferences } = useAuth();

  const commands = [
    {
      group: 'Navigation',
      items: [
        { id: 'dashboard', label: 'Go to Dashboard', icon: Zap, action: () => navigate('/dashboard') },
        { id: 'agents', label: 'View Agent Builder', icon: Plus, action: () => navigate('/agent-builder') },
        { id: 'community', label: 'Open Community', icon: MessageSquare, action: () => navigate('/community') },
        { id: 'templates', label: 'Browse Templates', icon: Star, action: () => navigate('/templates') },
        { id: 'marketplace', label: 'Visit Marketplace', icon: Star, action: () => navigate('/marketplace') },
        { id: 'profile', label: 'View Profile', icon: User, action: () => navigate('/settings') },
        { id: 'settings', label: 'Open Settings', icon: Settings, action: () => navigate('/settings') }
      ]
    },
    {
      group: 'Actions',
      items: [
        { 
          id: 'toggle-theme', 
          label: `Switch to ${preferences?.theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
          icon: preferences?.theme === 'dark' ? Sun : Moon, 
          action: () => {
            if (preferences) {
              updatePreferences({ 
                theme: preferences.theme === 'dark' ? 'light' : 'dark' 
              });
            }
          }
        },
        { id: 'logout', label: 'Sign Out', icon: LogOut, action: signOut }
      ]
    }
  ];

  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // This would be handled by parent component
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-2xl bg-gray-900 border-gray-700">
        <Command className="bg-gray-900">
          <div className="flex items-center px-4 py-3 border-b border-gray-700">
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <CommandInput 
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command or search..."
              className="bg-transparent border-0 focus:ring-0 text-white placeholder-gray-400"
            />
            <kbd className="ml-auto text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              ⌘K
            </kbd>
          </div>
          <CommandList className="max-h-96 overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-gray-400">
              No commands found.
            </CommandEmpty>
            {filteredCommands.map((group) => (
              <CommandGroup key={group.group} heading={group.group} className="text-gray-300">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleSelect(item.action)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-800 text-white"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span>{item.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
