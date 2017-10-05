import {Pos} from "../class/pos";
import {Component, ElementRef, ViewChild} from "@angular/core";
import {TableService} from "../layer/tableService";
import {Table} from "../class/table";
import {Deck} from "../class/deck";
import * as _ from "underscore";

@Component({
    selector: 'main-panel',
    templateUrl: './mainPanel.html',
    providers: [TableService]
})

export class MyDirective {
    @ViewChild('myCanvas') myCanvas: ElementRef;
    ctx: CanvasRenderingContext2D;
    readonly canvasWidth: number = 500;
    readonly canvasHeight: number = 500;
    readonly tableMargin: number = .02;
    tableWidth: number;
    tableHeight: number;
    cardSectionWidth: number;
    cardSectionHeight: number;
    cardWidth: number;
    cardHeight: number;
    fontHeight: number;
    cornerMargin: number;
    table: Table;

    constructor(tableService: TableService) {
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
        this.fontHeight = 4;
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
        this.drawCanvasText(centerText, left + width / 2, top + height / 2 + this.fontHeight);
    }

    drawHighlight(highlight: Pos): void {
        this.drawRect(highlight.x, highlight.y, '#ffb', '#000', '', '');
    }

    drawDeck(deck: Deck): void {
        this.drawRect(deck.x, deck.y, null, '#000', '', '' + deck.getString());
    }

    drawTable(table: Table): void {
        this.drawCanvasClear();
        this.setMetric(table.width, table.height);
        _.each(table.highlight, (highlight: Pos): void => {
            this.drawHighlight(highlight);
        });
        _.each(table.deck, (deck: Deck): void => {
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