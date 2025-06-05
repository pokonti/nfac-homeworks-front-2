import { useState } from 'react';
import type { NewChatModalProps } from '../../shared/model/types';


export const NewChatModal = ({ isOpen, onClose, onCreateChat, isAI = false }: NewChatModalProps) => {
  const [chatName, setChatName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatName.trim()) {
      onCreateChat(chatName.trim());
      setChatName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          {isAI ? 'Новый чат с ИИ' : 'Новый чат'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder={isAI ? "Введите имя ИИ-ассистента" : "Введите имя собеседника"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 