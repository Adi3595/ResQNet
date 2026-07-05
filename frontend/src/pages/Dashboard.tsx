import React from 'react';
import { motion } from 'framer-motion';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { GlassPanel } from '../components/ui/GlassPanel';
import { ShieldAlert, Activity, HeartPulse, Building2, Cross, Waves } from 'lucide-react';
import { AgentChat } from '../components/AgentChat';

const ACTIVE_INCIDENTS = [
  { id: 1, lat: 37.7749, lng: -122.4194, type: 'Earthquake', severity: 'High' },
  { id: 2, lat: 34.0522, lng: -118.2437, type: 'Wildfire', severity: 'Critical' },
  { id: 3, lat: 29.7604, lng: -95.3698, type: 'Flood', severity: 'Medium' }
];

export default function Dashboard() {
  return (
    <div className="h-screen w-screen bg-navy-950 text-warm-white overflow-hidden font-sans flex flex-col">
      {/* Top Navbar */}
      <motion.nav 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="h-14 border-b border-storm-700 bg-navy-900 flex items-center justify-between px-6 z-50 shrink-0 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-5 h-5 text-medical-cyan" />
          <h1 className="text-lg font-display font-semibold tracking-wide">Operations Control</h1>
        </div>
        <div className="flex space-x-6">
          <span className="flex items-center space-x-2 text-sm text-steel-gray">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-cyan"></span>
            </span>
            <span>Global Network Online</span>
          </span>
        </div>
      </motion.nav>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar Menu - Resources */}
        <motion.div 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-20 lg:w-64 border-r border-storm-700 bg-navy-900 flex flex-col items-center lg:items-start py-6 z-40 shrink-0"
        >
          <div className="px-6 mb-6 hidden lg:block text-xs font-semibold text-steel-gray uppercase tracking-wider">Active Resources</div>
          
          <div className="w-full space-y-1">
            <button className="w-full flex items-center p-3 lg:px-6 transition-colors border-l-4 border-medical-cyan bg-storm-800 text-warm-white">
              <Activity className="w-5 h-5 shrink-0 text-medical-cyan" />
              <span className="ml-3 hidden lg:block font-medium text-sm">Live Map</span>
            </button>
            <button className="w-full flex items-center p-3 lg:px-6 transition-colors border-l-4 border-transparent text-steel-gray hover:text-warm-white hover:bg-storm-800">
              <HeartPulse className="w-5 h-5 shrink-0" />
              <span className="ml-3 hidden lg:block font-medium text-sm">Medical Units</span>
            </button>
            <button className="w-full flex items-center p-3 lg:px-6 transition-colors border-l-4 border-transparent text-steel-gray hover:text-warm-white hover:bg-storm-800">
              <Building2 className="w-5 h-5 shrink-0" />
              <span className="ml-3 hidden lg:block font-medium text-sm">Evac Shelters</span>
            </button>
          </div>
          
          {/* Agent Roster */}
          <div className="mt-auto px-6 hidden lg:block w-full">
            <div className="text-xs font-semibold text-steel-gray uppercase tracking-wider mb-4">Deployed Agents</div>
            <div className="space-y-3 bg-storm-800 p-4 rounded border border-storm-700">
              <div className="flex items-center text-sm text-warm-white"><Waves className="w-4 h-4 mr-3 text-medical-cyan" /> Weather AI</div>
              <div className="flex items-center text-sm text-warm-white"><Cross className="w-4 h-4 mr-3 text-rescue-red" /> Medical AI</div>
              <div className="flex items-center text-sm text-warm-white"><Building2 className="w-4 h-4 mr-3 text-emergency-orange" /> Infra AI</div>
            </div>
          </div>
        </motion.div>

        {/* Center Panel - The Map */}
        <div className="flex-1 relative bg-navy-950 flex">
          <div className="flex-1 relative">
            <Map
              initialViewState={{ longitude: -98.5795, latitude: 39.8283, zoom: 4 }}
              mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            >
              <NavigationControl position="bottom-right" />
              
              {ACTIVE_INCIDENTS.map(inc => (
                <Marker key={inc.id} longitude={inc.lng} latitude={inc.lat}>
                  <div className="relative flex h-6 w-6 items-center justify-center cursor-pointer group">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${inc.severity === 'Critical' ? 'bg-rescue-red' : 'bg-emergency-orange'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${inc.severity === 'Critical' ? 'bg-rescue-red' : 'bg-emergency-orange'} shadow-md`}></span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-navy-900 border border-storm-700 px-3 py-1 rounded text-xs whitespace-nowrap z-50 shadow-lg">
                      <span className="font-semibold text-warm-white">{inc.type}</span>
                    </div>
                  </div>
                </Marker>
              ))}
            </Map>
            
            {/* Map Overlay Stats */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex space-x-4">
              <GlassPanel className="p-3 bg-navy-900/90 backdrop-blur-md rounded shadow-md border-storm-700">
                <h3 className="font-display text-xs text-steel-gray uppercase font-semibold mb-1">Active Crises</h3>
                <div className="text-2xl font-bold text-emergency-orange">3</div>
              </GlassPanel>
            </div>
          </div>

          {/* Right Panel - Operations Log (AgentChat) */}
          <div className="w-96 border-l border-storm-700 bg-navy-900 hidden xl:flex flex-col relative z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)]">
            <AgentChat />
          </div>
        </div>
      </div>
    </div>
  );
}
