import React from 'react';
import Scene from './components/Scene';
import { Pen } from 'lucide-react';

function App() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
      <div className="absolute top-0 left-0 w-full p-4 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-500 bg-opacity-20 p-2 rounded-lg backdrop-blur-sm">
                <Pen className="w-6 sm:w-8 h-6 sm:h-8 text-indigo-400" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Daniyal's 3D Blog</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-xs sm:text-sm text-gray-300 bg-black bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                Drag to rotate • Scroll to zoom
              </p>
              <button className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Scene />
    </div>
  );
}

export default App;