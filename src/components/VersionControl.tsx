
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GitBranch, 
  Clock, 
  User, 
  Download, 
  GitCompare,
  RotateCcw,
  Tag,
  Plus,
  Eye
} from 'lucide-react';

interface Version {
  id: string;
  version: string;
  description: string;
  author: string;
  timestamp: string;
  changes: number;
  isCurrent: boolean;
  isStable: boolean;
  size: string;
}

const VersionControl: React.FC = () => {
  const [versions] = useState<Version[]>([
    {
      id: '1',
      version: 'v2.1.3',
      description: 'Added multi-agent collaboration features',
      author: 'You',
      timestamp: '2 hours ago',
      changes: 15,
      isCurrent: true,
      isStable: true,
      size: '2.4 MB'
    },
    {
      id: '2',
      version: 'v2.1.2',
      description: 'Fixed email authentication issues',
      author: 'You',
      timestamp: '1 day ago',
      changes: 3,
      isCurrent: false,
      isStable: true,
      size: '2.3 MB'
    },
    {
      id: '3',
      version: 'v2.1.1',
      description: 'Improved error handling and logging',
      author: 'John Doe',
      timestamp: '3 days ago',
      changes: 8,
      isCurrent: false,
      isStable: true,
      size: '2.3 MB'
    },
    {
      id: '4',
      version: 'v2.1.0',
      description: 'Major update: Added scheduling capabilities',
      author: 'You',
      timestamp: '1 week ago',
      changes: 42,
      isCurrent: false,
      isStable: true,
      size: '2.2 MB'
    },
    {
      id: '5',
      version: 'v2.0.9',
      description: 'Performance optimizations',
      author: 'Sarah Chen',
      timestamp: '2 weeks ago',
      changes: 12,
      isCurrent: false,
      isStable: false,
      size: '2.1 MB'
    }
  ]);

  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      } else if (prev.length < 2) {
        return [...prev, versionId];
      } else {
        return [prev[1], versionId];
      }
    });
  };

  return (
    <Card className="bg-gray-800/60 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Version History
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={selectedVersions.length !== 2}
              className="border-gray-600"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600">
              <Plus className="w-4 h-4 mr-2" />
              New Version
            </Button>
          </div>
        </div>
        
        {selectedVersions.length > 0 && (
          <div className="text-sm text-gray-400">
            {selectedVersions.length === 1 ? '1 version selected' : `${selectedVersions.length} versions selected for comparison`}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {versions.map((version) => (
            <div
              key={version.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                version.isCurrent 
                  ? 'bg-blue-500/10 border-blue-500/30' 
                  : selectedVersions.includes(version.id)
                  ? 'bg-gray-700/50 border-gray-500'
                  : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => handleVersionSelect(version.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">{version.version}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {version.isCurrent && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Current
                      </Badge>
                    )}
                    {version.isStable && (
                      <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                        Stable
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Download className="w-3 h-3" />
                  </Button>
                  {!version.isCurrent && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-orange-400">
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 mb-3">{version.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{version.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{version.timestamp}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span>{version.changes} changes</span>
                  <span>{version.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
          <h4 className="font-medium text-white mb-2">Version Control Tips</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Select two versions to compare changes</li>
            <li>• Revert to any previous stable version</li>
            <li>• Create new versions when making significant changes</li>
            <li>• Stable versions are recommended for production use</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VersionControl;
