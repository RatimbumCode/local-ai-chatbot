'use client';

import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('Waiting for input...');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/no-retain-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponse(data.response || 'Error fetching response');
    } catch (error) {
      setResponse('Error fetching response');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-3xl flex flex-col h-[90vh] p-6 rounded-lg shadow-lg bg-[#1e1e1e]">
        <h1 className="text-2xl font-bold mb-4 text-center">Ollama AI Chat</h1>
        <h2 className="text-xl text-stone-200 font-bold mb-4 text-center">
          Model - deepseek-r1:14b 9GB
        </h2>
        <div className="flex-grow overflow-y-auto p-4 bg-[#2a2a2a] rounded-lg mb-4 text-white">
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
        <div className="flex gap-2">
          <textarea
            className="flex-grow p-3 rounded-lg bg-[#333] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt..."
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
