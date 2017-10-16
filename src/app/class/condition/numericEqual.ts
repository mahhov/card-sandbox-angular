import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Card} from "../table/card";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class NumericEqual extends Condition {
    selector: Selector;
    value: number;

    constructor(words: string[], not: boolean) {
        super(not);
        this.selector = SelectorCreator.create(_.rest(words));
        this.value = parseInt(words[this.selector.consumed + 1]);
    }

    verifyValue(table: Table): boolean {
        let pos: Pos = this.selector.select(table)[0];
        let card: Card = table.findDeck(pos.x, pos.y).getCard(pos.order);

        return card.num === this.value;
    }
}