import * as _ from "underscore";
import {Action} from "./action/action";
import {Condition} from "./condition/condition";
import {ActionCreator} from "./action/actionCreator";

export class Interact {
    whenStates: number[];
    whenX: number;
    whenY: number;
    conditions: Condition[] = [];
    actions: Action[] = [];

    setWhen(states: string[], x: number, y: number): void {
        this.whenStates = _.map(states, (stateString: string): number => {
            return parseInt(stateString);
        });
        this.whenX = x;
        this.whenY = y;
    }

    addCondition(words: string[]): void {
        let condition: Condition = Condition.create(words);
        if (condition)
            this.conditions.push(condition);
    }

    addAction(words: string[]): void {
        let action: Action = ActionCreator.create(words);
        if (action)
            this.actions.push(action);
    }
}