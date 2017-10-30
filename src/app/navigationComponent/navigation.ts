import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.html',
})

export class Navigation {
    constructor(private router: Router) {
    }
}