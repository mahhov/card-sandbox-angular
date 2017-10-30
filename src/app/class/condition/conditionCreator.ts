import {ColorAlternating} from "./colorAlternating";
import {ColorSame} from "./colorSame";
import {Condition} from "./condition";
import {Empty} from "./empty";
import {IsTop} from "./isTop";
import {NumericDif} from "./numericDif";
import {NumericEqual} from "./numericEqual";
import {NumericIncrementing} from "./numericIncrementing";
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
            case 'numericincrementing':
                return new NumericIncrementing(words, not);
            case 'colorsame':
                return new ColorSame(words, not);
            case 'colorAlternating':
                return new ColorAlternating(words, not);
            case 'istop':
                return new IsTop(words, not);
            default:
                return null;
        }
    }
}