import {HighlightedSelector} from "./highlightedSelector";
import {SelectedSelector} from "./selectedSelector";
import {SelectedStackRepeatSelector} from "./selectedStackRepeatSelector";
import {SelectedStackSelector} from "./selectedStackSelector";
import {Selector} from "./selector";
import {StackSelector} from "./stackSelector";
import {StaticSelector} from "./staticSelector";

export class SelectorCreator {
    static create(words: string[]): Selector {
        switch (words[0]) {
            case 'stack':
                return new StackSelector(words);
            case 'selected':
                return new SelectedSelector(words);
            case 'highlighted':
                return new HighlightedSelector(words);
            case 'selectedstack':
                return new SelectedStackSelector(words);
            case 'selectedrepeatstack':
                return new SelectedStackRepeatSelector(words);
            default:
                return new StaticSelector(words);
        }
    }
}