import {Table} from "../table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class SelectedPos extends Selector {
    constructor(words: string[]) {
        super(1);
    }

    select(table: Table): Pos[] {
        return [table.select];
    }
}