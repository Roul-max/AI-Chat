import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface GeneratedContent {
  text: string;
  platform: string;
  mediaUrl?: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI content assistant. I can help you create engaging social media posts for Twitter, LinkedIn, and Instagram. What would you like me to help you create today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const platforms = [
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to generate content.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3001/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: input,
          platform: selectedPlatform,
          context: messages.slice(-5)
        })
      });

      const text = await response.text(); // Read raw response
      if (!response.ok) {
        console.error('Backend error:', text);
        throw new Error(`Backend error: ${text}`);
      }

      const data = JSON.parse(text);

      if (!data?.draft?.content) {
        throw new Error('No content returned from backend');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.draft.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setGeneratedContent({
        text: data.draft.content,
        platform: selectedPlatform,
        mediaUrl: data.draft.media_url
      });

      toast.success('Content generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content');
      console.error('Chatbot error:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const schedulePost = () => {
    if (generatedContent) {
      toast.success('Post scheduled successfully!');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Content Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Create engaging social media content with AI assistance
          </p>
        </div>

        {/* Platform Selector */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Platform</h2>
          <div className="flex space-x-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPlatform === platform.id
                    ? `${platform.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-white/20 flex flex-col h-96">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-1 mb-1">
                      <SparklesIcon className="h-4 w-4 text-purple-500" />
                      <span className="text-xs font-medium text-purple-500">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-sm text-gray-600">Generating content...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe the content you want to create..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Generated Content Actions */}
        {generatedContent && (
          <div className="mt-6 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Content</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-900">{generatedContent.text}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => copyToClipboard(generatedContent.text)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <DocumentDuplicateIcon className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={schedulePost}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chatbot;
