import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'library',
    templateUrl: './library.html',
    // styleUrls: ['../style/editor.scss']
})

export class Library {
    constructor(private router: Router) {
    }
}