import * as _ from "underscore";
import {Table} from "../table/table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class SelectedStackSelector extends Selector {
    constructor(words: string[]) {
        super(1);
    }

    select(table: Table): Pos[] {
        let minOrder: number = parseInt(table.select.order); // todo : ensure selectOrder is numeric (not top/bottom)
        let maxOrder: number = table.findDeck(table.select.x, table.select.y).cards.length;

        let selects: Pos[] = [];
        _.times(maxOrder - minOrder, (): void => {
            selects.push(new Pos(table.select.x, table.select.y, minOrder + ''));
        });
        
        return selects;
    }
}