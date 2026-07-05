import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Loader2, CheckCircle2 } from 'lucide-react';

type Message = {
  id: string;
  agent: string;
  status: 'STARTED' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  details: string;
  timestamp: string;
};

// Operational mock stream
const mockStream = [
  { agent: 'WeatherAgent', status: 'STARTED', details: 'Connecting to NOAA Satellite MCP...', time: 2000 },
  { agent: 'WeatherAgent', status: 'PROCESSING', details: 'Analyzing cyclonic pressure drops over sector 7G.', time: 4000 },
  { agent: 'WeatherAgent', status: 'COMPLETED', details: 'Category 4 Hurricane trajectory confirmed. Evacuation recommended.', time: 6000 },
  { agent: 'CommanderAgent', status: 'PROCESSING', details: 'Synthesizing weather data. Tasking Medical and Road agents.', time: 7000 },
  { agent: 'RoadAgent', status: 'STARTED', details: 'Querying live traffic data...', time: 8000 },
];

export const AgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', agent: 'System', status: 'STARTED', details: 'Initializing operational link...', timestamp: new Date().toLocaleTimeString() }
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
    if (agent === 'WeatherAgent') return 'bg-medical-cyan/10 border-medical-cyan text-medical-cyan';
    if (agent === 'CommanderAgent') return 'bg-emergency-orange/10 border-emergency-orange text-emergency-orange';
    if (agent === 'RoadAgent') return 'bg-rescue-red/10 border-rescue-red text-rescue-red';
    return 'bg-storm-700/50 border-steel-gray text-warm-white';
  };

  return (
    <div className="flex flex-col h-full bg-navy-950 overflow-hidden font-sans border-l border-storm-700 relative">
      
      <div className="p-4 border-b border-storm-700 bg-navy-900 flex justify-between items-center z-10">
        <h3 className="font-display font-semibold text-sm tracking-wide text-warm-white flex items-center">
          <Network className="w-4 h-4 mr-2 text-medical-cyan" />
          Decision Pathway
        </h3>
        <span className="flex items-center space-x-2 bg-green-900/20 px-2 py-1 rounded">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-medium text-green-400 uppercase tracking-wide">Live</span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 bg-navy-950">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col p-4 rounded border-l-4 shadow-sm bg-storm-800 ${getAgentColor(msg.agent)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-display font-semibold text-sm">{msg.agent}</span>
                <span className="text-xs text-steel-gray">{msg.timestamp}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded flex items-center
                  ${msg.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' : 
                    msg.status === 'PROCESSING' ? 'bg-emergency-orange/20 text-emergency-orange' : 
                    'bg-storm-700 text-warm-white'}`}>
                  {msg.status === 'PROCESSING' && <Loader2 className="w-3 h-3 animate-spin mr-1 inline" />}
                  {msg.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 mr-1 inline" />}
                  {msg.status}
                </span>
              </div>
              <p className="text-warm-white text-sm font-light leading-relaxed opacity-90">{msg.details}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
