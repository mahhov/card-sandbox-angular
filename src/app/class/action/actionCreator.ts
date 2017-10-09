import {Action} from "./action";
import {Move} from "./move";
import {SetState} from "./setState";
import {SetSelect} from "./setSelect";
import {MoveAll} from "./moveAll";

export class ActionCreator {
    static create(words: string[]): Action {
        if (words[0] === 'move')
            return new Move(words);
        else if (words[0] === 'setstate')
            return new SetState(words);
        else if (words[0] === 'setselect')
            return new SetSelect(words);
        else if (words[0] === 'moveall')
            return new MoveAll(words);
        return null;
    }
}