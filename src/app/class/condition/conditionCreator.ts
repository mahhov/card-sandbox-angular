import {Condition} from "./condition";
import {Empty} from "./empty";
import {NotEmpty} from "./notEmpty";
import {NumericDif} from "./numericDif";
import {NumericEqual} from "./numericEqual";
import {SuitEqual} from "./suitEqual";
import {SuitSame} from "./suitSame";

export class ConditionCreator {
    static create(words: string[]): Condition {
        if (words[0] === 'notempty')
            return new NotEmpty(words);
        else if (words[0] === 'empty')
            return new Empty(words);
        else if (words[0] === 'suitsame')
            return new SuitSame(words);
        else if (words[0] === 'numericequal')
            return new NumericEqual(words);
        else if (words[0] === 'numericdif')
            return new NumericDif(words);
        else if (words[0] === 'suitequal')
            return new SuitEqual(words);
        return null;
    }
}