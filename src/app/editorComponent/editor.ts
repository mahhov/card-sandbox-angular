import {Component} from "@angular/core";
import {Script} from "../class/script";
import {ScriptEditorService} from "../layer/scriptEditorService";

@Component({
    selector: 'editor',
    templateUrl: './editor.html',
})

export class Editor {
    scriptList: Script[];
    selectedScript: number;
    editingScriptName: string;
    editingScriptBody: string;

    constructor(private scriptEditorService: ScriptEditorService) {
        this.scriptList = this.scriptEditorService.getScriptList();
        this.selectedScript = 0;
    }

    newScript(): void {
        this.scriptEditorService.add(this.editingScriptName);
    }

    editScript(): void {
        this.editingScriptName = this.scriptList[this.selectedScript].name;
        this.editingScriptBody = this.scriptList[this.selectedScript].getScriptString();
    }

    saveScript(): void {
        this.scriptEditorService.update(this.editingScriptName, this.editingScriptBody);
    }

    deleteScript(): void {
        this.scriptEditorService.remove(this.editingScriptName);
    }

    nothing(): void {
        console.log(this.scriptList[this.selectedScript]);
    }
}