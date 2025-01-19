import { useState, useRef, useEffect } from "react";
import {
  Send,
  MoreVertical,
  CheckCheck,
  Image,
  Paperclip,
  Smile,
} from "lucide-react";
import { postChatMessage } from "../services/chat.js";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      sender: "user",
      text: userInput,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    setUserInput(""); // Clear the input field

    try {
      const response = await postChatMessage(userInput);

      const botReply = {
        sender: "bot",
        text: response.data, // Assuming response.data contains the bot's reply
        timestamp: new Date(),
        status: "delivered",
      };

      setMessages((prev) => [...prev, botReply]);

      // Simulate "read" status for the user's message
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 2 ? { ...msg, status: "read" } : msg
          )
        );
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorReply = {
        sender: "bot",
        text: "Something went wrong. Please try again later.",
        timestamp: new Date(),
        status: "error",
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const initialMessage = {
          sender: "bot",
          text: "Welcome! How can I assist you today?",
          timestamp: new Date(),
          status: "delivered",
        };
        setMessages([initialMessage]);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };
    fetchInitialMessages();
  }, []);

  const MessageStatus = ({ status }) => {
    switch (status) {
      case "read":
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
      case "delivered":
        return <CheckCheck className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <h1 className="font-semibold text-white">AI Assistant</h1>
            <p className="text-sm text-gray-400">
              {loading ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <MoreVertical className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-100"
              }`}>
              <p className="break-words">{msg.text}</p>
              <div className="flex items-center justify-end space-x-2 mt-1">
                <span className="text-xs opacity-70 text-gray-400">
                  {formatTime(msg.timestamp)}
                </span>
                {msg.sender === "user" && <MessageStatus status={msg.status} />}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-screen-lg mx-auto flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Paperclip className="h-6 w-6 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Image className="h-6 w-6 text-gray-400" />
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-600 rounded-full"
              onClick={() => setShowEmoji(!showEmoji)}>
              <Smile className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !userInput.trim()}>
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
