import {Injectable} from "@angular/core";
import {AuthenticationRepostiory} from "./authenticationRepository";

@Injectable()
export class AuthenticationService {
    private user: string;
    private token: string;

    constructor(private authenticationRepository: AuthenticationRepostiory) {
    }

    public getUser(): string {
        return this.user;
    }

    public getToken(): string {
        return this.token;
    }

    public createUser(username: string, password: string): Promise<boolean> {
        return this.authenticationRepository.createUser(username, password).then((token: string): boolean => {
            this.user = username;
            this.token = token;
            return !!token;
        });
    }

    public login(username: string, password: string): Promise<boolean> {
        return this.authenticationRepository.getToken(username, password).then((token: string): boolean => {
            this.user = username;
            this.token = token;
            return !!token;
        });
    }
}