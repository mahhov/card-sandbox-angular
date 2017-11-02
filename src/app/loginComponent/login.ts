import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['../style/login.scss']
})

export class Login {
    private user: string;

    constructor(private router: Router) {
    }

    navigateCreateLogin(): void {
        this.router.navigate(['/createLogin', this.user]);
    }

    login(): void {
        
    }
}