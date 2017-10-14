import {Condition} from "./condition";
import {Empty} from "./empty";
import {NotEmpty} from "./notEmpty";
import {NumericDif} from "./numericDif";
import {NumericEqual} from "./numericEqual";
import {SuitEqual} from "./suitEqual";
import {SuitSame} from "./suitSame";

export class ConditionCreator {
    static create(words: string[]): Condition {
        switch (words[0]) {
            case 'notempty':
                return new NotEmpty(words);
            case 'empty':
                return new Empty(words);
            case 'suitsame':
                return new SuitSame(words);
            case 'numericequal':
                return new NumericEqual(words);
            case 'numericdif':
                return new NumericDif(words);
            case 'suitequal':
                return new SuitEqual(words);
            default:
                return null;
        }
    }
}