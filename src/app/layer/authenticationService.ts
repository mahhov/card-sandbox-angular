import {Injectable} from "@angular/core";
import {AuthenticationRepostiory} from "./authenticationRepository";

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private authenticationRepository: AuthenticationRepostiory) {
    }

    public createUser(username: string, password: string): void {
        this.authenticationRepository.createUser(username, password).then((token: string): void => {
            this.token = token;
        });
    }

    public login(username: string, password: string): void {
        this.authenticationRepository.getToken(username, password).then((token: string): void => {
            this.token = token;
        });
    }
}