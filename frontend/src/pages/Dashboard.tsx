import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { GlassPanel } from '../components/ui/GlassPanel';
import { ShieldAlert, Activity, BrainCircuit, Waves, Building2, Cross, Satellite } from 'lucide-react';
import { AgentChat } from '../components/AgentChat';

// Mock live data for the dashboard
const ACTIVE_INCIDENTS = [
  { id: 1, lat: 37.7749, lng: -122.4194, type: 'Earthquake', severity: 'High' },
  { id: 2, lat: 34.0522, lng: -118.2437, type: 'Wildfire', severity: 'Critical' },
  { id: 3, lat: 29.7604, lng: -95.3698, type: 'Flood', severity: 'Medium' }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'map' | 'agents' | 'analytics'>('map');

  return (
    <div className="h-screen w-screen bg-space-950 text-gray-200 overflow-hidden font-sans flex flex-col">
      {/* Top Navbar */}
      <motion.nav 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="h-16 border-b border-white/10 bg-space-900/80 backdrop-blur-xl flex items-center justify-between px-6 z-50 shrink-0"
      >
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-6 h-6 text-sky-blue" />
          <h1 className="text-xl font-display font-bold tracking-widest text-glow">RESQNET // COMMAND</h1>
        </div>
        <div className="flex space-x-6">
          <span className="flex items-center space-x-2 text-sm text-sky-blue">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-blue"></span>
            </span>
            <span>SYSTEM ONLINE</span>
          </span>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar Menu */}
        <motion.div 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-20 lg:w-64 border-r border-white/5 bg-space-900/50 backdrop-blur-md flex flex-col items-center lg:items-start py-6 z-40 shrink-0"
        >
          <div className="px-6 mb-8 hidden lg:block text-xs font-bold text-gray-500 uppercase tracking-widest">Modules</div>
          
          <button onClick={() => setActiveTab('map')} className={`w-full flex items-center p-4 lg:px-6 transition-all border-l-2 ${activeTab === 'map' ? 'border-sky-blue bg-sky-blue/10 text-sky-blue' : 'border-transparent text-gray-400 hover:text-white'}`}>
            <Activity className="w-6 h-6 shrink-0" />
            <span className="ml-4 hidden lg:block font-display tracking-wider text-sm">Global Map</span>
          </button>
          
          <button onClick={() => setActiveTab('agents')} className={`w-full flex items-center p-4 lg:px-6 transition-all border-l-2 ${activeTab === 'agents' ? 'border-sky-blue bg-sky-blue/10 text-sky-blue' : 'border-transparent text-gray-400 hover:text-white'}`}>
            <BrainCircuit className="w-6 h-6 shrink-0" />
            <span className="ml-4 hidden lg:block font-display tracking-wider text-sm">Neural Agents</span>
          </button>
          
          {/* Agent Roster */}
          <div className="mt-auto px-6 hidden lg:block w-full">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Active Swarm</div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300"><Waves className="w-4 h-4 mr-2 text-sky-blue" /> Weather Agent</div>
              <div className="flex items-center text-sm text-gray-300"><Cross className="w-4 h-4 mr-2 text-pastel-blue" /> Medical Agent</div>
              <div className="flex items-center text-sm text-gray-300"><Building2 className="w-4 h-4 mr-2 text-pastel-yellow" /> Infra Agent</div>
              <div className="flex items-center text-sm text-gray-300"><Satellite className="w-4 h-4 mr-2 text-gray-400" /> Comms Agent</div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Center Panel */}
        <div className="flex-1 relative">
          {/* Background Map */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${activeTab === 'map' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <Map
              initialViewState={{
                longitude: -98.5795,
                latitude: 39.8283,
                zoom: 3.5
              }}
              mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
              interactive={activeTab === 'map'}
            >
              <NavigationControl position="bottom-right" />
              
              {ACTIVE_INCIDENTS.map(inc => (
                <Marker key={inc.id} longitude={inc.lng} latitude={inc.lat}>
                  <div className="relative flex h-8 w-8 items-center justify-center cursor-pointer group">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${inc.severity === 'Critical' ? 'bg-pastel-blue' : 'bg-pastel-yellow'}`}></span>
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${inc.severity === 'Critical' ? 'bg-pastel-blue' : 'bg-pastel-yellow'}`}></span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-space-900 border border-white/10 px-3 py-1 rounded text-xs whitespace-nowrap z-50">
                      <span className="font-bold text-white">{inc.type}</span>
                    </div>
                  </div>
                </Marker>
              ))}
            </Map>
            
            {/* Map Overlay Stats */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
              <GlassPanel className="p-4 bg-space-900/80 backdrop-blur-md">
                <h3 className="font-display text-sm tracking-widest text-sky-blue mb-1">TACTICAL OVERVIEW</h3>
                <div className="text-3xl font-light">3 <span className="text-sm text-gray-400">ACTIVE ZONES</span></div>
              </GlassPanel>
            </div>
          </div>

          {/* AI Neural Network Panel */}
          <div className={`absolute inset-0 bg-space-950 p-6 overflow-y-auto transition-opacity duration-500 ${activeTab === 'agents' ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="max-w-4xl mx-auto h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-8 shrink-0">
                <BrainCircuit className="w-8 h-8 text-sky-blue" />
                <h2 className="text-3xl font-display font-bold">Neural Reasoning Stream</h2>
              </div>
              
              <GlassPanel glow className="flex-1 flex flex-col p-0 bg-space-900/30 overflow-hidden min-h-0">
                <AgentChat />
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
