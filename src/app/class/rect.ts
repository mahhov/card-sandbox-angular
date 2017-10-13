export class Rect {
    left: number;
    top: number;
    width: number;
    height: number;

    constructor(left: number, top: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    contains(x: number, y: number): boolean {
        return x > this.left && x < this.left + this.width && y > this.top && y < this.top + this.height;
    }
}