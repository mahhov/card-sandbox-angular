import * as _ from "underscore";
import {Deck} from "../deck";
import {Table} from "../table";
import {Condition} from "./condition";

export class NotEmpty extends Condition {
    x: number;
    y: number;

    constructor(words: string[]) {
        super();
        this.x = parseInt(words[1]);
        this.y = parseInt(words[2]);
    }

    verify(table: Table): boolean {
        return _.some(table.decks, (deck: Deck): boolean => {
            return deck.x === this.x && deck.y === this.y && deck.cards.length > 0;
        });
    }
}