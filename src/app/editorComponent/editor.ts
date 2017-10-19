import {Component} from "@angular/core";
import {Script} from "../class/script";
import {ScriptRepository} from "../layer/scriptRepository";

@Component({
    selector: 'editor',
    templateUrl: './editor.html',
    providers: [ScriptRepository]
})

export class Editor {
    scriptList: Script[];
    selectedScript: Script;
    programName: string;

    constructor(private scriptRepository: ScriptRepository) {
        this.scriptList = this.scriptRepository.getScriptList();
        this.selectedScript = this.scriptList[0];
        console.log('construct', this.scriptList);
    }

    ngOnInit() {
        this.scriptList = this.scriptRepository.getScriptList();
        this.selectedScript = this.scriptList[0];
        console.log('init', this.scriptList);
    }

    newFile(name: string): void {
        this.scriptList = this.scriptRepository.add(name);
    }

    editFile(): void {
    }

    saveFile(): void {
    }

    nothing(): void {
    }
}