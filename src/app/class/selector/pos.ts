export class Pos {
    x: number;
    y: number;
    order: string;

    constructor(x: number, y: number, order?: string) {
        this.x = x;
        this.y = y;
        this.order = order;
    }
}