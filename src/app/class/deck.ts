import {Table} from "./table";
import * as _ from "underscore";

export class Deck {
    x: number;
    y: number;
    contain: string;
    order: string;
    visibility: string;
    cards: string[];

    constructor() {
        this.contain = Table.possibleDeckContain[0];
        this.order = Table.possibleDeckOrder[0];
        this.visibility = Table.possibleDeckVisibility[0];
    }

    setPos(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    setProperties(words: string[]) {
        _.each(words, function (word) {
            if (_.contains(Table.possibleDeckContain, word))
                this.contain = word;
            else if (_.contains(Table.possibleDeckOrder, word))
                this.order = word;
            else if (_.contains(Table.possibleDeckVisibility, word))
                this.visibility = word;
        });
        if (this.contain === 'full')
            this.cards = Table.fullDeck.slice();
        if (this.order === 'shuffle')
            this.cards = _.shuffle(this.cards) as string[];
    }
}