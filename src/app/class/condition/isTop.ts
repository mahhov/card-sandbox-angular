import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Deck} from "../table/deck";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class IsTop extends Condition {
    selector: Selector;

    constructor(words: string[], not: boolean) {
        super(not);
        this.selector = SelectorCreator.create(_.rest(words));
    }

    verifyValue(table: Table): boolean {
        let pos: Pos = this.selector.select(table)[0];
        let deck: Deck = table.findDeck(pos.x, pos.y);
        return pos.getOrderNumeric(deck) === deck.cards.length - 1;
    }
}