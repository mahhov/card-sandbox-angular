import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Card} from "../table/card";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class ColorSame extends Condition {
    compare1: Selector;
    compare2: Selector;

    constructor(words: string[], not: boolean) {
        super(not);
        this.compare1 = SelectorCreator.create(_.rest(words));
        this.compare2 = SelectorCreator.create(_.rest(words, this.compare1.consumed + 1));
    }

    verifyValue(table: Table): boolean {
        let pos1: Pos = this.compare1.select(table)[0];
        let pos2: Pos = this.compare2.select(table)[0];
        let card1: Card = table.findDeck(pos1.x, pos1.y).getCard(pos1.order);
        let card2: Card = table.findDeck(pos2.x, pos2.y).getCard(pos2.order);

        return (card1.suit === 'c' || card1.suit === 's' ) && (card2.suit === 'c' || card2.suit === 's' )
            || (card1.suit === 'd' || card1.suit === 'h' ) && (card2.suit === 'd' || card2.suit === 'h' );
    }
}