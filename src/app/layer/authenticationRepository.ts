import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ScriptEntity} from "../class/scriptEntity";

@Injectable()
export class AuthenticationRepostiory {
    constructor(private http: HttpClient) {
    }

    public createUser(username: string, password: string): Promise<string> {
        let body: AuthenticationBody = {
            'name': username,
            'password': password
        };
        return this.http.post<string>('http://localhost:8080/user', body).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public getToken(username: string, password: string): Promise<string> {
        let body: AuthenticationBody = {
            'name': username,
            'password': password
        };
        return this.http.post<string>('http://localhost:8080/token', body).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }
}

interface AuthenticationBody {
    name: string;
    password: string;
}