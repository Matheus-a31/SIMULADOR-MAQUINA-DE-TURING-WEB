import { State } from "./State";

export class TuringLoader {
    private states: Map<string, State>;
    private start_state: State | null;
    private w: string;

    constructor() {
        this.states = new Map();
        this.start_state = null;
        this.w = "";
    }
    
    public getStates(): Map<string, State> {
        return this.states;
    }

    private get_or_create_state(name: string): State {
        const cleanName = name.trim();
        if (!this.states.has(cleanName)) {
            this.states.set(cleanName, new State(cleanName));
        }
        return this.states.get(cleanName)!;
    }

    // receber String
    public load(content: string): { initialState: State | null, w: string } {
        const lines = content.split('\n');

        for (let line of lines) {
            line = line.trim();
            
            if (!line || line.startsWith('#')) continue;

            if (line.startsWith('fita')) {
                // Pega o segundo elemento após o espaço
                const parts = line.split(/\s+/); 
                this.w = parts.length > 1 ? parts[1] : "";
                continue;
            }

            if (line.startsWith('init')) {
                const parts = line.split(/\s+/);
                if (parts.length > 1) {
                    this.start_state = this.get_or_create_state(parts[1]);
                }
                continue;
            }

            if (line.startsWith('accept')) {
                const parts = line.split(/\s+/);
                if (parts.length > 1) {
                    const final_names = parts[1].split(',');
                    final_names.forEach(fn => {
                        const s = this.get_or_create_state(fn);
                        s.setFinal();
                    });
                }
                continue;
            }

            // Lê transições: origem, leu, destino, escreveu, direcao
            if (line.includes(',')) {
                const parts = line.split(',');
                if (parts.length === 5) {
                    const src_name = parts[0].trim();
                    const read_char = parts[1].trim();
                    const dest_name = parts[2].trim();
                    const write_char = parts[3].trim();
                    const direction_symbol = parts[4].trim();

                    // Conversão de símbolos
                    const final_read = read_char === '_' ? null : read_char;
                    const final_write = write_char === '_' ? null : write_char;
                    
                    let final_dir = 'D';
                    if (direction_symbol === '<') final_dir = 'E';
                    else if (direction_symbol === '>') final_dir = 'D';
                    else final_dir = direction_symbol;

                    const src_state = this.get_or_create_state(src_name);
                    const dest_state = this.get_or_create_state(dest_name);
                    
                    src_state.addTransition(dest_state, final_read, final_write, final_dir);
                }
            }
        }

        return { initialState: this.start_state, w: this.w };
    }
}