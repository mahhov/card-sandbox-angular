import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Script} from "../class/script";
import {LibraryService} from "../service/libraryService";
import {TableCreatorService} from "../service/tableCreatorService";

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
        this.tableCreatorService.setDemoScript(this.scriptList[this.selectedScript]);
        this.router.navigate(['/table']);
    }
}