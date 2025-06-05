export interface ChatPreviewData {
    name: string;
    message: string;
    unread: boolean;
    isAI?: boolean; 
    online?: boolean;
  }
  
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export interface ChatMessages {
  [chatId: string]: Message[];
}

export interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (name: string) => void;
  isAI?: boolean;
}