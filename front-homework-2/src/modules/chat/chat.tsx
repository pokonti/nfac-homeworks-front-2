import { useParams, useOutletContext } from "react-router";
import { MessageInput } from "../messages/message-input";
import { MessageList } from "../messages/message-list";
import type { Message, ChatMessages } from "../../shared/model/types";
import { getGeminiResponse } from "../../shared/services/gemini";
import { useMutation } from '@tanstack/react-query';

interface ChatContext {
  messages: ChatMessages;
  onNewMessage: (chatId: string, message: Message) => void;
}

export const Chat = () => {
  const { chatId } = useParams();
  const { messages, onNewMessage } = useOutletContext<ChatContext>();
  const { mutate: fetchAIResponse, isPending: isLoading } = useMutation({
    mutationFn: getGeminiResponse,
    onSuccess: (aiText) => {
      if (!chatId) return;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText || "Sorry, I couldn't generate a response.",
        sender: "other",
        timestamp: new Date(),
      };

      onNewMessage(chatId, aiMessage);
    },
    onError: (error) => {
      console.error("AI fetch error:", error);
    },
  });


  const handleSendMessage = (text: string) => {
    if (!chatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    onNewMessage(chatId, newMessage);

    // If this is an AI chat, fetch AI response
    if (chatId.startsWith("AI ")) {
      fetchAIResponse(text);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header: name + online */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 border-b">
        <h1 className="text-base sm:text-lg md:text-xl font-bold break-words">{chatId}</h1>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          <span className="text-sm text-gray-500">online</span>
        </div>
      </div>

      {/* Chat content */}
      <div className="flex-1 overflow-hidden bg-white flex flex-col">
        {/* Scrollable messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages[chatId || ""] || []} isLoading={isLoading} />
        </div>

        {/* Fixed message input */}
        <div className="sticky bottom-0 bg-white p-4">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
