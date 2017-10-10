import * as _ from "underscore";
import {Deck} from "../deck";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Table} from "../table";
import {Condition} from "./condition";

export class NotEmpty extends Condition {
    selector: Selector;

    constructor(words: string[]) {
        super();
        this.selector = SelectorCreator.create(_.rest(words));
    }

    verify(table: Table): boolean {
        return _.some(this.selector.select(table), (pos: Pos): boolean => {
            let deck: Deck = table.findDeck(pos.x, pos.y);
            return deck && deck.x === pos.x && deck.y === pos.y && deck.cards.length > 0;
        });
    }
}