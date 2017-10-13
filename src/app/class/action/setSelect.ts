import * as _ from "underscore";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Table} from "../table/table";
import {Action} from "./action";

export class SetSelect extends Action {
    toSelect: Selector;

    constructor(words: string[]) {
        super();
        this.toSelect = SelectorCreator.create(_.rest(words));
    }

    act(table: Table): void {
        table.select = this.toSelect.select(table)[0];
    }
}