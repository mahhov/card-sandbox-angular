import {Table} from "../table/table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class HighlightedSelector extends Selector {
    constructor(words: string[]) {
        super(1);
    }

    select(table: Table): Pos[] {
        return [table.highlight];
    }
}