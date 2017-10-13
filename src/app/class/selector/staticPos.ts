import {Table} from "../table/table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class StaticPos extends Selector {
    x: number;
    y: number;
    order: string;

    constructor(words: string[]) {
        super(3);
        this.x = parseInt(words[0]);
        this.y = parseInt(words[1]);
        this.order = words[2];
    }

    select(table: Table): Pos[] {
        return [new Pos(this.x, this.y, this.order)];
    }
}