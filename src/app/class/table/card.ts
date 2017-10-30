import {Table} from "./table";

export class Card {
    private static DRAW_COLOR_SELECTED = '#bbf';
    private static DRAW_COLOR_HIGHLIGHTED = '#ffb';
    private static DRAW_COLOR_BLACK = '#fff';
    private static DRAW_COLOR_RED = '#fff';
    private static TEXT_COLOR_BLACK = '#000';
    private static TEXT_COLOR_RED = '#f00';

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

    isHighlighted(table: Table): boolean {
        return this.highlightNumber === table.highlightsCount;
    }

    select(value: number): void {
        this.selectNumber = value;
    }

    isSelected(table: Table): boolean {
        return this.selectNumber === table.selectCount;
    }

    isRed(): boolean {
        return this.suit === 'h' || this.suit === 'd';
    }

    getDrawColor(table: Table): string {
        if (this.isSelected(table))
            return Card.DRAW_COLOR_SELECTED;
        if (this.isHighlighted(table))
            return Card.DRAW_COLOR_HIGHLIGHTED;
        if (this.isRed())
            return Card.DRAW_COLOR_RED;
        return Card.DRAW_COLOR_BLACK;
    }

    getDrawTextColor() {
        console.log('hi', this.isRed());
        if (this.isRed())
            return Card.TEXT_COLOR_RED;
        return Card.TEXT_COLOR_BLACK;
    }
}