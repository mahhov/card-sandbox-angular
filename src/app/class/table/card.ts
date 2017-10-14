import {Table} from "./table";
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

    isHighlighted(table: Table): boolean {
        return this.highlightNumber === table.highlightsCount;
    }

    select(value: number): void {
        this.selectNumber = value;
    }

    isSelected(table: Table): boolean {
        return this.selectNumber === table.selectCount;
    }

    getColor(table: Table): string {
        return this.isSelected(table) ? '#bbf' : (this.isHighlighted(table) ? '#ffb' : '#fff');
    }
}