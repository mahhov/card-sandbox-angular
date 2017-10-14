import {Table} from "../table/table";
import {Action} from "./action";

export class Unselect extends Action {

    constructor(words: string[]) {
        super();
    }

    act(table: Table): void {
        table.unselect();
    }
}