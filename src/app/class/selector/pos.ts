import {Deck} from "../table/deck";

export class Pos {
    x: number;
    y: number;
    order: string;

    constructor(x: number, y: number, order?: string) {
        this.x = x;
        this.y = y;
        this.order = order;
    }

    getOrderNumeric(deck: Deck): number {
        if (this.order === 'top')
            return deck.cards.length - 1;
        if (this.order === 'bottom')
            return 0;
        return parseInt(this.order);
    }
}