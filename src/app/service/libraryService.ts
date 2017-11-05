import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Script} from "../class/script";
import {ScriptEntity} from "../class/scriptEntity";
import {ScriptRepository} from "../repository/scriptRepository";

@Injectable()
export class LibraryService {
    private scriptList: Script[];

    constructor(private scriptRepository: ScriptRepository) {
    }

    public getScriptList(): Script[] {
        this.scriptList = [];
        this.scriptRepository.getAll().then((scriptList: ScriptEntity[]): void => {
            _.each(scriptList, (scriptEntity: ScriptEntity): void => {
                this.scriptList.push(ScriptEntity.toScript(scriptEntity));
            });
        });
        return this.scriptList;
    }
}