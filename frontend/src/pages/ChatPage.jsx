import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-white font-semibold">SmartChat</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;