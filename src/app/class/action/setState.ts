import {Table} from "../table/table";
import {Action} from "./action";

export class SetState extends Action {
    toState: number;

    constructor(words: string[]) {
        super();
        this.toState = parseInt(words[1]);
    }

    act(table: Table): void {
        table.state = this.toState;
    }
}