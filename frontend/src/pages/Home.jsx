import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Soul<span className="text-emerald-400">Buddy</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover the secrets of your stars,
          Personalized horoscopes to guide your way,
          Unlock wisdom from the universe today,
          Let SoulBuddy light your path each day.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/chat')}
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-full
                hover:bg-emerald-600 transform hover:scale-105 transition duration-200
                shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chatting Now
            </button>
            <p className="text-sm text-gray-400">
              Join thousands of satisfied users who love our chatbot
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-700">
            <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-emerald-400 text-xl">24/7</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Kundali generation.
            </h3>
            <p className="text-gray-300">Generate your personalized astrological birth chart.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-700">
            <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-purple-400 text-xl">AI</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">AI-powered chatbot for spiritual guidance</h3>
            <p className="text-gray-300">Powered by advanced AI for intelligent conversations.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-700">
            <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-amber-400 text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Personalized recommendations</h3>
            <p className="text-gray-300">Get tailored recommendations just for you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;