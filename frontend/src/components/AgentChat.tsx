import React, { useState, useEffect } from 'react';

type Message = {
  id: string;
  agent: string;
  status: 'STARTED' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  details: string;
  timestamp: string;
};

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', agent: 'System', status: 'STARTED', details: 'Awaiting incident reports...', timestamp: new Date().toLocaleTimeString() }
  ]);

  // In a real implementation, this would connect to the WebSocket server
  // useEffect(() => {
  //   const socket = io(import.meta.env.VITE_API_URL);
  //   socket.on('agent_update', (msg) => {
  //     setMessages(prev => [...prev, { ...msg, id: Date.now().toString(), timestamp: new Date().toLocaleTimeString() }]);
  //   });
  //   return () => socket.disconnect();
  // }, []);

  return (
    <div className="flex flex-col h-full bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
        <h3 className="font-bold text-lg">Agent Network Live Feed</h3>
        <span className="px-3 py-1 bg-blue-900 text-blue-300 text-xs rounded-full border border-blue-700">WebSocket Connected</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className="flex flex-col p-4 glass-dark rounded-lg border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-blue-400">{msg.agent}</span>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider
                ${msg.status === 'COMPLETED' ? 'bg-green-900 text-green-300 border border-green-700' : 
                  msg.status === 'PROCESSING' ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' : 
                  'bg-gray-800 text-gray-300 border border-gray-600'}`}>
                {msg.status}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{msg.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
