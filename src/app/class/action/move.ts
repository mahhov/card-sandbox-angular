import * as _ from "underscore";
import {Deck} from "../table/deck";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Table} from "../table/table";
import {Action} from "./action";

export class Move extends Action {
    from: Selector;
    to: Selector;

    constructor(words: string[]) {
        super();
        this.from = SelectorCreator.create(_.rest(words));
        this.to = SelectorCreator.create(_.rest(words, this.from.consumed + 1));
    }

    act(table: Table): void {
        let fromPoss: Pos[] = this.from.select(table);
        let toPoss: Pos[] = this.to.select(table);

        let toIndex: number = 0;
        _.each(fromPoss, (fromPos: Pos): void => {
            let toPos: Pos = toPoss[toIndex];
            let fromDeck: Deck = table.findDeck(fromPos.x, fromPos.y);
            let toDeck: Deck = table.findDeck(toPos.x, toPos.y);
            let fromCard: string[] = fromDeck.removeCard(fromPos.order);
            toDeck.addCard(fromCard, toPos.order);
            if (++toIndex === toPoss.length)
                toIndex = 0;
        });
    }
}