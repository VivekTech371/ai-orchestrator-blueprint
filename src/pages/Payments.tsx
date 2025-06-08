
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Check, 
  X, 
  AlertCircle,
  Receipt,
  ExternalLink,
  Crown,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('subscription');

  const currentPlan = {
    name: 'Pro',
    price: '$29',
    period: 'month',
    nextBilling: '2024-01-15',
    status: 'active'
  };

  const invoices = [
    {
      id: 'INV-001',
      date: '2023-12-15',
      amount: '$29.00',
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 'INV-002',
      date: '2023-11-15',
      amount: '$29.00',
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 'INV-003',
      date: '2023-10-15',
      amount: '$29.00',
      status: 'paid',
      description: 'Pro Plan - Monthly'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      features: ['5 Agents', 'Basic Templates', 'Community Support'],
      current: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      features: ['Unlimited Agents', 'Premium Templates', 'Priority Support', 'Advanced Analytics'],
      current: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support', 'White-label Options'],
      current: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/5 to-cyan-900/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Payments</h1>
          <p className="text-gray-400">Manage your subscription and view payment history</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800/60 p-1 rounded-lg w-fit">
          {[
            { id: 'subscription', label: 'Subscription', icon: Crown },
            { id: 'invoices', label: 'Invoices', icon: Receipt },
            { id: 'plans', label: 'Plans', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Current Plan</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 text-white">
                      {currentPlan.status.charAt(0).toUpperCase() + currentPlan.status.slice(1)}
                    </Badge>
                    <span className="text-gray-400">Next billing: {currentPlan.nextBilling}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <div className="text-3xl font-bold text-white">{currentPlan.price}</div>
                  <div className="text-gray-400">per {currentPlan.period}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Plan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan Name:</span>
                      <span className="text-white">{currentPlan.name} Plan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Billing Cycle:</span>
                      <span className="text-white">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Payment:</span>
                      <span className="text-white">{currentPlan.nextBilling}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Payment Method</h4>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <CreditCard className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">•••• •••• •••• 4242</div>
                      <div className="text-gray-400 text-sm">Expires 12/26</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-700">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                  Change Plan
                </Button>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                  Cancel Subscription
                </Button>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Usage This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">15</div>
                  <div className="text-gray-400">Agents Created</div>
                  <div className="text-sm text-gray-500">of unlimited</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">2.5K</div>
                  <div className="text-gray-400">API Calls</div>
                  <div className="text-sm text-gray-500">of 10K included</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">8</div>
                  <div className="text-gray-400">Templates Used</div>
                  <div className="text-sm text-gray-500">premium access</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Payment History</h3>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700 mt-4 sm:mt-0">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{invoice.description}</div>
                      <div className="text-sm text-gray-400">{invoice.id} • {invoice.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-white">{invoice.amount}</div>
                      <Badge className={cn(
                        "text-xs",
                        invoice.status === 'paid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      )}>
                        {invoice.status === 'paid' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                      <Download className="w-3 h-3 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={cn(
                "relative bg-gray-800/60 p-6 rounded-2xl border transition-all duration-300",
                plan.current ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-gray-700 hover:border-gray-600'
              )}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-white">{plan.price}</div>
                  <div className="text-gray-400">per {plan.period}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={cn(
                    "w-full",
                    plan.current 
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade to ' + plan.name}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
