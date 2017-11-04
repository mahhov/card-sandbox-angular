import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Script} from "../class/script";
import {LibraryService} from "../layer/libraryService";
import {TableCreatorService} from "../layer/tableCreatorService";

@Component({
    selector: 'library',
    templateUrl: './library.html',
    styleUrls: ['../style/library.scss']
})

export class Library {
    scriptList: Script[];
    selectedScript: number;

    constructor(private router: Router, private libraryService: LibraryService, private tableCreatorService: TableCreatorService) {
        this.scriptList = this.libraryService.getScriptList();
        this.selectedScript = 0;
    }

    demoScript(): void {
        // let demoScript: Script;
        // if (this.editingScriptBody) {
        //     demoScript = new Script(this.editingScriptName, null);
        //     demoScript.setScriptString(this.editingScriptBody);
        // } else
        //     demoScript = this.scriptList[this.selectedScript];
        //
        // this.tableCreatorService.demoScript = demoScript;
        // this.router.navigate(['/table']);
    }
}