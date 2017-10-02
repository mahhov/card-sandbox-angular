import * as _ from "underscore";

export class Program {
    init: string[] = [];
    interact: string [][] = [];

    addInit(initLine: string): void {
        this.init.push(initLine);
    }

    newInteract(): void {
        this.interact.push([])
    }

    addInteract(interactLine: string): void {
        _.last(this.interact).push(interactLine);
    }
}