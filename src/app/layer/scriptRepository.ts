import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Script} from "../class/script";

@Injectable()
export class ScriptRepository {
    private scriptList: Script[];

    constructor() {
        this.scriptList = _.map(['orange', 'yellow', 'three', 'elephant', 'potato', 'moonlight', 'Africa'], (x: string): Script => {
            return new Script(x, ['what', 'is', 'the', 'meaning', 'of', x]);
        });
    }

    public getScriptList(): Script[] {
        return this.scriptList
    }

    public add(name: string): Script[] {
        if (name && !_.contains(_.pluck(this.scriptList, 'name'), name))
            this.scriptList.push(new Script(name, []));
        return this.scriptList;
    }
}