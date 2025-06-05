import type { Message } from "../../shared/model/types";
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border border-blue-100'
            }`}
          >
            {message.sender === 'other' && (
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-xs font-medium text-blue-600">AI Assistant</span>
              </div>
            )}
            <ReactMarkdown>
              {message.text}
            </ReactMarkdown>
            
            <div className={`text-xs mt-1.5 ${
              message.sender === 'user' ? 'text-blue-100' : 'text-blue-400'
            }`}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {/* Typing indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-2xl px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border border-blue-100">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-xs font-medium text-blue-600">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 