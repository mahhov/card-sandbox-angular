import {Table} from "../table";
import {Action} from "./action";
import {Pos} from "../pos";

export class SetSelect extends Action {
    toSelect: Pos;

    constructor(words: string[]) {
        super();
        if (words.length > 2)
            this.toSelect = new Pos(parseInt(words[1]), parseInt(words[2]));
    }

    act(table: Table): void {
        table.select = this.toSelect;
    }
}