import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../layer/authenticationService";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['../style/login.scss']
})

export class Login {
    private username: string;
    private password: string;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    navigateCreateLogin(): void {
        this.router.navigate(['/createLogin']);
    }

    login(): void {
        this.authenticationService.login(this.username, this.password).then((success: boolean): void => {
            if (success)
                this.router.navigate(['/editor']);
        });
    }
}