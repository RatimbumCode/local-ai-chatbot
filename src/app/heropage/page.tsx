'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">CoolWebApp</h1>
          <button
            type="submit"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Welcome to the Future of Web Development
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build amazing applications with modern tools and technologies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'Responsive Design',
              description:
                'Your app looks great on all devices, from mobile to desktop.',
            },
            {
              title: 'Modern UI',
              description:
                'Clean and intuitive user interfaces built with Tailwind CSS.',
            },
            {
              title: 'Fast Performance',
              description: 'Optimized for speed and efficiency using Next.js.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
            Join thousands of developers who have already transformed their web
            development workflow.
          </p>
          <button
            type="button"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
}
