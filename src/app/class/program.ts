import * as _ from "underscore";

export class Program {
    init: string[] = [];
    interacts: string [][] = [];

    addInit(initLine: string): void {
        this.init.push(initLine);
    }

    newInteract(): void {
        this.interacts.push([])
    }

    addInteract(interactLine: string): void {
        _.last(this.interacts).push(interactLine);
    }
}