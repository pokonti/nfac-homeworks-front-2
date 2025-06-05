import { useState } from "react";
import type { KeyboardEvent } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export const MessageInput = ({ onSendMessage, isLoading = false }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
      setFile(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200">
      {/* File preview */}
      {file && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              {file.type.startsWith('image/') ? '🖼' : '📎'}
            </span>
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {file.name}
            </span>
          </div>
          <button
            onClick={() => setFile(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-2 items-end">
          {/* Attach buttons */}
          <div className="flex gap-1">
            <label className="cursor-pointer p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors">
              <span className="text-lg">📎</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
                accept=".pdf,.doc,.docx,.txt,.zip"
              />
            </label>
            <label className="cursor-pointer p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors">
              <span className="text-lg">🖼</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
              />
            </label>
          </div>

          {/* Text input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "AI is typing..." : "Type a message..."}
            disabled={isLoading}
            className="flex-1 resize-none px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-[120px]"
            rows={1}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 