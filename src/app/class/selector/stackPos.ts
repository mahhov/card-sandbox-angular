import * as _ from "underscore";
import {Table} from "../table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class StackPos extends Selector {
    x: number;
    y: number;

    constructor(words: string[]) {
        super(3);
        this.x = parseInt(words[1]);
        this.y = parseInt(words[2]);
    }

    select(table: Table): Pos[] {
        return _.map(table.findDeck(this.x, this.y).cards, (): Pos => {
            return new Pos(this.x, this.y, 'top')
        });
    }
}