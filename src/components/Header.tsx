import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  models: Model[];
  selectedModel: Model | null;
  setSelectedModel: (model: Model | null) => void;
}

interface Model {
  name: string;
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  models,
  selectedModel,
  setSelectedModel,
}) => {
  return (
    <header
      className={`p-4 shadow-sm w-full flex justify-between items-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="w-3/4">
        <h1
          className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          {selectedModel?.title || 'Default Title'}
        </h1>
        <h2
          className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {selectedModel?.description || 'Default Description'}
        </h2>
      </div>
      <div className="flex items-center">
        <select
          value={selectedModel?.name || ''}
          onChange={(e) => {
            const model = models.find((m) => m.name === e.target.value);
            setSelectedModel(model || null);
          }}
          className="mr-4"
        >
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          {darkMode ? 'Light Mode 🌞' : 'Dark Mode 🌚'}
        </button>
      </div>
    </header>
  );
};

export default Header;
