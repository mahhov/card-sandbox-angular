import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

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

        let options = {responseType: 'text' as 'text'};
        return this.http.post('http://localhost:8080/token', body, options).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }
}

interface AuthenticationBody {
    name: string;
    password: string;
}