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

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Chat with DeepSeek-R1
        </h1>
        <h2 className="text-lg font-bold text-gray-700">
          Model | deepseek-r1:14b 9GB - Ollama
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-screen-xl p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 border border-gray-200'}`}
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
              className={`max-w-screen-xl p-4 rounded-lg bg-gray-100 border border-gray-200`}
            >
              <p className="text-sm animate-pulse text-blue-400">Thinking</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Send'}
          </button>
        </div>

        {responseTime !== null && (
          <p className="text-sm text-gray-600 mt-2">
            Response time: {formatResponseTime(responseTime)}
          </p>
        )}
      </div>
    </div>
  );
}
