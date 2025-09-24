import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  LinkIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface SocialAccount {
  id: string;
  platform: string;
  name: string;
  handle: string;
  connected: boolean;
  color: string;
  icon: string;
}

const Connections: React.FC = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: 'twitter',
      platform: 'Twitter',
      name: 'Twitter Account',
      handle: '@yourhandle',
      connected: true,
      color: 'bg-blue-500',
      icon: '🐦',
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      name: 'LinkedIn Profile',
      handle: 'Your Name',
      connected: false,
      color: 'bg-blue-700',
      icon: '💼',
    },
    {
      id: 'instagram',
      platform: 'Instagram',
      name: 'Instagram Account',
      handle: '@yourhandle',
      connected: false,
      color: 'bg-pink-500',
      icon: '📸',
    },
  ]);

  const handleConnect = async (accountId: string) => {
    try {
      // In a real app, this would initiate OAuth flow
      setAccounts(accounts.map(account => 
        account.id === accountId 
          ? { ...account, connected: true }
          : account
      ));
      
      toast.success(`${accounts.find(a => a.id === accountId)?.platform} connected successfully!`);
    } catch (error) {
      toast.error('Failed to connect account');
    }
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      setAccounts(accounts.map(account => 
        account.id === accountId 
          ? { ...account, connected: false }
          : account
      ));
      
      toast.success(`${accounts.find(a => a.id === accountId)?.platform} disconnected successfully!`);
    } catch (error) {
      toast.error('Failed to disconnect account');
    }
  };

  const connectedAccounts = accounts.filter(a => a.connected);
  const availableAccounts = accounts.filter(a => !a.connected);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Social Media Connections
          </h1>
          <p className="text-gray-600 mt-2">
            Connect your social media accounts to start automating your posts
          </p>
        </div>

        {/* Connected Accounts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Connected Accounts ({connectedAccounts.length})
          </h2>
          
          {connectedAccounts.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-white/20 text-center">
              <LinkIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Connected Accounts</h3>
              <p className="text-gray-600">Connect your first social media account to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`${account.color} p-3 rounded-xl text-white text-xl`}>
                        {account.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {account.platform}
                        </h3>
                        <p className="text-sm text-gray-600">{account.handle}</p>
                      </div>
                    </div>
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Connected
                    </span>
                    <button
                      onClick={() => handleDisconnect(account.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Accounts */}
        {availableAccounts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Connections
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableAccounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`${account.color} p-3 rounded-xl text-white text-xl`}>
                        {account.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {account.platform}
                        </h3>
                        <p className="text-sm text-gray-600">Connect your account</p>
                      </div>
                    </div>
                    <XCircleIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Not Connected
                    </span>
                    <button
                      onClick={() => handleConnect(account.id)}
                      className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span>Connect</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connection Benefits */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why Connect Your Accounts?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🚀</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Auto-Posting</h4>
              <p className="text-sm text-gray-600">
                Schedule and publish posts automatically across all connected platforms
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Analytics</h4>
              <p className="text-sm text-gray-600">
                Track engagement and performance across all your social media accounts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⏱️</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Time Saving</h4>
              <p className="text-sm text-gray-600">
                Manage all your social media presence from one centralized dashboard
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connections;