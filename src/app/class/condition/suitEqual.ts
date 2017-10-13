import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Table} from "../table";
import {Condition} from "./condition";

export class SuitEqual extends Condition {
    selector: Selector;
    value: string;

    constructor(words: string[]) {
        super();
        this.selector = SelectorCreator.create(_.rest(words));
        this.value = words[this.selector.consumed + 1];
    }

    verify(table: Table): boolean {
        let pos: Pos = this.selector.select(table)[0];
        let card: string[] = table.findDeck(pos.x, pos.y).getCard(pos.order);

        return card[0] === this.value;
    }
}