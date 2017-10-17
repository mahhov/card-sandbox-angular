import {Component, ElementRef, ViewChild} from "@angular/core";
import * as _ from "underscore";
import {Pos} from "../class/selector/pos";
import {Card} from "../class/table/card";
import {Deck} from "../class/table/deck";
import {Rect} from "../class/table/rect";
import {Table} from "../class/table/table";
import {TableCreatorService} from "../layer/tableCreatorService";

@Component({
    selector: 'main-panel',
    templateUrl: './mainPanel.html',
    providers: [TableCreatorService]
})

export class MyDirective {
    @ViewChild('myCanvas') myCanvas: ElementRef;
    ctx: CanvasRenderingContext2D;
    readonly canvasWidth: number = 1000;
    readonly canvasHeight: number = 1000;
    readonly tableMargin: number = .02;
    readonly spreadShift: number = .2;
    tableWidth: number;
    tableHeight: number;
    cardSectionWidth: number;
    cardSectionHeight: number;
    cardWidth: number;
    cardHeight: number;
    fontWidth: number;
    fontHeight: number;
    cornerMargin: number;
    table: Table;

    constructor(tableService: TableCreatorService) {
        this.table = tableService.getTable();
    }

    private ngAfterViewInit() {
        this.ctx = this.myCanvas.nativeElement.getContext('2d');
        this.drawTable();
    }

    private setMetric(tableWidth: number, tableHeight: number): void {
        this.tableWidth = tableWidth;
        this.tableHeight = tableHeight;
        this.cardSectionWidth = (1 - this.tableMargin) / tableWidth;
        this.cardSectionHeight = (1 - this.tableMargin) / tableHeight;
        this.cardWidth = this.cardSectionWidth - this.tableMargin;
        this.cardHeight = this.cardSectionHeight - this.tableMargin;
        this.fontWidth = 2.5;
        this.fontHeight = 8;
        this.cornerMargin = 5;
    }

    // --- handle input ---

    private click(x: number, y: number): void {
        let coord: Pos = this.tableCoordinate(x, y);

        if (coord)
            this.table.handleClick(coord);

        this.drawTable();
    }

    private mouse(x: number, y: number): void {
        let coord: Pos = this.tableCoordinate(x, y);

        if (coord)
            this.table.handleMouse(coord);

        this.drawTable();
    }

    private tableCoordinate(canvasX: number, canvasY: number): Pos {
        let x: number = -1;
        let y: number = -1;
        let order: string = '';

        _.each(this.table.decks, (deck: Deck): void => {
            if (!deck.cards.length && this.getCardRect(deck, 0).contains(canvasX, canvasY)) {
                x = deck.x;
                y = deck.y;
                order = 'top';
            }
        });

        _.each(this.table.decks, (deck: Deck): void => {
            _.times(deck.cards.length, (cardIndex: number): void => {
                if (this.getCardRect(deck, cardIndex).contains(canvasX, canvasY)) {
                    x = deck.x;
                    y = deck.y;
                    order = cardIndex + '';
                }
            });
        });

        return new Pos(x, y, order);
    }

    // --- table drawing

    private drawTable(): void {
        this.drawCanvasClear();
        this.setMetric(this.table.width, this.table.height);
        _.each(this.table.decks, (deck: Deck): void => {
            this.drawDeck(deck);
        });
    }

    private drawDeck(deck: Deck): void {
        if (!deck.cards.length)
            this.drawCard(this.getCardRect(deck, 0), '', deck.getString());

        _.each(deck.cards, (card: Card, cardIndex: number): void => {
            let cardRect: Rect = this.getCardRect(deck, cardIndex);
            let centerText: string = deck.getCardString(card);
            let cornerText: string = deck.cards.length <= 1 ? '' : (deck.horiz !== 0 || deck.vert !== 0 ? centerText : deck.cards.length + '' );
            this.drawCard(cardRect, cornerText, deck.getCardString(card));
        });
    }

    private drawCard(cardRect: Rect, cornerText: string, centerText: string) {
        this.drawCanvasRect(cardRect.left, cardRect.top, cardRect.width, cardRect.height, cardRect.color, true);
        this.drawCanvasRect(cardRect.left, cardRect.top, cardRect.width, cardRect.height, '#000', false);
        this.drawCanvasText(cornerText, cardRect.left + this.cornerMargin, cardRect.top + this.fontHeight + this.cornerMargin);
        this.drawCanvasText(centerText, cardRect.left + cardRect.width / 2 - this.fontWidth * centerText.length, cardRect.top + cardRect.height / 2 + this.fontHeight / 2);
    }

    // --- util ---

    private getCardRect(deck: Deck, cardIndex: number): Rect {
        let x: number = deck.x;
        let y: number = deck.y;

        if (deck.cards.length > 1 && deck.horiz !== 0)
            x += deck.horiz > 0 ? deck.horiz * cardIndex / (deck.cards.length - 1) : this.spreadShift * cardIndex;
        else if (deck.cards.length > 1 && deck.vert !== 0)
            y += deck.vert > 0 ? deck.vert * cardIndex / (deck.cards.length - 1) : this.spreadShift * cardIndex;

        let left: number = (x * this.cardSectionWidth + this.tableMargin) * this.canvasWidth;
        let top: number = (y * this.cardSectionHeight + this.tableMargin) * this.canvasHeight;
        let width: number = this.cardWidth * this.canvasWidth;
        let height: number = this.cardHeight * this.canvasHeight;

        let color: string = deck.cards[cardIndex] ? deck.cards[cardIndex].getDrawColor(this.table) : '#fff';

        return new Rect(left, top, width, height, color);
    }

    // --- canvas drawing ---

    private drawCanvasClear(): void {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    private drawCanvasRect(left: number, top: number, width: number, height: number, color: string, fill: boolean): void {
        this.ctx.fillStyle = color;
        if (fill)
            this.ctx.fillRect(left, top, width, height);
        else
            this.ctx.strokeRect(left, top, width, height);
    }

    private drawCanvasText(text: string, left: number, bottom: number): void {
        this.ctx.strokeText(text, left, bottom);
    }
}