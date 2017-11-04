import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Script} from "../class/script";
import {ScriptEntity} from "../class/scriptEntity";
import {AuthenticationService} from "./authenticationService";
import {ScriptRepository} from "./scriptRepository";

@Injectable()
export class ScriptEditorService {
    private scriptList: Script[];

    constructor(private authenticationService: AuthenticationService, private scriptRepository: ScriptRepository) {
    }

    public getScriptList(): Script[] {
        this.scriptList = [];
        this.scriptRepository.getAllByUser(this.authenticationService.getUser()).then((scriptList: ScriptEntity[]): void => {
            _.each(scriptList, (scriptEntity: ScriptEntity): void => {
                this.scriptList.push(ScriptEntity.toScript(scriptEntity));
            });
        });
        return this.scriptList;
    }

    public add(name: string): void {
        if (this.contains(name))
            this.scriptList.push(new Script(name, []));
    }

    public update(name: string, body: string): void {
        this.add(name);
        this.find(name).setScriptString(body);
        this.scriptRepository.update(this.authenticationService.getToken(), this.authenticationService.getUser(), name, body);
    }

    public remove(name: string): void {
        let index: number = _.findIndex(this.scriptList, (script: Script): boolean => {
            return script.name === name;
        });
        if (index !== -1) {
            this.scriptList.splice(index, 1);
            this.scriptRepository.remove(this.authenticationService.getToken(), this.authenticationService.getUser(), name);
        }
    }

    private find(name: string): Script {
        return name && _.find(this.scriptList, (script: Script): boolean => {
                return script.name === name
            });
    }

    private contains(name: string): boolean {
        return name && !_.contains(_.pluck(this.scriptList, 'name'), name);
    }
}