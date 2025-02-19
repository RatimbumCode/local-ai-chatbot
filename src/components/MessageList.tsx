import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: string;
  content: string;
}

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  darkMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  loading,
  darkMode,
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className={`flex-1 overflow-y-auto p-4 space-y-4 w-full max-w-screen-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-screen-xl p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 border border-gray-200'}`}
          >
            {message.role === 'assistant' ? (
              <ReactMarkdown className="text-base">
                {message.content}
              </ReactMarkdown>
            ) : (
              <p className="text-base">{message.content}</p>
            )}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div
            className={`max-w-screen-xl p-4 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 border border-gray-200'}`}
          >
            <p
              className={`text-base animate-pulse ${darkMode ? 'bg-gray-700 text-blue-200' : 'bg-gray-50 text-blue-800'}`}
            >
              Thinking ✨
            </p>
          </div>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
