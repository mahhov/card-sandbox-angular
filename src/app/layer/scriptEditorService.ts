import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Script} from "../class/script";
import {ScriptRepostiory} from "./scriptRepository";

@Injectable()
export class ScriptEditorService {
    private scriptList: Script[];

    constructor(private scriptRepostiory: ScriptRepostiory) {
        this.scriptList = _.map(['orange', 'yellow', 'three', 'elephant', 'potato', 'moonlight', 'Africa'], (x: string): Script => {
            return new Script(x, ['what', 'is', 'the', 'meaning', 'of', x]);
        });
    }

    public getScriptList(): Script[] {
        return this.scriptList
    }

    public add(name: string): void {
        if (this.contains(name))
            this.scriptList.push(new Script(name, []));
    }

    public find(name: string): Script {
        return name && _.find(this.scriptList, (script: Script): boolean => {
                return script.name === name
            });
    }

    public remove(name: string) {
        let index: number = _.findIndex(this.scriptList, (script: Script): boolean => {
            return script.name === name;
        });
        if (index !== -1)
            this.scriptList.splice(index, 1);
    }

    private contains(name: string): boolean {
        return name && !_.contains(_.pluck(this.scriptList, 'name'), name);
    }
}