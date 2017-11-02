import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ScriptEntity} from "../class/scriptEntity";

@Injectable()
export class ScriptRepository {
    constructor(private http: HttpClient) {
    }

    public getAll(): Promise<ScriptEntity[]> {
        return this.http.get<ScriptEntity[]>('http://localhost:8080/script').toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public getAllByUser(user: string): Promise<ScriptEntity[]> {
        return this.http.get<ScriptEntity[]>('http://localhost:8080/script/' + user).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public get(user: string, name: string): Promise<ScriptEntity> {
        return this.http.get<ScriptEntity>('http://localhost:8080/script/' + user + '/' + name).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public update(token: string, user: string, name: string, body: string): void {
        this.http.put('http://localhost:8080/script/' + user + '/' + name, body, {responseType: 'text'}).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public remove(token: string, user: string, name: string): void {
        this.http.delete('http://localhost:8080/script/' + user + '/' + name, {responseType: 'text'}).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }
}