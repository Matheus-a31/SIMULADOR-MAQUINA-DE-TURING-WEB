export class Edge {
    private read_c: string | null;
    private write_c: string | null;
    private direction: string; // 'D' ou 'E' (ou '>' '<')

    constructor(read_c: string | null, write_c: string | null, direction: string) {
        this.read_c = read_c;
        this.write_c = write_c;
        this.direction = direction;
    }

    public getReadC(): string | null { return this.read_c; }
    public getWriteC(): string | null { return this.write_c; }
    public getDirection(): string { return this.direction; }

    public static instance(read_c: string | null, write_c: string | null, direction: string): Edge {
        return new Edge(read_c, write_c, direction);
    }

    public equals(o: any): boolean {
        if (o instanceof Edge) {
            return this.read_c === o.getReadC();
        }
        return false;
    }

    public toString(): string {
        return `[${this.read_c || '_'}/${this.write_c || '_'}, ${this.direction}]`;
    }
}