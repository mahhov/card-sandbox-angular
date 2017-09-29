import {Component, ElementRef, ViewChild} from "@angular/core";

@Component({
    selector: 'main-panel',
    templateUrl: './mainPanel.html'
})

export class MyDirective {
    @ViewChild("myCanvas") myCanvas: ElementRef;
    ctx: CanvasRenderingContext2D;

    ngAfterViewInit() {
        var canvas = this.myCanvas.nativeElement;
        this.ctx = canvas.getContext("2d");

        this.drawRect(50, 50, 400, 400, "0")
    }

    drawRect(left: number, top: number, width: number, height: number, color: string): void {
        this.ctx.fillStyle = "color";
        this.ctx.fillRect(left, top, width, height);
    }
}