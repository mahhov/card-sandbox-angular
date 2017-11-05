import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {nodeUrl} from "../../environments/environment";
import {ScriptEntity} from "../class/scriptEntity";

@Injectable()
export class ScriptRepository {
    constructor(private http: HttpClient) {
    }

    public getAll(): Promise<ScriptEntity[]> {
        return this.http.get<ScriptEntity[]>(nodeUrl + 'scripts').toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public getAllByUser(user: string): Promise<ScriptEntity[]> {
        return this.http.get<ScriptEntity[]>(nodeUrl + 'script/' + user).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public get(user: string, name: string): Promise<ScriptEntity> {
        return this.http.get<ScriptEntity>(nodeUrl + 'script/' + user + '/' + name).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public update(token: string, user: string, name: string, body: string): void {
        let headers: HttpHeaders = new HttpHeaders().append('authenticationToken', token);
        let options = {responseType: 'text' as 'text', headers: headers};
        this.http.put(nodeUrl + 'script/' + user + '/' + name, body, options).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public remove(token: string, user: string, name: string): void {
        let headers: HttpHeaders = new HttpHeaders().append('authenticationToken', token);
        let options = {responseType: 'text' as 'text', headers: headers};
        this.http.delete(nodeUrl + 'script/' + user + '/' + name, options).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }
}