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
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };


  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
      <div className="flex gap-2 items-end">
        {/* Attach buttons */}
        <div className="flex flex-col gap-1">
          <label className="cursor-pointer px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
            📎
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.doc,.docx,.txt,.zip"
            />
          </label>
          <label className="cursor-pointer px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
            🖼
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
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
          className="flex-1 resize-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={1}
        />

        {/* Send */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Attached file name */}
      {file && (
        <div className="text-sm text-gray-600 mt-2">
          Прикреплено: <strong>{file.name}</strong>
        </div>
      )}
    </form>
  );
}; 