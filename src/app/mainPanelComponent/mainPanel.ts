import {Pos} from "../class/pos";
import {Component, ElementRef, ViewChild} from "@angular/core";
import {TableCreatorService} from "../layer/tableCreatorService";
import {Table} from "../class/table";
import {Deck} from "../class/deck";
import * as _ from "underscore";

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

    ngAfterViewInit() {
        this.ctx = this.myCanvas.nativeElement.getContext('2d');
        this.drawTable(this.table);
    }

    setMetric(tableWidth: number, tableHeight: number): void {
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

    drawCanvasClear(): void {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawCanvasRect(left: number, top: number, width: number, height: number, color: string, fill: boolean): void {
        this.ctx.fillStyle = color;
        if (fill)
            this.ctx.fillRect(left, top, width, height);
        else
            this.ctx.strokeRect(left, top, width, height);
    }

    drawCanvasText(text: string, left: number, bottom: number): void {
        this.ctx.strokeText(text, left, bottom);
    }

    drawRect(x: number, y: number, color: string, borderColor: string, cornerText: string, centerText: string) {
        let left: number = (x * this.cardSectionWidth + this.tableMargin) * this.canvasWidth;
        let top: number = (y * this.cardSectionHeight + this.tableMargin) * this.canvasHeight;
        let width: number = this.cardWidth * this.canvasWidth;
        let height: number = this.cardHeight * this.canvasHeight;
        if (color)
            this.drawCanvasRect(left, top, width, height, color, true);
        this.drawCanvasRect(left, top, width, height, borderColor, false);
        this.drawCanvasText(cornerText, left + this.cornerMargin, top + this.fontHeight + this.cornerMargin);
        this.drawCanvasText(centerText, left + width / 2 - this.fontWidth * centerText.length, top + height / 2 + this.fontHeight / 2);
    }

    drawHighlight(highlight: Pos): void {
        this.drawRect(highlight.x, highlight.y, '#ffb', '#000', '', '');
    }

    drawSelect(highlight: Pos): void {
        this.drawRect(highlight.x, highlight.y, '#bbf', '#000', '', '');
    }

    drawDeck(deck: Deck): void {
        if (deck.cards.length > 1 && deck.horiz !== 0) {
            _.each(deck.cards, (card: string[], index: number): void => {
                let text: string = deck.getCardString(card);
                let shift: number = deck.horiz > 0 ? deck.horiz * index / (deck.cards.length - 1) : this.spreadShift * index;
                this.drawRect(deck.x + shift, deck.y, '#fff', '#000', text, text);
            });
        } else if (deck.cards.length > 1 && deck.vert !== 0) {
            _.each(deck.cards, (card: string[], index: number): void => {
                let text: string = deck.getCardString(card);
                let shift: number = deck.vert > 0 ? deck.vert * index / (deck.cards.length - 1) : this.spreadShift * index;
                this.drawRect(deck.x, deck.y + shift, '#fff', '#000', text, text);
            });
        } else if (deck.cards.length > 1)
            this.drawRect(deck.x, deck.y, null, '#fff', deck.cards.length + '', deck.getString());
        else
            this.drawRect(deck.x, deck.y, null, '#fff', '', deck.getString());
    }

    drawTable(table: Table): void {
        this.drawCanvasClear();
        this.setMetric(table.width, table.height);
        _.each(table.highlights, (highlight: Pos): void => {
            this.drawHighlight(highlight);
        });
        if (table.select)
            this.drawSelect(table.select);
        _.each(table.decks, (deck: Deck): void => {
            this.drawDeck(deck);
        });
    }

    click(x: number, y: number): void {
        let coord: Pos = this.coordinate(x, y);

        if (coord)
            this.table.handleClick(coord);

        this.drawTable(this.table);
    }

    mouse(x: number, y: number): void {
        let coord: Pos = this.coordinate(x, y);

        if (coord)
            this.table.handleMouse(coord);

        this.drawTable(this.table);
    }

    private coordinate(canvasX: number, canvasY: number): Pos {
        let ratioX: number = canvasX / this.canvasWidth;
        let ratioY: number = canvasY / this.canvasHeight;
        let actualX: number = -1;
        let actualY: number = -1;
        let tryX: number = 0;
        let tryY: number = 0;

        while (true) {
            if ((ratioX -= this.tableMargin) < 0)
                break;
            if ((ratioX -= this.cardWidth) < 0)
                actualX = tryX;
            tryX++;
        }

        while (true) {
            if ((ratioY -= this.tableMargin) < 0)
                break;
            if ((ratioY -= this.cardHeight) < 0)
                actualY = tryY;
            tryY++;
        }

        if (actualX != -1 && actualY != -1)
            return new Pos(actualX, actualY);

        return null;
    }
}