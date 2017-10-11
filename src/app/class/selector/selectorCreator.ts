import {SelectedPos} from "./selectedPos";
import {Selector} from "./selector";
import {StackPos} from "./stackPos";
import {StaticPos} from "./staticPos";

export class SelectorCreator {
    static create(words: string[]): Selector {
        if (words[0] === 'stack')
            return new StackPos(words);
        else if (words[0] === 'selected')
            return new SelectedPos(words);
        return new StaticPos(words);
    }
}