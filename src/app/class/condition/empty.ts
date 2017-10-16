import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Deck} from "../table/deck";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class Empty extends Condition {
    selector: Selector;

    constructor(words: string[], not: boolean) {
        super(not);
        this.selector = SelectorCreator.create(_.rest(words));
    }

    verifyValue(table: Table): boolean {
        return _.every(this.selector.select(table), (pos: Pos): boolean => {
            let deck: Deck = table.findDeck(pos.x, pos.y);
            return !(deck && deck.x === pos.x && deck.y === pos.y && deck.cards.length > 0);
        });
    }
}