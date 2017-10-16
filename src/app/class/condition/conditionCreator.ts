import {ColorSame} from "./colorSame";
import {Condition} from "./condition";
import {Empty} from "./empty";
import {NumericDif} from "./numericDif";
import {NumericEqual} from "./numericEqual";
import {SuitEqual} from "./suitEqual";
import {SuitSame} from "./suitSame";

export class ConditionCreator {
    static create(words: string[], not: boolean): Condition {
        switch (words[0]) {
            case 'empty':
                return new Empty(words, not);
            case 'suitsame':
                return new SuitSame(words, not);
            case 'suitequal':
                return new SuitEqual(words, not);
            case 'numericequal':
                return new NumericEqual(words, not);
            case 'numericdif':
                return new NumericDif(words, not);
            case 'colorsame':
                return new ColorSame(words, not);
            default:
                return null;
        }
    }
}