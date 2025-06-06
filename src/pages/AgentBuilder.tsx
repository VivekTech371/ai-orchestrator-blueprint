
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Save, 
  Play, 
  Pause, 
  Settings, 
  Trash2, 
  Copy, 
  Share2,
  Zap,
  Database,
  Code,
  MessageSquare,
  Mail,
  Calendar,
  BarChart3,
  ArrowRight,
  ArrowDown,
  Check,
  X,
  Eye,
  Edit3,
  Download,
  Upload,
  Grid3X3,
  List,
  Search,
  Filter,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const AgentBuilder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');

  const [workflow, setWorkflow] = useState({
    name: 'Customer Onboarding Automation',
    description: 'Automate the customer onboarding process with personalized emails and task assignments',
    nodes: [
      {
        id: 1,
        type: 'trigger',
        title: 'New Customer Signup',
        description: 'Triggers when a new customer signs up',
        icon: Zap,
        position: { x: 100, y: 100 },
        settings: {
          event: 'user.signup',
          conditions: []
        }
      },
      {
        id: 2,
        type: 'action',
        title: 'Send Welcome Email',
        description: 'Send personalized welcome email to new customer',
        icon: Mail,
        position: { x: 100, y: 250 },
        settings: {
          template: 'welcome_email',
          delay: 0
        }
      },
      {
        id: 3,
        type: 'action',
        title: 'Create CRM Contact',
        description: 'Add customer to CRM system',
        icon: Database,
        position: { x: 100, y: 400 },
        settings: {
          system: 'salesforce',
          fields: ['name', 'email', 'company']
        }
      },
      {
        id: 4,
        type: 'condition',
        title: 'Check Premium Plan',
        description: 'Check if customer subscribed to premium plan',
        icon: BarChart3,
        position: { x: 400, y: 250 },
        settings: {
          field: 'subscription.plan',
          operator: 'equals',
          value: 'premium'
        }
      }
    ],
    connections: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 }
    ]
  });

  const nodeTypes = [
    { type: 'trigger', name: 'Trigger', icon: Zap, color: 'from-green-500 to-emerald-500', description: 'Start your workflow' },
    { type: 'action', name: 'Action', icon: Settings, color: 'from-blue-500 to-cyan-500', description: 'Perform an action' },
    { type: 'condition', name: 'Condition', icon: Code, color: 'from-purple-500 to-pink-500', description: 'Add logic branching' },
    { type: 'integration', name: 'Integration', icon: Database, color: 'from-orange-500 to-red-500', description: 'Connect external services' },
    { type: 'ai', name: 'AI Action', icon: Sparkles, color: 'from-yellow-500 to-orange-500', description: 'AI-powered actions' }
  ];

  const availableActions = [
    { id: 'email', name: 'Send Email', icon: Mail, category: 'Communication' },
    { id: 'sms', name: 'Send SMS', icon: MessageSquare, category: 'Communication' },
    { id: 'slack', name: 'Slack Message', icon: MessageSquare, category: 'Communication' },
    { id: 'database', name: 'Database Query', icon: Database, category: 'Data' },
    { id: 'api', name: 'API Call', icon: Code, category: 'Integration' },
    { id: 'calendar', name: 'Schedule Event', icon: Calendar, category: 'Automation' },
    { id: 'analytics', name: 'Track Event', icon: BarChart3, category: 'Analytics' }
  ];

  const handleSaveWorkflow = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleRunWorkflow = async () => {
    setIsLoading(true);
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const renderNodeSettings = () => {
    if (selectedNode === null) {
      return (
        <div className="text-center py-12">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Node Selected</h3>
          <p className="text-gray-400">Select a node to configure its settings</p>
        </div>
      );
    }

    const node = workflow.nodes.find(n => n.id === selectedNode);
    if (!node) return null;

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{node.title}</h3>
          <p className="text-gray-400 text-sm">{node.description}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Node Name</Label>
            <Input
              value={node.title}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
              placeholder="Enter node name"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Description</Label>
            <Textarea
              value={node.description}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
              placeholder="Enter node description"
            />
          </div>

          {node.type === 'action' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Action Type</Label>
                <select className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="email">Send Email</option>
                  <option value="sms">Send SMS</option>
                  <option value="api">API Call</option>
                  <option value="database">Database Operation</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Delay (seconds)</Label>
                <Input
                  type="number"
                  defaultValue="0"
                  className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {node.type === 'condition' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Field</Label>
                <Input
                  placeholder="e.g., user.email"
                  className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Operator</Label>
                <select className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Value</Label>
                <Input
                  placeholder="Enter comparison value"
                  className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50">
            <Eye className="w-4 h-4 mr-2" />
            Test
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <Input
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-xl font-semibold bg-transparent border-none text-white p-0 h-auto focus:bg-gray-700/50 focus:border-gray-600 transition-all"
                />
                <p className="text-gray-400 text-sm">Last saved 2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'visual' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('visual')}
                  className={viewMode === 'visual' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : ''}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Visual
                </Button>
                <Button
                  variant={viewMode === 'code' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('code')}
                  className={viewMode === 'code' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : ''}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </div>

              <Button
                onClick={handleRunWorkflow}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover-scale transition-all"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Run Workflow
              </Button>

              <Button
                onClick={handleSaveWorkflow}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover-scale transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>

              <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Sidebar - Node Library */}
          <div className="w-80 bg-gray-800/60 backdrop-blur-sm border-r border-gray-700/50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Node Library</h2>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search nodes..."
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                />
              </div>

              {/* Node Types */}
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Node Types</h3>
                <div className="grid grid-cols-1 gap-3">
                  {nodeTypes.map((nodeType) => {
                    const Icon = nodeType.icon;
                    return (
                      <div
                        key={nodeType.type}
                        draggable
                        className={`card-hover bg-gradient-to-r ${nodeType.color} p-4 rounded-lg cursor-move group transition-all duration-300`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5 text-white" />
                          <span className="font-medium text-white">{nodeType.name}</span>
                        </div>
                        <p className="text-white/80 text-sm">{nodeType.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Available Actions */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Quick Actions</h3>
                <div className="space-y-2">
                  {availableActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={action.id}
                        draggable
                        className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 cursor-move transition-all group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{action.name}</h4>
                          <p className="text-gray-400 text-xs">{action.category}</p>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 relative">
            {viewMode === 'visual' ? (
              <div className="h-full bg-gray-900/20 relative overflow-hidden">
                {/* Canvas Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="h-full w-full" style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Workflow Nodes */}
                <div className="relative h-full p-8">
                  {workflow.nodes.map((node, index) => {
                    const Icon = node.icon;
                    const isSelected = selectedNode === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node.id)}
                        className={`absolute card-hover bg-gray-800/90 backdrop-blur-sm border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover-scale animate-fade-in ${
                          isSelected ? 'border-blue-500 shadow-lg shadow-blue-500/25' : 'border-gray-700/50 hover:border-gray-600'
                        }`}
                        style={{ 
                          left: node.position.x, 
                          top: node.position.y,
                          animationDelay: `${index * 150}ms`
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            node.type === 'trigger' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            node.type === 'action' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            node.type === 'condition' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                            'bg-gradient-to-r from-orange-500 to-red-500'
                          } shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm truncate">{node.title}</h3>
                            <p className="text-gray-400 text-xs capitalize">{node.type}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                          {node.description}
                        </p>
                        
                        {/* Node Actions */}
                        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-700">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-700">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-red-500/20 text-red-400">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Connection Points */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    );
                  })}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                    {workflow.connections.map((connection, index) => {
                      const fromNode = workflow.nodes.find(n => n.id === connection.from);
                      const toNode = workflow.nodes.find(n => n.id === connection.to);
                      if (!fromNode || !toNode) return null;

                      const startX = fromNode.position.x + 100;
                      const startY = fromNode.position.y + 80;
                      const endX = toNode.position.x + 100;
                      const endY = toNode.position.y + 20;

                      return (
                        <g key={index}>
                          <defs>
                            <marker
                              id={`arrowhead-${index}`}
                              markerWidth="10"
                              markerHeight="7"
                              refX="9"
                              refY="3.5"
                              orient="auto"
                            >
                              <polygon
                                points="0 0, 10 3.5, 0 7"
                                fill="#3b82f6"
                              />
                            </marker>
                          </defs>
                          <path
                            d={`M ${startX} ${startY} Q ${startX} ${(startY + endY) / 2} ${endX} ${endY}`}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            fill="none"
                            markerEnd={`url(#arrowhead-${index})`}
                            className="animate-pulse"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Canvas Controls */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 border border-gray-700/50">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-600"></div>
                  <span className="text-sm text-gray-400 px-2">100%</span>
                </div>
              </div>
            ) : (
              <div className="h-full bg-gray-900/90 p-6">
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 h-full p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Workflow Code</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700/50">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700/50">
                        <Upload className="w-4 h-4 mr-2" />
                        Import
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 h-full overflow-y-auto">
                    <pre className="text-green-400 text-sm font-mono">
{`{
  "name": "${workflow.name}",
  "description": "${workflow.description}",
  "triggers": [
    {
      "type": "webhook",
      "event": "user.signup",
      "conditions": []
    }
  ],
  "actions": [
    {
      "type": "email",
      "template": "welcome_email",
      "delay": 0
    },
    {
      "type": "crm",
      "operation": "create_contact",
      "fields": ["name", "email", "company"]
    }
  ],
  "conditions": [
    {
      "field": "subscription.plan",
      "operator": "equals",
      "value": "premium"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Node Settings */}
          <div className="w-80 bg-gray-800/60 backdrop-blur-sm border-l border-gray-700/50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Node Settings</h2>
              </div>

              {renderNodeSettings()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
