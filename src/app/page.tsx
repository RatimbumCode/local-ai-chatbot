'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: string;
  content: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const startTime = Date.now();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      const endTime = Date.now();

      setResponseTime(endTime - startTime);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response || 'Error fetching response',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Error fetching response',
        },
      ]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatResponseTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds} seconds`;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} items-center`}
    >
      <div
        className={`p-4 shadow-sm w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1
              className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Chat with DeepSeek-R1
            </h1>
            <h2
              className={`text-lg font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Model | deepseek-r1:14b 9GB - Ollama
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {darkMode ? 'Light Mode 🌞' : 'Dark Mode 🌚'}
          </button>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 w-full max-w-screen-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-screen-xl p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-50 border border-gray-200'}`}
            >
              {message.role === 'assistant' ? (
                <ReactMarkdown className="text-sm">
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className={`max-w-screen-xl p-4 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-50 border border-gray-200'}`}
            >
              <p
                className={`text-sm animate-pulse ${darkMode ? 'bg-gray-600 text-blue-200' : 'bg-gray-50 text-blue-800'}`}
              >
                Thinking ✨
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex space-x-4 items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500' : 'focus:ring-blue-500'} resize-none h-24`}
              disabled={loading}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className={`w-[110px] h-12 px-4 py-2 ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'} rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing' : 'Send'}
            </button>
          </div>

          {responseTime !== null && (
            <p
              className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Response time: {formatResponseTime(responseTime)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
