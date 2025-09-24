import React from 'react';
import Navbar from '../components/Navbar';
import { 
  ChartBarIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  LinkIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Scheduled Posts',
      value: '12',
      icon: CalendarIcon,
      change: '+4',
      changeType: 'increase' as const,
    },
    {
      name: 'AI Generated',
      value: '28',
      icon: ChatBubbleLeftRightIcon,
      change: '+12',
      changeType: 'increase' as const,
    },
    {
      name: 'Connected Accounts',
      value: '3',
      icon: LinkIcon,
      change: '+1',
      changeType: 'increase' as const,
    },
    {
      name: 'Engagement Rate',
      value: '8.2%',
      icon: ArrowTrendingUpIcon,
      change: '+2.1%',
      changeType: 'increase' as const,
    },
  ];

  const quickActions = [
    {
      name: 'Create AI Post',
      description: 'Generate content with AI assistance',
      icon: ChatBubbleLeftRightIcon,
      link: '/chatbot',
      color: 'bg-purple-500',
    },
    {
      name: 'Schedule Post',
      description: 'Plan your content calendar',
      icon: CalendarIcon,
      link: '/calendar',
      color: 'bg-blue-500',
    },
    {
      name: 'Connect Account',
      description: 'Link your social media profiles',
      icon: LinkIcon,
      link: '/connections',
      color: 'bg-green-500',
      gradient: 'from-emerald-500 to-green-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl mr-4 pulse-glow">
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Welcome back! Here's your social media automation command center.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((item) => (
              <motion.div
                key={item.name}
                className="group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="gradient-border">
                  <div className="gradient-border-content">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {item.value}
                        </div>
                        <div className="flex items-center text-sm font-semibold text-emerald-600">
                          <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                          {item.change}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div 
              className="lg:col-span-2 gradient-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="gradient-border-content">
                <div className="flex items-center mb-6">
                  <RocketLaunchIcon className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.link}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className={`bg-gradient-to-r ${action.gradient || 'from-purple-500 to-blue-500'} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {action.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              className="gradient-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="gradient-border-content">
                <div className="flex items-center mb-6">
                  <BoltIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                </div>
                <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Posted to <span className="text-blue-600 font-semibold">Twitter</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Generated content with <span className="text-purple-600 font-semibold">AI Chatbot</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Scheduled post for <span className="text-blue-700 font-semibold">LinkedIn</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Connected <span className="text-pink-600 font-semibold">Instagram</span> account
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;