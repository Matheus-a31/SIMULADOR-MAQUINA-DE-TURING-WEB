import { Edge } from "./Edge";
import { State } from "./State";

export class Transition {
    private state: State;
    private edge: Edge;

    constructor(state: State, edge: Edge) {
        this.state = state;
        this.edge = edge;
    }

    public getEdge(): Edge { return this.edge; }
    public getState(): State { return this.state; }

    public equals(t: any): boolean {
        if (t instanceof Transition) {
            return t.getEdge().equals(this.edge) && t.getState().getName() === this.state.getName();
        }
        return false;
    }

    public toString(): string {
        return `${this.edge.toString()} --> ${this.state.getName()}`;
    }
}