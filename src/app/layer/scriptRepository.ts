import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ScriptEntity} from "../class/scriptEntity";

@Injectable()
export class ScriptRepostiory {
    constructor(private http: HttpClient) {
    }

    public getAll(): Promise<ScriptEntity[]> {
        return this.http.get<ScriptEntity[]>('http://localhost:8080/script').toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public getAllByUser(user: String): Promise<ScriptEntity[]> {
        return this.http.get<ScriptEntity[]>('http://localhost:8080/script/' + user).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public get(user: String, name: String): Promise<ScriptEntity> {
        return this.http.get<ScriptEntity>('http://localhost:8080/script/' + user + '/' + name).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public update(user: String, name: String, body: String): void {
        this.http.put('http://localhost:8080/script/' + user + '/' + name, body, {responseType: 'text'}).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public remove(user: String, name: String): void {
        this.http.delete('http://localhost:8080/script/' + user + '/' + name, {responseType: 'text'}).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }
}