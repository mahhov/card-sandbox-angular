import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    // styleUrls: ['../style/editor.scss']
})

export class Login {
    constructor(private router: Router) {
    }
}