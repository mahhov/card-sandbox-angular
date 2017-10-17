import * as _ from "underscore";
import {Deck} from "../table/deck";
import {Table} from "../table/table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class SelectedStackRepeatSelector extends Selector {
    constructor(words: string[]) {
        super(1);
    }

    select(table: Table): Pos[] {
        let deck: Deck = table.findDeck(table.select.x, table.select.y);
        let minOrder: number = table.select.getOrderNumeric(deck);
        let maxOrder: number = deck.cards.length;

        let selects: Pos[] = [];
        _.times(maxOrder - minOrder, (): void => {
            selects.push(new Pos(table.select.x, table.select.y, minOrder + ''));
        });

        return selects;
    }
}