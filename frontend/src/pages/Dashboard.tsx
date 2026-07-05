import React, { useState } from 'react';
import AgentChat from '../components/AgentChat';
// Map component would be imported here

export default function Dashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'map' | 'agents'>('map');

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-dark border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">ResQNet</h1>
          <button onClick={onBack} className="text-xs text-gray-400 hover:text-white">Exit</button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('map')}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'map' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            Live Map
          </button>
          <button 
            onClick={() => setActiveTab('agents')}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'agents' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            Agent Network
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 transition">
            Incidents
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 transition">
            Resources
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-300">Simulation Controls</h4>
            <button className="w-full py-2 bg-red-600 hover:bg-red-500 rounded text-sm font-bold shadow-[0_0_10px_rgba(220,38,38,0.5)]">
              Trigger Earthquake
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 glass-dark border-b border-gray-800 flex items-center justify-between px-6 z-10">
          <div className="flex items-center space-x-4">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">System Online • 12 Agents Active</span>
          </div>
          <div className="text-sm text-gray-400">
            Command Center Operator
          </div>
        </header>

        <div className="flex-1 relative bg-gray-950 p-6 overflow-auto">
          {activeTab === 'map' ? (
            <div className="w-full h-full glass-dark rounded-xl border border-gray-800 flex items-center justify-center">
               {/* Map placeholder */}
               <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Interactive Map</h2>
                  <p className="text-gray-400">Leaflet Map Integration goes here</p>
               </div>
            </div>
          ) : (
            <AgentChat />
          )}
        </div>
      </main>
    </div>
  );
}
