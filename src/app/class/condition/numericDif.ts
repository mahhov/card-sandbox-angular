import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Card} from "../table/card";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class NumericDif extends Condition {
    compare1: Selector;
    compare2: Selector;
    dif: number;

    constructor(words: string[]) {
        super();
        this.compare1 = SelectorCreator.create(_.rest(words));
        this.compare2 = SelectorCreator.create(_.rest(words, this.compare1.consumed + 1));
        this.dif = parseInt(words[this.compare1.consumed + this.compare2.consumed + 1]);
    }

    verify(table: Table): boolean {
        let pos1: Pos = this.compare1.select(table)[0];
        let pos2: Pos = this.compare2.select(table)[0];
        let card1: Card = table.findDeck(pos1.x, pos1.y).getCard(pos1.order);
        let card2: Card = table.findDeck(pos2.x, pos2.y).getCard(pos2.order);

        return card1 && card2 && card1.num - card2.num === this.dif;
    }
}