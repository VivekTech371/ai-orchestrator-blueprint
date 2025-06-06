
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Download, 
  Star, 
  Clock, 
  Users, 
  Zap,
  X,
  Play,
  Settings,
  Code,
  FileText,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: number;
    title: string;
    description: string;
    category: string;
    rating: number;
    downloads: number;
    author: string;
    tags: string[];
    difficulty: string;
    estimatedTime: string;
    preview?: string;
  };
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  isOpen, 
  onClose, 
  template 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isUsing, setIsUsing] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'workflow', name: 'Workflow', icon: Zap },
    { id: 'code', name: 'Code', icon: Code },
    { id: 'documentation', name: 'Docs', icon: FileText }
  ];

  const workflowSteps = [
    {
      id: 1,
      title: 'Customer Inquiry Received',
      description: 'System detects new customer inquiry via email, chat, or form submission',
      type: 'trigger',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Categorize & Route',
      description: 'AI analyzes inquiry content and routes to appropriate department',
      type: 'process',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Generate Response',
      description: 'Create personalized response based on inquiry type and customer history',
      type: 'action',
      status: 'active'
    },
    {
      id: 4,
      title: 'Send Notification',
      description: 'Notify assigned team member and send acknowledgment to customer',
      type: 'notification',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Follow-up Reminder',
      description: 'Schedule follow-up reminder if no response within 24 hours',
      type: 'schedule',
      status: 'pending'
    }
  ];

  const codeExample = `// Customer Onboarding Automation
const onboardingFlow = {
  trigger: 'new_customer_signup',
  steps: [
    {
      type: 'email',
      template: 'welcome_email',
      delay: 0
    },
    {
      type: 'create_tasks',
      tasks: [
        'setup_profile',
        'verify_email',
        'complete_onboarding'
      ],
      delay: 300 // 5 minutes
    },
    {
      type: 'conditional',
      condition: 'email_verified',
      true_path: 'send_getting_started_guide',
      false_path: 'send_verification_reminder'
    }
  ]
};`;

  const documentation = [
    {
      section: 'Requirements',
      content: [
        'Email service integration (SendGrid, Mailgun, etc.)',
        'Customer database access',
        'Task management system integration'
      ]
    },
    {
      section: 'Setup Instructions',
      content: [
        '1. Configure your email service API credentials',
        '2. Set up webhook endpoints for customer events',
        '3. Customize email templates to match your brand',
        '4. Test the workflow with sample data'
      ]
    },
    {
      section: 'Customization Options',
      content: [
        'Modify email templates and timing',
        'Add custom fields to customer profiles',
        'Integrate with your existing CRM system',
        'Set up custom notification preferences'
      ]
    }
  ];

  const handleUseTemplate = () => {
    setIsUsing(true);
    setTimeout(() => {
      setIsUsing(false);
      onClose();
    }, 2000);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger': return Play;
      case 'process': return Settings;
      case 'action': return Zap;
      case 'notification': return Users;
      case 'schedule': return Clock;
      default: return CheckCircle;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'active': return 'from-blue-500 to-cyan-500';
      case 'pending': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{template.title}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{template.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">{template.downloads} downloads</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{template.estimatedTime}</span>
                </div>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  {template.difficulty}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="hover:bg-gray-700 p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-700/50 p-1 rounded-lg">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-600/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What this template does</h3>
                <p className="text-gray-300 leading-relaxed">
                  This comprehensive customer onboarding automation streamlines the entire process from 
                  signup to activation. It automatically sends personalized welcome emails, creates 
                  onboarding tasks, tracks progress, and ensures no new customer falls through the cracks.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {[
                    'Automated welcome email sequence',
                    'Personalized onboarding tasks',
                    'Progress tracking and reminders',
                    'Integration with popular CRM systems',
                    'Customizable email templates',
                    'Analytics and reporting'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Author</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {template.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium">{template.author}</p>
                    <p className="text-gray-400 text-sm">OrchestrAI Team</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Workflow Steps</h3>
              <div className="space-y-4">
                {workflowSteps.map((step, index) => {
                  const StepIcon = getStepIcon(step.type);
                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getStepColor(step.status)} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <StepIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{step.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                        <Badge 
                          className={`mt-2 text-xs ${
                            step.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            step.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {step.status}
                        </Badge>
                      </div>
                      {index < workflowSteps.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-gray-600 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Code Preview</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
              <p className="text-gray-400 text-sm">
                This is a simplified preview. The full template includes additional configuration 
                options and error handling.
              </p>
            </div>
          )}

          {activeTab === 'documentation' && (
            <div className="space-y-6">
              {documentation.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-white mb-3">{section.section}</h3>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <Button 
            onClick={handleUseTemplate}
            disabled={isUsing}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            {isUsing ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Use This Template
              </>
            )}
          </Button>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700/50">
            <Star className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
