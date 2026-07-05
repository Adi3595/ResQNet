import React from 'react';

export default function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold tracking-tighter">ResQNet</h1>
          <button onClick={onLaunch} className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
            Command Center
          </button>
        </nav>

        <main className="flex flex-col items-center text-center mt-32">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Intelligent Disaster Response
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl">
            A Multi-Agent System powered by Google ADK coordinating autonomous rescue operations, resource allocation, and risk prediction in real-time.
          </p>

          <button 
            onClick={onLaunch}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full text-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] transition transform hover:scale-105"
          >
            Launch Simulation Mode
          </button>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="glass-dark p-6 rounded-2xl text-left">
              <h3 className="text-2xl font-bold mb-2">12 Specialized Agents</h3>
              <p className="text-gray-400">Weather, Infrastructure, Medical, and more collaborating autonomously.</p>
            </div>
            <div className="glass-dark p-6 rounded-2xl text-left">
              <h3 className="text-2xl font-bold mb-2">Real-Time Data</h3>
              <p className="text-gray-400">Integrated MCP servers fetching live weather and routing data.</p>
            </div>
            <div className="glass-dark p-6 rounded-2xl text-left">
              <h3 className="text-2xl font-bold mb-2">Simulation Engine</h3>
              <p className="text-gray-400">Emulate complex disaster scenarios and monitor AI decision making.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
