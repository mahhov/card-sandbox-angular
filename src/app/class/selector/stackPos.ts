import * as _ from "underscore";
import {Table} from "../table/table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class StackPos extends Selector {
    x: number;
    y: number;
    count: number;
    all: boolean;

    constructor(words: string[]) {
        super(4);
        this.x = parseInt(words[1]);
        this.y = parseInt(words[2]);
        this.all = words[3] === 'all';
        this.count = this.all ? 0 : parseInt(words[3]);
    }

    select(table: Table): Pos[] {
        let count: number = table.findDeck(this.x, this.y).cards.length;

        if (!this.all && this.count < count)
            count = this.count;

        return _.times(count, (): Pos => {
            return new Pos(this.x, this.y, 'top');
        });
    }
}