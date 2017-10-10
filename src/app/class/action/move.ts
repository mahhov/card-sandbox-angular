import {Deck} from "../deck";
import {Table} from "../table";
import {Action} from "./action";

export class Move extends Action {
    fromX: number;
    fromY: number;
    fromOrder: string;
    toX: number;
    toY: number;
    toOrder: string;

    constructor(words: string[]) {
        super();
        this.fromX = parseInt(words[1]);
        this.fromY = parseInt(words[2]);
        this.fromOrder = words[3];
        this.toX = parseInt(words[4]);
        this.toY = parseInt(words[5]);
        this.toOrder = words[6];
    }

    act(table: Table): void {
        let fromDeck: Deck = table.findDeck(this.fromX, this.fromY);
        let toDeck: Deck = table.findDeck(this.toX, this.toY);
        let fromCard: string[] = fromDeck.removeCard(this.fromOrder);
        toDeck.addCard(fromCard, this.toOrder);
    }
}