import {Action} from "./action";
import {Move} from "./move";

export class ActionCreator {
    static create(words: string[]): Action {
        if (words[0] === 'move')
            return new Move(words);
        return null;
    }
}