import React from 'react';

interface InputSectionProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: () => void;
  loading: boolean;
  darkMode: boolean;
  responseTime: number | null;
  error: string | null;
}

const formatResponseTime = (time: number) => {
  const seconds = Math.floor(time / 1000);
  const milliseconds = time % 1000;
  return `${seconds}.${milliseconds} seconds`;
};

const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  handleSubmit,
  loading,
  darkMode,
  responseTime,
  error,
}) => {
  return (
    <div className={`p-4 w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex space-x-4 items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={loading ? 'Processing' : 'Type your message...'}
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
            className={`text-base mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Response time: {formatResponseTime(responseTime)}
          </p>
        )}

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default InputSection;
