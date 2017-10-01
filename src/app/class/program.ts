import * as _ from "underscore";

export class Program {
    init: string[];
    interact: string [][];

    newInteract(): void {
        this.interact.push([])
    }

    addInit(initLine: string): void {
        this.init.push(initLine);
    }

    addInteract(interactLine: string): void {
        _.last(this.interact).push(interactLine);
    }
}