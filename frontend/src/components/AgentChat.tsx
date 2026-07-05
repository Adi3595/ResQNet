import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2 } from 'lucide-react';

type Message = {
  id: string;
  agent: string;
  status: 'STARTED' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  details: string;
  timestamp: string;
};

// Simulated mock stream for visual demo
const mockStream = [
  { agent: 'WeatherAgent', status: 'STARTED', details: 'Connecting to NOAA Satellite MCP...', time: 2000 },
  { agent: 'WeatherAgent', status: 'PROCESSING', details: 'Analyzing cyclonic pressure drops over sector 7G.', time: 4000 },
  { agent: 'WeatherAgent', status: 'COMPLETED', details: 'Category 4 Hurricane trajectory confirmed. Evacuation recommended.', time: 6000 },
  { agent: 'CommanderAgent', status: 'PROCESSING', details: 'Synthesizing weather data. Tasking Medical and Road agents.', time: 7000 },
  { agent: 'RoadAgent', status: 'STARTED', details: 'Querying live traffic data...', time: 8000 },
];

export const AgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', agent: 'System', status: 'STARTED', details: 'Initializing neural link...', timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    mockStream.forEach((msg, idx) => {
      const t = setTimeout(() => {
        setMessages(prev => [...prev, {
          id: idx.toString(),
          agent: msg.agent,
          status: msg.status as any,
          details: msg.details,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, msg.time);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const getAgentColor = (agent: string) => {
    if (agent === 'WeatherAgent') return 'text-sky-blue border-sky-blue';
    if (agent === 'CommanderAgent') return 'text-pastel-yellow border-pastel-yellow';
    if (agent === 'RoadAgent') return 'text-pastel-blue border-pastel-blue';
    return 'text-gray-400 border-gray-600';
  };

  return (
    <div className="flex flex-col h-full bg-space-950/50 overflow-hidden font-sans relative">
      {/* Tech Overlay Lines */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="p-4 border-b border-white/10 bg-space-900 flex justify-between items-center z-10">
        <h3 className="font-display font-bold text-sm tracking-widest text-sky-blue flex items-center">
          <BrainCircuit className="w-4 h-4 mr-2" />
          LIVE TELEMETRY
        </h3>
        <span className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Connected</span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col p-4 rounded-r-lg border-l-2 bg-space-900/50 backdrop-blur-sm shadow-lg ${getAgentColor(msg.agent)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="font-display font-bold text-sm tracking-wider uppercase">{msg.agent}</span>
                <span className="text-xs text-gray-500 font-mono">{msg.timestamp}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest
                  ${msg.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
                    msg.status === 'PROCESSING' ? 'bg-pastel-yellow/20 text-pastel-yellow border border-pastel-yellow/50 flex items-center' : 
                    'bg-space-800 text-gray-400 border border-gray-700'}`}>
                  {msg.status === 'PROCESSING' && <Loader2 className="w-3 h-3 animate-spin mr-1 inline" />}
                  {msg.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm font-light leading-relaxed">{msg.details}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
