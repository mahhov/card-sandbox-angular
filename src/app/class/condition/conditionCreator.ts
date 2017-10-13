import {Condition} from "./condition";
import {Empty} from "./empty";
import {NotEmpty} from "./notEmpty";
import {Numeric} from "./numeric";
import {NumericDif} from "./numericDif";
import {SuitSame} from "./suitSame";

export class ConditionCreator {
    static create(words: string[]): Condition {
        if (words[0] === 'notempty')
            return new NotEmpty(words);
        else if (words[0] === 'empty')
            return new Empty(words);
        else if (words[0] === 'suitsame')
            return new SuitSame(words);
        else if (words[0] === 'numeric')
            return new Numeric(words);
        else if (words[0] === 'numericdif')
            return new NumericDif(words);
        return null;
    }
}