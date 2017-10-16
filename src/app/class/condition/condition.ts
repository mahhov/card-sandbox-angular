import {Table} from "../table/table";

export class Condition {
    not: boolean;

    constructor(not: boolean) {
        this.not = not;
    }

    verify(table: Table): boolean {
        return this.verifyValue(table) !== this.not;
    }

    verifyValue(table: Table): boolean {
        return true;
    }
}