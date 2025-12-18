'use client';
import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { Machine } from '../../utils/machine/Machine';
import { State } from '../../utils/machine/State';

interface StateDiagramProps {
  machine: Machine | null;
  allStates: Map<string, State> | null;
}

export const StateDiagram: React.FC<StateDiagramProps> = ({ machine, allStates }) => {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    // Inicializa o mermaid
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
  }, []);

  useEffect(() => {
    if (!machine || !allStates) return;

    const renderGraph = async () => {
      try {
        let graph = 'graph TD\n';
        
        
        graph += 'classDef default fill:#fff,stroke:#333,stroke-width:2px;\n';
        graph += 'classDef active fill:#fffac8,stroke:#f39c12,stroke-width:4px;\n'; 
        graph += 'classDef final stroke-width:4px,stroke-dasharray: 5 5;\n';

        
        allStates.forEach((stateObj) => {
           const transicoes = (stateObj as any).transitions || [];
           
           // Mapa para agrupar: Destino -> Lista de Labels
           const groups = new Map<string, string[]>();

           // 1. Coleta todas as transições desse estado
           transicoes.forEach((t: any) => {
             const destName = t.state.getName();
             const edge = t.edge;
             
             const read = edge.getReadC() === null ? '_' : edge.getReadC();
             const write = edge.getWriteC() === null ? '_' : edge.getWriteC();
             const dir = edge.getDirection();
             
             // Formato do texto: "0 , 1, D"
             const label = `${read} , ${write}, ${dir}`;
             
             if (!groups.has(destName)) {
                groups.set(destName, []);
             }
             groups.get(destName)?.push(label);
           });

           // 2. Desenha apenas UMA seta por destino, com texto multilinhas
           groups.forEach((labels, destName) => {
             // Junta os labels com \n (quebra de linha)
             const combinedLabel = `"${labels.join('\n')}"`;
             
             // Cria a aresta no Mermaid
             graph += `${stateObj.getName()} -- ${combinedLabel} --> ${destName}\n`;
           });
        });
        
        allStates.forEach((stateObj) => {
            const name = stateObj.getName();
            let shapeStart = '((';
            let shapeEnd = '))';
            
            if (stateObj.isFinal) {
                shapeStart = '(((';
                shapeEnd = ')))';
            }
            
            graph += `${name}${shapeStart}${name}${shapeEnd}\n`;

            if (machine.q.getName() === name) {
                graph += `class ${name} active\n`;
            } else if (stateObj.isFinal) {
                graph += `class ${name} final\n`;
            }
        });

        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, graph);
        setSvg(svg);
      } catch (error) {
        console.error("Erro Mermaid:", error);
      }
    };

    renderGraph();
  }, [machine, allStates, machine?.steps]);

  return (
    <div className="w-full h-full min-h-[400px] flex justify-center items-start pt-10 overflow-auto">
        {svg ? (
            <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
            <span className="text-gray-400 text-sm italic p-10">
                Carregue uma linguagem para ver o diagrama.
            </span>
        )}
    </div>
  );
};