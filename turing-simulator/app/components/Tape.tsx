import React from 'react';

interface TapeProps {
  tapeSnapshot: string[]; // O array de 21 caracteres que o Machine.ts retorna
}

export const Tape: React.FC<TapeProps> = ({ tapeSnapshot }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 mb-6">
      <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Cabeçote de Leitura/Escrita</h3>
      
      {/* Container da Fita */}
      <div className="flex justify-center items-center overflow-hidden py-4 bg-gray-50 rounded border border-gray-200 relative">
        
        {/* Marcador Central (Triângulo/Seta) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-14 border-x-2 border-orange-400 bg-yellow-50/50 z-0 pointer-events-none"></div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-orange-500 text-xl z-20">▲</div>

        {/* Células da Fita */}
        <div className="flex z-10 gap-1">
          {tapeSnapshot.map((char, index) => {
            // O índice 10 é sempre o centro na janela de 21 itens
            const isHead = index === 10; 
            
            return (
              <div
                key={index}
                className={`
                  w-10 h-12 flex items-center justify-center 
                  border rounded text-lg font-mono transition-all duration-200
                  ${isHead 
                    ? 'bg-white border-orange-500 text-gray-900 font-bold shadow-sm scale-110' 
                    : 'bg-white border-gray-300 text-gray-400'}
                `}
              >
                {char === '_' || char === null ? '' : char}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};