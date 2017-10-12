import {Condition} from "./condition";
import {Empty} from "./empty";
import {EqualSuit} from "./equalsuit";
import {NotEmpty} from "./notEmpty";
import {Numeric} from "./numeric";
import {NumericDif} from "./numericDif";

export class ConditionCreator {
    static create(words: string[]): Condition {
        if (words[0] === 'notempty')
            return new NotEmpty(words);
        else if (words[0] === 'empty')
            return new Empty(words);
        else if (words[0] === 'equalsuit')
            return new EqualSuit(words);
        else if (words[0] === 'numeric')
            return new Numeric(words);
        else if (words[0] === 'numericdif')
            return new NumericDif(words);
        return null;
    }
}