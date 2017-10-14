import {Action} from "./action";
import {Move} from "./move";
import {SetSelect} from "./setSelect";
import {SetState} from "./setState";
import {Unselect} from "./unselect";

export class ActionCreator {
    static create(words: string[]): Action {
        switch (words[0]) {
            case 'move':
                return new Move(words);
            case 'setstate':
                return new SetState(words);
            case 'setselect':
                return new SetSelect(words);
            case 'unselect':
                return new Unselect(words);
            default:
                return null;
        }
    }
}