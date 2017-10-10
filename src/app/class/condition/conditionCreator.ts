import {Condition} from "./condition";
import {Empty} from "./empty";
import {NotEmpty} from "./notEmpty";

export class ConditionCreator {
    static create(words: string[]): Condition {
        if (words[0] === 'notempty')
            return new NotEmpty(words);
        else if (words[0] === 'empty')
            return new Empty(words);
        return null;
    }
}