import { State } from "./State";

export class Machine {
    public q: State; // Público para acesso na interface
    public steps: number;
    public current: number;
    public fita: (string | null)[];
    private range: number;

    constructor(q: State, w: string, _range: number = 50) {
        this.q = q;
        this.steps = 0;
        this.range = _range;
        
        // Inicializa fita com nulos
        this.fita = new Array(this.range * 4).fill(null);
        this.current = this.range; // Começa no meio

        this.init_fita(w);
    }

    private init_fita(w: string): void {
        let idx = this.current;
        for (const char of w) {
            this.fita[idx] = char;
            idx++;
        }
    }

    public next_step(): { continue: boolean, msg: string } {
        // Proteção contra estado nulo
        if (!this.q) return { continue: false, msg: "ERRO: Estado atual é None." };

        if (this.q.isFinal) {
            return { continue: false, msg: "ACEITO: A máquina já está em estado final." };
        }

        const char_atual = this.fita[this.current]; // null se vazio
        const transicao = this.q.transition(char_atual);

        if (transicao) {
            const edge = transicao.getEdge();
            const qNext = transicao.getState();

            // Escrever na fita
            this.fita[this.current] = edge.getWriteC();

            // Mover
            const direction = edge.getDirection();
            if (direction === 'D' || direction === '>') this.current++;
            else if (direction === 'E' || direction === '<') this.current--;

            // Atualizar estado
            this.q = qNext;
            this.steps++;

            if (this.q.isFinal) {
                return { continue: false, msg: `Leu '${char_atual || '_'}' -> Foi para ${qNext.getName()} (FINAL) -> ACEITO!` };
            }

            return { 
                continue: true, 
                msg: `Leu '${char_atual || '_'}' -> Escreveu '${edge.getWriteC() || '_'}' -> Moveu ${direction} -> Foi para ${qNext.getName()}` 
            };

        } else {
            return { continue: false, msg: `TRAVOU: Sem transição em ${this.q.getName()} lendo '${char_atual || '_'}'` };
        }
    }

    // Método auxiliar para o frontend desenhar a fita
    public get_tape_snapshot(window_size: number = 21): string[] {
        const start = this.current - Math.floor(window_size / 2);
        const end = this.current + Math.floor(window_size / 2) + 1;
        
        const snapshot: string[] = [];
        for (let i = start; i < end; i++) {
            if (i >= 0 && i < this.fita.length) {
                const val = this.fita[i];
                snapshot.push(val !== null ? val : "_");
            } else {
                snapshot.push("_");
            }
        }
        return snapshot;
    }
}