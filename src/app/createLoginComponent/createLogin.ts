import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'create-login',
    templateUrl: './createLogin.html',
    // styleUrls: ['../style/editor.scss']
})

export class CreateLogin {
    constructor(private router: Router) {
    }
}