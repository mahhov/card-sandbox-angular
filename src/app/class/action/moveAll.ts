import * as _ from "underscore";
import {Deck} from "../deck";
import {Table} from "../table";
import {Action} from "./action";

export class MoveAll extends Action {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    toOrder: string;

    constructor(words: string[]) {
        super();
        this.fromX = parseInt(words[1]);
        this.fromY = parseInt(words[2]);
        this.toX = parseInt(words[3]);
        this.toY = parseInt(words[4]);
        this.toOrder = words[5];
    }

    act(table: Table): void {
        let fromDeck: Deck = table.findDeck(this.fromX, this.fromY);
        let toDeck: Deck = table.findDeck(this.toX, this.toY);
        _.each(fromDeck.cards, (): void => {
            let fromCard: string[] = fromDeck.removeCard('top');
            toDeck.addCard(fromCard, this.toOrder);
        });
    }
}