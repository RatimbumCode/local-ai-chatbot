import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
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
  );
};

export default Header;
