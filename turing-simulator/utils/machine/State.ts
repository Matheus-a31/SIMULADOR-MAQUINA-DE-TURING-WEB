import { Edge } from "./Edge";
import { Transition } from "./Transition";

export class State {
    private name: string;
    public isFinal: boolean; 
    private transitions: Transition[];

    constructor(name: string) {
        this.name = name;
        this.isFinal = false;
        this.transitions = [];
    }

    public getName(): string { return this.name; }
    
    public setFinal(): void { this.isFinal = true; }

    public addTransition(state: State, read_c: string | null, write_c: string | null, direction: string): State {
        const edge = Edge.instance(read_c, write_c, direction);
        const transition = new Transition(state, edge);
        
        // Verifica duplicatas 
        const exists = this.transitions.some(t => t.equals(transition));
        if (!exists) {
            this.transitions.push(transition);
        }
        return this;
    }

    // Busca transição baseada no caractere lido
    public transition(char_lido: string | null): Transition | null {
        for (const t of this.transitions) {
            const e = t.getEdge();
            // Lógica para tratar nulos (vazios)
            if (e.getReadC() === null && char_lido === null) {
                return t;
            }
            if (e.getReadC() === char_lido) {
                return t;
            }
        }
        return null;
    }
}