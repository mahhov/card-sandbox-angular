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
    @ViewChild("myCanvas") myCanvas: ElementRef;
    ctx: CanvasRenderingContext2D;
    readonly canvasWidth: number = 500;
    readonly canvasHeight: number = 500;
    readonly tableMargin: number = .02;
    cardSectionWidth: number;
    cardSectionHeight: number;
    cardWidth: number;
    cardHeight: number;
    table: Table;

    constructor(tableService: TableService) {
        this.table = tableService.getTable();
    }

    ngAfterViewInit() {
        this.ctx = this.myCanvas.nativeElement.getContext("2d");
        this.drawTable(this.table);
    }

    setMetric(tableWidth: number, tableHeight: number): void {
        this.cardSectionWidth = (1 - this.tableMargin) / tableWidth;
        this.cardSectionHeight = (1 - this.tableMargin) / tableHeight;
        this.cardWidth = this.cardSectionWidth - this.tableMargin;
        this.cardHeight = this.cardSectionHeight - this.tableMargin;
    }

    drawRect(left: number, top: number, width: number, height: number, color: string): void {
        this.ctx.fillStyle = "color";
        this.ctx.strokeRect(left, top, width, height);
    }

    drawText(text: string, left: number, bottom: number): void {
        this.ctx.strokeText(text, left, bottom);
    }

    drawCard(x: number, y: number, card: string): void {
        let left: number = (x * this.cardSectionWidth + this.tableMargin) * this.canvasWidth;
        let top: number = (y * this.cardSectionHeight + this.tableMargin) * this.canvasHeight;
        let width: number = this.cardWidth * this.canvasWidth;
        let height: number = this.cardHeight * this.canvasHeight;
        this.drawRect(left, top, width, height, "0");
        this.drawText("card", left + width / 2, top + height / 2)
    }

    drawTable(table: Table): void {
        this.setMetric(table.width, table.height);
        _.each(table.deck, (deck: Deck) => {
            this.drawCard(deck.x, deck.y, "");
        });
    }
}