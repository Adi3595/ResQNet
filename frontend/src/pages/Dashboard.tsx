import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { GlassPanel } from '../components/ui/GlassPanel';
import { ShieldAlert, Activity, HeartPulse, Building2, Cross, Waves, Network, Flame, Droplets, ListOrdered, Satellite, ShieldCheck, Map as MapIcon, Users, Package, MessageSquare, AlertTriangle, Zap, Cpu, Loader2, AlertCircle } from 'lucide-react';
import { AgentChat } from '../components/AgentChat';

type Incident = {
  id: number;
  lat: number;
  lng: number;
  type: string;
  severity: string;
  latitude: number;
  longitude: number;
};

export default function Dashboard() {
  const [activeView, setActiveView] = useState<'map' | 'medical' | 'shelters'>('map');
  const [showFlood, setShowFlood] = useState(false);
  const [showFire, setShowFire] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/incidents/`)
      .then(res => {
        if (!res.ok) throw new Error("Telemetry Feed Disconnected");
        return res.json();
      })
      .then(data => {
        setIncidents(data);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to fetch live incidents:", err);
        setError("CRITICAL: Failed to establish secure connection to Neural Swarm Telemetry.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-screen w-screen bg-obsidian text-warm-white overflow-hidden font-sans flex flex-col">
      {/* Top Navbar */}
      <motion.nav 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="h-16 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between px-6 z-50 shrink-0 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="ResQNet Logo" className="w-6 h-6 object-contain" />
          <h1 className="text-lg font-display font-bold tracking-wide">Operations Control</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => {
              alert("LIVE MAP ENGAGED: Please click anywhere on the global map to trigger a dynamic disaster at that exact location!");
            }}
            className="flex items-center space-x-2 text-sm font-bold bg-rescue-red/10 text-rescue-red hover:bg-rescue-red/20 px-4 py-1.5 rounded border border-rescue-red/30 transition-colors cursor-pointer neon-glow-red"
          >
            <Zap className="w-4 h-4" />
            <span>SIMULATE DISASTER</span>
          </button>
          
          <span className="flex items-center space-x-2 text-sm text-steel-gray bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="font-medium text-xs">Global Network Online</span>
          </span>
        </div>
      </motion.nav>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar Menu */}
        <motion.div 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-20 lg:w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col items-center lg:items-start py-6 z-40 shrink-0"
        >
          <div className="px-6 mb-6 hidden lg:block text-xs font-semibold text-steel-gray uppercase tracking-wider">Active Resources</div>
          
          <div className="w-full space-y-2 px-2">
            <button 
              onClick={() => setActiveView('map')}
              className={`w-full flex items-center p-3 transition-all rounded-lg cursor-pointer ${activeView === 'map' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-steel-gray hover:text-warm-white hover:bg-zinc-800 border border-transparent'}`}
            >
              <Activity className="w-5 h-5 shrink-0" />
              <span className="ml-3 hidden lg:block font-medium text-sm">Live Map</span>
            </button>
            <button 
              onClick={() => setActiveView('medical')}
              className={`w-full flex items-center p-3 transition-all rounded-lg cursor-pointer ${activeView === 'medical' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-steel-gray hover:text-warm-white hover:bg-zinc-800 border border-transparent'}`}
            >
              <HeartPulse className="w-5 h-5 shrink-0" />
              <span className="ml-3 hidden lg:block font-medium text-sm">Medical Units</span>
            </button>
            <button 
              onClick={() => setActiveView('shelters')}
              className={`w-full flex items-center p-3 transition-all rounded-lg cursor-pointer ${activeView === 'shelters' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-steel-gray hover:text-warm-white hover:bg-zinc-800 border border-transparent'}`}
            >
              <Building2 className="w-5 h-5 shrink-0" />
              <span className="ml-3 hidden lg:block font-medium text-sm">Evac Shelters</span>
            </button>
          </div>
          
          {/* Agent Roster */}
          <div className="mt-auto px-4 hidden lg:block w-full">
            <div className="text-xs font-semibold text-steel-gray uppercase tracking-wider mb-4 px-2">12-Agent Swarm</div>
            <div className="space-y-2.5 bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-sm max-h-[40vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center text-xs font-medium text-warm-white"><Cpu className="w-3.5 h-3.5 mr-3 text-indigo-400" /> Commander Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Satellite className="w-3.5 h-3.5 mr-3 text-teal-500" /> Satellite Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Waves className="w-3.5 h-3.5 mr-3 text-teal-400" /> Weather Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Zap className="w-3.5 h-3.5 mr-3 text-amber-400" /> Infrastructure Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><MapIcon className="w-3.5 h-3.5 mr-3 text-steel-gray" /> Road Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Building2 className="w-3.5 h-3.5 mr-3 text-amber-500" /> Shelter Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Cross className="w-3.5 h-3.5 mr-3 text-rescue-red" /> Medical Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Users className="w-3.5 h-3.5 mr-3 text-indigo-300" /> Volunteer Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Package className="w-3.5 h-3.5 mr-3 text-amber-600" /> Supply Chain Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><MessageSquare className="w-3.5 h-3.5 mr-3 text-teal-300" /> Social Media Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><AlertTriangle className="w-3.5 h-3.5 mr-3 text-rescue-red" /> Risk Prediction Agent</div>
              <div className="flex items-center text-xs font-medium text-warm-white"><Activity className="w-3.5 h-3.5 mr-3 text-teal-500" /> Decision Intel Agent</div>
            </div>
          </div>
        </motion.div>

        {/* Center Panel - The View */}
        <div className="flex-1 relative bg-obsidian flex">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center bg-obsidian text-steel-gray space-y-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-zinc-800 rounded-full animate-spin"></div>
                  <div className="w-24 h-24 border-4 border-teal-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent border-r-transparent border-b-transparent"></div>
                  <Loader2 className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-500 animate-pulse" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-warm-white mb-2">Establishing Satellite Uplink...</h2>
                  <p className="text-sm">Connecting to global incident database</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center bg-obsidian text-steel-gray space-y-6 p-10"
              >
                <AlertCircle className="w-20 h-20 text-rescue-red animate-pulse" />
                <div className="text-center max-w-lg">
                  <h2 className="text-2xl font-display font-bold text-rescue-red mb-3">CONNECTION REFUSED</h2>
                  <p className="text-sm text-warm-white/70 mb-6">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-rescue-red/10 text-rescue-red border border-rescue-red/20 rounded-md font-medium hover:bg-rescue-red/20 transition-all cursor-pointer"
                  >
                    Reboot Terminal
                  </button>
                </div>
              </motion.div>
            ) : activeView === 'map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 relative"
              >
                <Map
                  initialViewState={{ longitude: -80.1918, latitude: 25.7617, zoom: 11 }}
                  mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                  cursor="crosshair"
                  onClick={(e) => {
                    const { lng, lat } = e.lngLat;
                    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                    fetch(`${apiUrl}/api/incidents/`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        title: 'Dynamic Map Event',
                        type: 'Category 5 Hurricane',
                        severity: 'Critical',
                        description: `Massive hurricane landfall at dynamic map coordinates.`,
                        latitude: lat,
                        longitude: lng,
                        status: 'Active'
                      })
                    }).then(res => res.json()).then(newIncident => {
                      if (newIncident) {
                        setIncidents(prev => [...prev, newIncident]);
                      }
                    });
                  }}
                >
                  <NavigationControl position="bottom-right" />
                  
                  {Array.isArray(incidents) && incidents.map(inc => (
                    <Marker key={inc.id} longitude={inc.longitude || inc.lng} latitude={inc.latitude || inc.lat}>
                      <div className="relative flex h-8 w-8 items-center justify-center cursor-pointer group">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${inc.severity === 'Critical' ? 'bg-rescue-red' : 'bg-amber-500'}`}></span>
                        <span className={`relative inline-flex rounded-full h-4 w-4 ${inc.severity === 'Critical' ? 'bg-rescue-red' : 'bg-amber-500'} shadow-lg border-2 border-obsidian`}></span>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-md text-xs whitespace-nowrap z-50 shadow-xl pointer-events-none">
                          <span className="font-semibold text-warm-white">{inc.type}</span>
                        </div>
                      </div>
                    </Marker>
                  ))}
                </Map>
                
                {/* Map Overlays and Priority List */}
                <div className="absolute top-6 left-6 z-20 flex flex-col space-y-4 pointer-events-none">
                  {/* Status */}
                  <GlassPanel className="p-4 bg-zinc-900/90 backdrop-blur-xl rounded-xl shadow-lg border-zinc-800 w-64 pointer-events-auto">
                    <h3 className="font-display text-xs text-steel-gray uppercase font-semibold mb-3">Map Overlays</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setShowFlood(!showFlood)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all border ${showFlood ? 'bg-teal-500/20 border-teal-500 text-warm-white' : 'bg-zinc-800 border-zinc-700 text-steel-gray hover:bg-zinc-700'}`}
                      >
                        <span className="flex items-center"><Droplets className="w-4 h-4 mr-2 text-teal-400" /> Flood Risk</span>
                        <div className={`w-8 h-4 rounded-full flex items-center p-0.5 ${showFlood ? 'bg-teal-500' : 'bg-zinc-600'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${showFlood ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                      </button>
                      <button 
                        onClick={() => setShowFire(!showFire)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all border ${showFire ? 'bg-rescue-red/20 border-rescue-red text-warm-white' : 'bg-zinc-800 border-zinc-700 text-steel-gray hover:bg-zinc-700'}`}
                      >
                        <span className="flex items-center"><Flame className="w-4 h-4 mr-2 text-rescue-red" /> Wildfire Zones</span>
                        <div className={`w-8 h-4 rounded-full flex items-center p-0.5 ${showFire ? 'bg-rescue-red' : 'bg-zinc-600'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${showFire ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                      </button>
                    </div>
                  </GlassPanel>

                  {/* Priority List Output */}
                  <GlassPanel className="p-4 bg-zinc-900/90 backdrop-blur-xl rounded-xl shadow-lg border-zinc-800 w-64 pointer-events-auto">
                    <h3 className="font-display text-xs text-steel-gray uppercase font-semibold mb-3 flex items-center">
                      <ListOrdered className="w-4 h-4 mr-2 text-indigo-400" />
                      Priority Action List
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-zinc-800 p-2 rounded border border-zinc-700">
                        <span className="text-xs font-bold text-rescue-red block mb-1">Priority 1</span>
                        <p className="text-xs text-warm-white leading-relaxed">Dispatch airlift to collapsed bridge on Route 9.</p>
                      </div>
                      <div className="bg-zinc-800 p-2 rounded border border-zinc-700">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-amber-500">Priority 2</span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-bold">{Array.isArray(incidents) ? incidents.length : 0} Active</span>
                        </div>
                        <p className="text-xs text-warm-white leading-relaxed">Route 500 water rations to Shelter 12.</p>
                      </div>
                      <div className="bg-zinc-800 p-2 rounded border border-zinc-700">
                        <span className="text-xs font-bold text-teal-400 block mb-1">Priority 3</span>
                        <p className="text-xs text-warm-white leading-relaxed">Alert hospital regarding incoming trauma patients.</p>
                      </div>
                    </div>
                  </GlassPanel>
                </div>
              </motion.div>
            )}

            {activeView !== 'map' && (
              <motion.div 
                key="other"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-10 flex flex-col items-center justify-center text-center"
              >
                <Network className="w-16 h-16 text-zinc-700 mb-6" />
                <h2 className="text-3xl font-display font-bold mb-4 text-warm-white capitalize">{activeView} Grid Offline</h2>
                <p className="text-steel-gray max-w-md">The selected telemetry view is currently offline or awaiting satellite uplink. Please switch back to the Live Map.</p>
                <button 
                  onClick={() => setActiveView('map')}
                  className="mt-8 px-6 py-2 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-md font-medium hover:bg-teal-500/20 transition-all cursor-pointer"
                >
                  Return to Live Map
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Panel - Operations Log (AgentChat) */}
          <div className="w-96 border-l border-zinc-800 bg-zinc-900/90 hidden xl:flex flex-col relative z-20 shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.5)]">
            <AgentChat />
          </div>
        </div>
      </div>
    </div>
  );
}
