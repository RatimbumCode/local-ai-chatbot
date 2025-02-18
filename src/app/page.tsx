'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import MessageList from '@/components/MessageList';
import InputSection from '@/components/InputSection';

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
  const [darkMode, setDarkMode] = useState(true);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} items-center`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <MessageList messages={messages} loading={loading} darkMode={darkMode} />

      <InputSection
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        loading={loading}
        darkMode={darkMode}
        responseTime={responseTime}
      />
    </div>
  );
}
