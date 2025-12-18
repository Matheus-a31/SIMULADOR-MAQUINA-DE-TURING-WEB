import React from 'react';
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface ControlPanelProps {
  isRunning: boolean;
  canStep: boolean; // Se a máquina está carregada e não terminou
  onStep: () => void;
  onToggleRun: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  isRunning, canStep, onStep, onToggleRun, onReset 
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap gap-4 items-center justify-center border border-gray-200 shadow-sm">
      
      <button
        onClick={onStep}
        disabled={!canStep || isRunning}
        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700 transition shadow-sm"
      >
        <span>▶</span> Próximo Passo
      </button>

      <button
        onClick={onToggleRun}
        
        disabled={!canStep}
        className={`
          flex items-center gap-2 px-6 py-2 rounded text-white font-bold shadow-md transition
          ${isRunning 
            ? 'bg-yellow-500 hover:bg-yellow-600' 
            : 'bg-blue-600 hover:bg-blue-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isRunning ? (
          <><span>⏸</span> Pausar</>
        ) : (
          <><span>⏩</span> Executar Tudo</>
        )}
      </button>

      <div className="w-px h-8 bg-gray-300 mx-2 hidden sm:block"></div>

      <button
        onClick={onReset}
        className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 font-bold transition"
      >
        ⟲ Reiniciar
      </button>
    </div>
  );
};