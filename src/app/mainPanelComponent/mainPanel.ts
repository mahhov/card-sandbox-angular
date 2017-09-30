import {Component, ElementRef, ViewChild} from "@angular/core";
import {ExampleService} from "../layer/tableService";
import * as _ from "underscore";

@Component({
    selector: 'main-panel',
    templateUrl: './mainPanel.html',
    providers: [ExampleService]
})

export class MyDirective {
    @ViewChild("myCanvas") myCanvas: ElementRef;
    ctx: CanvasRenderingContext2D;
    readonly canvasWidth: number = 500;
    readonly canvasHeight: number = 500;
    readonly tableWidth: number = 10;
    readonly tableHeight: number = 6;
    readonly tableMargin: number = .02;
    readonly cardSectionWidth: number = (1 - this.tableMargin) / this.tableWidth;
    readonly cardSectionHeight: number = (1 - this.tableMargin) / this.tableHeight;
    readonly cardWidth: number = this.cardSectionWidth - this.tableMargin;
    readonly cardHeight: number = this.cardSectionHeight - this.tableMargin;

    ngAfterViewInit() {
        this.ctx = this.myCanvas.nativeElement.getContext("2d");

        _.times(50, () => {
            let x = _.random(0, this.tableWidth - 1);
            let y = _.random(0, this.tableHeight - 1);
            this.drawCard(x, y, "x");
        });
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
}