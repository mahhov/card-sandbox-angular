import * as _ from "underscore";

export class Script {
    name: string;
    owner: string;
    title: string;
    lines: string [] = [];

    constructor(name: string, owner: string, lines: string[]) {
        this.name = name;
        this.owner = owner;
        this.title = this.name + " - " + this.owner;
        this.lines = lines;
    }

    getScriptString(): string {
        let r: string = '';
        _.each(this.lines, (line: string): void => {
            r += line + '\n';
        });
        return r;
    }

    setScriptString(bodyScript: string): void {
        this.lines = bodyScript.split('\n');
    }
}