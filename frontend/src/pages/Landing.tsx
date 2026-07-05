import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Globe } from '../components/3d/Globe';
import { ShieldAlert, Activity, Network } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';

export default function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-navy-950 text-warm-white relative overflow-hidden font-sans">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <Globe />
        </Canvas>
      </div>

      {/* Clean gradient fade instead of harsh radial */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-navy-950/40 via-navy-950/60 to-navy-950" />

      <div className="relative z-10 container mx-auto px-6 py-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center mb-16"
        >
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 text-medical-cyan" />
            <h1 className="text-2xl font-display font-bold tracking-tight">ResQNet</h1>
          </div>
          <button 
            onClick={onLaunch} 
            className="px-6 py-2 rounded border border-storm-700 bg-storm-800 hover:bg-storm-700 text-warm-white transition-all duration-300 font-medium text-sm shadow-sm cursor-pointer"
          >
            Access Operations
          </button>
        </motion.nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-medical-cyan/30 bg-medical-cyan/10 text-medical-cyan text-xs font-semibold tracking-wide uppercase"
          >
            <Activity className="w-4 h-4" />
            <span>Live Coordination Active</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl font-display font-semibold tracking-tight mb-6 leading-tight text-warm-white"
          >
            AI Coordination for Faster <br /> <span className="text-medical-cyan">Disaster Response</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-steel-gray mb-12 max-w-2xl font-light leading-relaxed"
          >
            Multi-agent intelligence helping emergency teams and humanitarian organizations make life-saving decisions in real time.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLaunch}
            className="px-8 py-4 bg-medical-cyan text-navy-950 font-semibold rounded shadow-lg text-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Launch Command Center</span>
          </motion.button>
          
          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          >
            <GlassPanel className="text-left">
              <Network className="w-6 h-6 text-medical-cyan mb-4" />
              <h3 className="text-lg font-display font-semibold mb-2">Human + AI Teams</h3>
              <p className="text-steel-gray text-sm">12 specialized agents collaborating with human dispatchers to route resources.</p>
            </GlassPanel>
            
            <GlassPanel className="text-left">
              <Activity className="w-6 h-6 text-emergency-orange mb-4" />
              <h3 className="text-lg font-display font-semibold mb-2">Live Situational Map</h3>
              <p className="text-steel-gray text-sm">Real-time geographic awareness mapping shelters, hospitals, and hazard zones.</p>
            </GlassPanel>

            <GlassPanel className="text-left">
              <ShieldAlert className="w-6 h-6 text-rescue-red mb-4" />
              <h3 className="text-lg font-display font-semibold mb-2">Predictive Operations</h3>
              <p className="text-steel-gray text-sm">Anticipating disaster spread and infrastructure failure before it happens.</p>
            </GlassPanel>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
