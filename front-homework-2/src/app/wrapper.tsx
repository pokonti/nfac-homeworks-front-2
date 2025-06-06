import { NavLink, Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { ChatPreviewData, Message, ChatMessages } from "../shared/model/types";
import { NewChatModal } from "../modules/chat/new-chat-modal";

export const Wrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessages>({});
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isNewAIChatModalOpen, setIsNewAIChatModalOpen] = useState(false);
  const [chats, setChats] = useState<ChatPreviewData[]>([]);
  const navigate = useNavigate();

  // Initialize with some default chats
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    const storedChats = localStorage.getItem("chatList");
  
    if (storedMessages) {
      const parsed: ChatMessages = JSON.parse(storedMessages);
  
      // Convert timestamps back to Date objects
      Object.keys(parsed).forEach(chatId => {
        parsed[chatId] = parsed[chatId].map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      });
  
      setMessages(parsed);
    } else {
      const initialMessages: ChatMessages = {
        "Анна": [],
        "Игорь": [],
        "AI Coach": [],
        "AI Psychologist": []
      };
      setMessages(initialMessages);
      localStorage.setItem("chatMessages", JSON.stringify(initialMessages));
    }
  
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);

  const handleCreateChat = (name: string, isAI: boolean = false) => {
    setMessages(prev => {
      const updated = {
        ...prev,
        [name]: []
      };
      localStorage.setItem("chatMessages", JSON.stringify(updated));
      return updated;
    });

    const newChat: ChatPreviewData = {
      name,
      message: "Новый чат создан",
      unread: false,
      isAI,
    };

    setChats(prev => {
      const updated = [...prev, newChat];
      localStorage.setItem("chatList", JSON.stringify(updated));
      return updated;
    });

    navigate(`/chat/${encodeURIComponent(name)}`);
  };

  const handleNewMessage = (chatId: string, message: Message) => {
    setMessages(prev => {
      const updated = {
        ...prev,
        [chatId]: [...(prev[chatId] || []), message]
      };
      localStorage.setItem("chatMessages", JSON.stringify(updated));
      return updated;
    });
  };

  const userChats: ChatPreviewData[] = Object.entries(messages)
    .filter(([name]) => !name.startsWith('AI '))
    .map(([name, msgs]) => ({
      name,
      message: msgs.length ? msgs[msgs.length - 1].text : "Нет сообщений",
      unread: false
    }));

  const aiChats: ChatPreviewData[] = Object.entries(messages)
    .filter(([name]) => name.startsWith('AI '))
    .map(([name, msgs]) => ({
      name,
      message: msgs.length ? msgs[msgs.length - 1].text : "Нет сообщений",
      unread: false,
      isAI: true
    }));

  const filteredUserChats = userChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAiChats = aiChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <article className="w-screen min-h-screen flex">
      <aside className="w-[300px] bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Поиск по чатам"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div>
          <h2 className="text-sm text-gray-500 mb-2">Люди</h2>
          {filteredUserChats.map((chat, index) => (
            <ChatPreview key={`user-${index}`} {...chat} />
          ))}
        </div>

        <div>
          <h2 className="text-sm text-gray-500 mt-4 mb-2">ИИ-ассистенты</h2>
          {filteredAiChats.map((chat, index) => (
            <ChatPreview key={`ai-${index}`} {...chat} />
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Новый чат
          </button>
          <button
            onClick={() => setIsNewAIChatModalOpen(true)}
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Чат с ИИ
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-4">
        <Outlet context={{ messages, onNewMessage: handleNewMessage }} />
      </main>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={(name) => handleCreateChat(name)}
      />
      <NewChatModal
        isOpen={isNewAIChatModalOpen}
        onClose={() => setIsNewAIChatModalOpen(false)}
        onCreateChat={(name) => handleCreateChat(`AI ${name}`, true)}
        isAI={true}
      />
    </article>
  );
};

// ChatPreview component
const ChatPreview = ({ name, message, unread }: ChatPreviewData) => (
  <NavLink
    to={`/chat/${encodeURIComponent(name)}`}
    className="block p-2 rounded hover:bg-gray-100"
  >
    <div className="flex justify-between items-center">
      <span className="font-medium">{name}</span>
      {unread && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">•</span>}
    </div>
    <p className="text-sm text-gray-600 truncate">{message}</p>
  </NavLink>
);