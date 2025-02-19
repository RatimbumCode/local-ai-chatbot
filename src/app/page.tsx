'use client';

import { useState, useEffect } from 'react';
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
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : true;
    } catch (error) {
      console.error('Error parsing dark mode from localStorage.', error);
      return true;
    }
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSubmit = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    setLoading(true);
    setError(null);

    const startTime = Date.now();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedInput,
    };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          //model: 'deepseek-r1:14b',
          model: 'wizard-vicuna-uncensored:13b',
          messages: updatedMessages,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const endTime = Date.now();

      setResponseTime(endTime - startTime);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setError('Error fetching response. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Error fetching response.',
        },
      ]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => !prevMode);
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
        error={error}
      />
    </div>
  );
}
