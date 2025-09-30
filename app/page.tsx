'use client';

import { useState } from 'react';

export default function Home() {
  const [subject, setSubject] = useState('');
  const [menu, setMenu] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateMenu = async () => {
    if (!subject.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: subject.trim() }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMenu(data.menu);
      } else {
        setError(data.error || 'Failed to generate menu');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          🍽️ MediTouch Menu Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Generate personalized 3-course menus for any occasion
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter a cuisine or theme (e.g., Italian, seafood, vegan)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && generateMenu()}
            />
            <button
              onClick={generateMenu}
              disabled={loading || !subject.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Menu'}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {menu && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Generated Menu
            </h2>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700">
                {menu}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
