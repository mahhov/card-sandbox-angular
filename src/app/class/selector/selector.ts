import {Table} from "../table/table";
import {Pos} from "./pos";

export class Selector {
    consumed: number;

    constructor(consumed: number) {
        this.consumed = consumed;
    }

    select(table: Table): Pos[] {
        return null;
    }
}