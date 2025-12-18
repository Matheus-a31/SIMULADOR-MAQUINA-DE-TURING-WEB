// app/tutorial/page.tsx
import Link from 'next/link';

export default function TutorialPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        
        {/* Cabeçalho do Tutorial */}
        <header className="bg-blue-600 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Guia de Uso e Sintaxe</h1>
          <p className="opacity-90">Aprenda a configurar sua Máquina de Turing e entender os diagramas.</p>
        </header>

        <div className="p-8 space-y-10">

          {/* Seção 1: Comandos Básicos */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">1. Comandos Básicos</h2>
            <p className="text-gray-600 mb-4">
              O arquivo de configuração deve conter três comandos obrigatórios no início para preparar a máquina.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <code className="text-blue-600 font-bold">init &lt;nome_estado&gt;</code>
                <p className="text-sm text-gray-600 mt-1">Define qual é o estado inicial da máquina.</p>
                <div className="text-xs font-mono text-gray-500 mt-1 bg-white p-1 rounded inline-block">Ex: init q0</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <code className="text-blue-600 font-bold">accept &lt;lista_estados&gt;</code>
                <p className="text-sm text-gray-600 mt-1">Define quais estados representam o sucesso (aceitação). Pode ser um ou vários, separados por vírgula.</p>
                <div className="text-xs font-mono text-gray-500 mt-1 bg-white p-1 rounded inline-block">Ex: accept qfim, q_ok</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <code className="text-blue-600 font-bold">fita &lt;conteudo&gt;</code>
                <p className="text-sm text-gray-600 mt-1">Define a palavra de entrada que será escrita na fita antes da execução começar.</p>
                <div className="text-xs font-mono text-gray-500 mt-1 bg-white p-1 rounded inline-block">Ex: fita 100110</div>
              </div>
            </div>
          </section>

          {/* Seção 2: Transições */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">2. Criando Transições</h2>
            <p className="text-gray-600 mb-4">
              As transições definem a lógica da máquina. Cada linha representa uma regra no formato:
            </p>

            <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg mb-4 text-sm shadow-inner">
              origem, leu, destino, escreveu, direção
            </div>

            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              <li><strong>Origem:</strong> Nome do estado atual.</li>
              <li><strong>Leu:</strong> Caractere que está no cabeçote (Use <code className="bg-gray-200 px-1 rounded">_</code> para vazio).</li>
              <li><strong>Destino:</strong> Para qual estado a máquina deve ir.</li>
              <li><strong>Escreveu:</strong> O que escrever na fita no lugar do caractere lido.</li>
              <li><strong>Direção:</strong> Para onde mover o cabeçote <code className="bg-gray-200 px-1 rounded">&gt;</code> ou D (Direita), <code className="bg-gray-200 px-1 rounded">&lt;</code> ou E (Esquerda).</li>
            </ul>

            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
              <strong>Exemplo Prático:</strong><br/>
              <code>q0, 0, q1, 1, &gt;</code> <br/>
              <em>"Se estiver em <strong>q0</strong> e ler <strong>0</strong>, vá para <strong>q1</strong>, escreva <strong>1</strong> e mova para a <strong>Direita</strong>."</em>
            </div>
          </section>

          {/* Seção 3: O Autômato Visual */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">3. Entendendo o Diagrama</h2>
            <p className="text-gray-600 mb-6">
              O simulador desenha automaticamente o diagrama de estados (grafo) com base no seu código.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs shrink-0">q0</div>
                <div>
                  <h4 className="font-bold text-sm">Estado Normal</h4>
                  <p className="text-xs text-gray-500">Representado por um círculo simples. Indica um passo intermediário.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-4 border-double border-black flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-black">qfim</div>
                <div>
                  <h4 className="font-bold text-sm">Estado Final</h4>
                  <p className="text-xs text-gray-500">Círculo duplo ou borda grossa. Se a máquina parar aqui, a palavra foi <strong>ACEITA</strong>.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 border-4 border-orange-400 flex items-center justify-center font-bold text-xs shrink-0 text-orange-700">q1</div>
                <div>
                  <h4 className="font-bold text-sm">Estado Atual (Ativo)</h4>
                  <p className="text-xs text-gray-500">Fica destacado em amarelo/laranja durante a execução para mostrar onde a máquina está.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 flex items-center text-gray-800 text-lg font-bold">➔</div>
                <div>
                  <h4 className="font-bold text-sm">Transição (Seta)</h4>
                  <p className="text-xs text-gray-500">A etiqueta na seta mostra: <code>Leu , Escreveu, Direção</code>.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Botão de Voltar */}
          <div className="mt-10 pt-6 border-t flex justify-end">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2"
            >
              Voltar para o Simulador
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}