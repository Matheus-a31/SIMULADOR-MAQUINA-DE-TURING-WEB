'use client';
import { useState, useRef, useEffect } from 'react';

import { Machine } from '../utils/machine/Machine';
import { TuringLoader } from '../utils/machine/TuringLoader';
import { State } from '../utils/machine/State';

import { Tape } from './components/Tape';
import { LogTerminal } from './components/LogTerminal';
import { ControlPanel } from './components/ControlPanel';
import { StateDiagram } from './components/StateDiagram';

import Link from 'next/link';

const DEFAULT_INPUT = `# Exemplo: Inversor de Bits
fita 10110
init q0
accept qfim

q0, 0, q0, 1, >
q0, 1, q0, 0, >
q0, _, qfim, _, <`;

export default function Home() {
  const [configText, setConfigText] = useState(DEFAULT_INPUT);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [allStates, setAllStates] = useState<Map<string, State> | null>(null);

  const [uiState, setUiState] = useState({
    currentStateName: '---',
    steps: 0,
    tapeSnapshot: Array(21).fill('_'),
    status: 'AGUARDANDO',
  });

  const machineRef = useRef<Machine | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadMachine = () => {
    stopAutoRun();
    const loader = new TuringLoader();
    const { initialState, w } = loader.load(configText);

    if (initialState) {
      const newMachine = new Machine(initialState, w);
      machineRef.current = newMachine;
      setAllStates(loader.getStates());
      setLogs([`Máquina carregada. Estado inicial: ${initialState.getName()}`]);
      syncUI(newMachine, 'RODANDO');
    } else {
      setLogs(prev => [...prev, "ERRO: Estado inicial não encontrado."]);
      setAllStates(null);
    }
  };

  const syncUI = (m: Machine, statusOverride?: string) => {
    setUiState({
      currentStateName: m.q?.getName() || 'ERRO',
      steps: m.steps,
      tapeSnapshot: m.get_tape_snapshot(21),
      status: statusOverride || (m.q?.isFinal ? 'ACEITO' : 'RODANDO')
    });
  };

  const stepOnce = () => {
    const m = machineRef.current;
    if (!m) return false;

    const { continue: deveContinuar, msg } = m.next_step();
    setLogs(prev => [...prev, msg].slice(-100)); 
    
    if (!deveContinuar) {
        const finalStatus = m.q.isFinal ? 'ACEITO' : 'REJEITADO';
        syncUI(m, finalStatus);
        stopAutoRun();
        return false;
    }
    syncUI(m, 'RODANDO');
    return true;
  };

  const toggleRun = () => {
    if (isRunning) stopAutoRun();
    else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        if (!stepOnce()) stopAutoRun();
      }, 100); 
    }
  };

  const stopAutoRun = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  };

  useEffect(() => { return () => stopAutoRun(); }, []);

  return (
    // MAIN: No mobile é min-h-screen (rola a tela). No Desktop (lg) é h-screen fixo.
    <main className="min-h-screen lg:h-screen bg-gray-100 font-sans flex flex-col lg:overflow-hidden">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 lg:px-6 flex-shrink-0 z-20 sticky top-0 lg:static">
        <div className="flex items-center justify-between w-full"> {/* Adicionei justify-between e w-full */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg lg:text-xl font-bold text-gray-800">Simulador Máquina de Turing</h1>
        </div>
        {/* Botão de Ajuda (Novo) */}
    <Link 
      href="/tutorial" 
      className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-100 transition"
      target="_blank" // Abre em nova aba para não perder o progresso da simulação
    >
      <span className="hidden sm:inline">Ajuda & Sintaxe</span>
    </Link>
      </div>
      </header>

      {/* Grid Layout: Stacks no mobile (1 col), Lado a lado no Desktop (12 cols) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-visible lg:overflow-hidden">
        
        {/* --- COLUNA 1: CONFIGURAÇÃO --- */}
        {/* Mobile: Altura fixa razoável para digitar. Desktop: Altura total. */}
        <div className="lg:col-span-3 bg-white border-b lg:border-r border-gray-200 flex flex-col h-[500px] lg:h-full order-1">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-500 uppercase">Transições da Linguagem</h2>
          </div>
          
          <div className="flex-1 p-2">
             <textarea
              id="config-input"
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              className="w-full h-full p-3 border-0 bg-gray-50 rounded-md font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              spellCheck={false}
              placeholder="Cole seu código aqui..."
            />
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-white">
            <button 
              onClick={loadMachine}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-2"
            >
              <span className="hidden sm:inline">Carregar Linguagem</span><span className="sm:hidden">Carregar</span>
            </button>
          </div>
        </div>

        {/* --- COLUNA 2: EXECUÇÃO (CENTRO) --- */}
        {/* Ordem 2. Mobile: Altura automática. Desktop: Scroll interno. */}
        <div className="lg:col-span-5 bg-gray-50 flex flex-col order-2 h-auto lg:h-full lg:overflow-y-auto border-b lg:border-r border-gray-200">
          <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10 lg:static">
            <h2 className="text-xs font-bold text-gray-500 uppercase">Execução</h2>
          </div>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              <div className="bg-white p-2 lg:p-3 rounded shadow-sm border text-center">
                <div className="text-[10px] text-gray-400 uppercase font-bold">Estado</div>
                <div className="text-lg lg:text-xl font-black text-blue-600 truncate">{uiState.currentStateName}</div>
              </div>
              <div className="bg-white p-2 lg:p-3 rounded shadow-sm border text-center">
                <div className="text-[10px] text-gray-400 uppercase font-bold">Passos</div>
                <div className="text-lg lg:text-xl font-black text-gray-700">{uiState.steps}</div>
              </div>
              <div className={`p-2 lg:p-3 rounded shadow-sm border text-center text-white font-bold flex items-center justify-center text-xs lg:text-sm
                ${uiState.status === 'ACEITO' ? 'bg-green-500' : 
                  uiState.status === 'REJEITADO' ? 'bg-red-500' : 
                  'bg-gray-400'}`}
              >
                {uiState.status}
              </div>
            </div>

            {/* Fita */}
            <div>
               <div className="text-xs font-bold text-gray-400 mb-2 uppercase">Fita</div>
               <div className="overflow-x-auto pb-2">
                 {/* Garante que a fita role horizontalmente no mobile */}
                 <div className="min-w-[600px]"> 
                    <Tape tapeSnapshot={uiState.tapeSnapshot} />
                 </div>
               </div>
            </div>

            {/* Controles */}
            <ControlPanel 
              isRunning={isRunning} 
              canStep={machineRef.current !== null && uiState.status !== 'ACEITO' && uiState.status !== 'REJEITADO'}
              onStep={stepOnce}
              onToggleRun={toggleRun}
              onReset={loadMachine}
            />

            {/* Logs */}
            <div className="flex-1">
               <div className="text-xs font-bold text-gray-400 mb-2 uppercase">Logs</div>
               <LogTerminal logs={logs} />
            </div>
          </div>
        </div>

        {/* --- COLUNA 3: AUTÔMATO (DIREITA) --- */}
        {/* Ordem 3. Mobile: Altura fixa para ver o gráfico. Desktop: Resto da tela. */}
        <div className="lg:col-span-4 bg-white flex flex-col order-3 h-[500px] lg:h-full border-t lg:border-t-0 border-gray-200">
           <div className="p-3 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-500 uppercase">Autômato</h2>
          </div>
          
          <div className="flex-1 overflow-auto bg-white relative">
             <StateDiagram 
                machine={machineRef.current} 
                allStates={allStates} 
            />
          </div>
        </div>

      </div>
    </main>
  );
}