import {Component} from "@angular/core";
import {Script} from "../class/script";
import {ScriptEditorService} from "../layer/scriptEditorService";

@Component({
    selector: 'editor',
    templateUrl: './editor.html',
})

export class Editor {
    scriptList: Script[];
    selectedScript: Script;
    editingScript: Script;
    editingScriptName: string;
    editingScriptBody: string;

    constructor(private scriptRepository: ScriptEditorService) {
        this.scriptList = this.scriptRepository.getScriptList();
        this.selectedScript = this.scriptList[0];
    }

    newScript(): void {
        this.scriptRepository.add(this.editingScriptName);
    }

    editScript(): void {
        this.editingScript = this.selectedScript;
        this.editingScriptName = this.selectedScript.name;
        this.editingScriptBody = this.editingScript.getScriptString();
    }

    saveScript(): void {
        this.scriptRepository.add(this.editingScriptName);
        this.editingScript = this.scriptRepository.find(this.editingScriptName);
        this.editingScript.setScriptString(this.editingScriptBody);
    }

    deleteScript(): void {
        this.scriptRepository.remove(this.editingScriptName);
    }

    nothing(): void {
    }
}