import {Selector} from "./selector";
import {StackPos} from "./stackPos";
import {StaticPos} from "./staticPos";

export class SelectorCreator {
    static create(words: string[]): Selector {
        if (words[0] === 'stack')
            return new StackPos(words);
        return new StaticPos(words);
    }
}