export class Card {
    suit: string;
    num: number;
    highlightNumber: number;
    selectNumber: number;

    constructor(suit: string, num: number) {
        this.suit = suit;
        this.num = num;
    }

    highlight(value: number): void {
        this.highlightNumber = value;
    }

    select(value: number): void {
        this.selectNumber = value;
    }
}