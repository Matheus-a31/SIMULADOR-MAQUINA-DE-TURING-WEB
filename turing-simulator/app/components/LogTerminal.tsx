import React, { useEffect, useRef } from 'react';

interface LogTerminalProps {
  logs: string[];
}

export const LogTerminal: React.FC<LogTerminalProps> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-900 rounded-lg shadow-inner overflow-hidden flex flex-col h-64 border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700 flex justify-between">
        <span>TERMINAL COM LOGS DE EXECUÇÃO</span>
        <span>Output</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1">
        {logs.length === 0 && <span className="text-gray-600 italic">Aguardando execução...</span>}
        
        {logs.map((log, i) => (
          <div key={i} className="text-green-400 break-words">
            <span className="text-gray-500 mr-2">{'>>'}  </span>
            {log}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};