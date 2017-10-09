import {Table} from "../table";

export class Condition {
    static create(words: string[]): Condition {
        return null;
    }

    verify(table: Table): boolean {
        return true;
    }
}