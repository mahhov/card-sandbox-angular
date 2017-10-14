import {SelectedSelector} from "./selectedSelector";
import {Selector} from "./selector";
import {StackSelector} from "./stackSelector";
import {StaticSelector} from "./staticSelector";

export class SelectorCreator {
    static create(words: string[]): Selector {
        if (words[0] === 'stack')
            return new StackSelector(words);
        else if (words[0] === 'selected')
            return new SelectedSelector(words);
        return new StaticSelector(words);
    }
}