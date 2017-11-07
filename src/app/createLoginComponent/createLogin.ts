import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authenticationService";

@Component({
    selector: 'create-login',
    templateUrl: './createLogin.html',
    styleUrls: ['../style/login.scss']
})

export class CreateLogin {
    username: string;
    password: string;
    passwordConfirm: string;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    navigateLogin(): void {
        this.router.navigate(['/login']);
    }

    createUser(): void {
        if (this.password !== this.passwordConfirm)
            return;
        this.authenticationService.createUser(this.username, this.password).then((success: boolean): void => {
            if (success)
                this.router.navigate(['/editor']);
        });
    }
}