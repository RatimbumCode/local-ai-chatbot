"use client";

import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response || "Error fetching response",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error fetching response" },
      ]);
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
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-700 text-white self-start"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
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
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
