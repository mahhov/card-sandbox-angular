import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ScriptEntity} from "../class/scriptEntity";

@Injectable()
export class ScriptRepostiory {
    constructor(private http: HttpClient) {
    }

    public getAll(user: String): Promise<ScriptEntity[]> {
        return this.http.get('http://localhost:8080/script/' + user).toPromise();
    }

    public get(user: String, name: String): Promise<ScriptEntity> {
        return this.http.get('http://localhost:8080/script/' + user + '/' + name).toPromise();
    }

    public update(user: String, name: String, body: String): void {
        this.http.put('http://localhost:8080/script/' + user + '/' + name, body);
    }

    public remove(user: String, name: String): void {
        this.http.delete('http://localhost:8080/script/' + user + '/' + name);
    }
}