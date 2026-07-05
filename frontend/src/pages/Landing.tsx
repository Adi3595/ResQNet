import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Globe } from '../components/3d/Globe';
import { ShieldAlert, Activity, Network } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';

export default function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-space-950 text-white relative overflow-hidden font-sans">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Globe />
        </Canvas>
      </div>

      {/* Cinematic Lighting Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-space-950/80 to-space-950" />

      <div className="relative z-10 container mx-auto px-6 py-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center mb-16"
        >
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 text-sky-blue animate-pulse" />
            <h1 className="text-2xl font-display font-bold tracking-widest text-glow">RESQNET</h1>
          </div>
          <button 
            onClick={onLaunch} 
            className="px-6 py-2 rounded-full border border-sky-blue/50 text-sky-blue hover:bg-sky-blue hover:text-space-950 transition-all duration-300 font-bold tracking-wider"
          >
            SYS_LOGIN
          </button>
        </motion.nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-pastel-yellow/30 bg-pastel-yellow/10 text-pastel-yellow text-sm font-bold tracking-widest uppercase"
          >
            <Activity className="w-4 h-4" />
            <span>AI Multi-Agent System Active</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600"
          >
            DISASTER RESPONSE <br /> <span className="text-glow-yellow text-white">COMMAND CENTER</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed"
          >
            Autonomous multi-agent intelligence coordinating rescue operations, predicting risks, and allocating global resources in real time.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(56, 189, 248, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onLaunch}
            className="px-10 py-5 bg-sky-blue/10 border-2 border-sky-blue text-sky-blue font-display font-bold rounded-none text-xl transition-all uppercase tracking-[0.2em] relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Initiate Uplink</span>
            <div className="absolute inset-0 bg-sky-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0" />
            <span className="absolute inset-0 bg-sky-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 text-space-950 font-bold flex items-center justify-center">
              INITIATE UPLINK
            </span>
          </motion.button>
          
          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          >
            <GlassPanel glow className="text-left group">
              <Network className="w-8 h-8 text-sky-blue mb-4 group-hover:animate-spin" />
              <h3 className="text-xl font-display font-bold mb-2">Neural Coordination</h3>
              <p className="text-gray-400 text-sm">12 highly specialized AI agents collaborating simultaneously to solve complex rescue logistics.</p>
            </GlassPanel>
            
            <GlassPanel glow className="text-left group">
              <Activity className="w-8 h-8 text-pastel-yellow mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-display font-bold mb-2">Real-Time Telemetry</h3>
              <p className="text-gray-400 text-sm">Streaming global weather, traffic, and infrastructure data directly into the tactical map.</p>
            </GlassPanel>

            <GlassPanel glow className="text-left group">
              <ShieldAlert className="w-8 h-8 text-pastel-blue mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display font-bold mb-2">Predictive Impact</h3>
              <p className="text-gray-400 text-sm">Simulating disaster spread and population impact before it happens.</p>
            </GlassPanel>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
