import {Condition} from "./condition";
import {NotEmpty} from "./notEmpty";
import {Empty} from "./empty";

export class ConditionCreator {
    static create(words: string[]): Condition {
        if (words[0] === 'notempty')
            return new NotEmpty(words);
        else if (words[0] === 'empty')
            return new Empty(words);
        return null;
    }
}