import * as _ from "underscore";

export class Script {
    name: string;
    lines: string [] = [];

    constructor(name: string, lines: string[]) {
        this.name = name;
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