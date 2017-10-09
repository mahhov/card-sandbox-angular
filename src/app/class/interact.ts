import {Action} from "./action/action";
import {Condition} from "./condition/condition";
import {ActionCreator} from "./action/actionCreator";

export class Interact {
    whenState: number;
    whenX: number;
    whenY: number;
    conditions: Condition[] = [];
    actions: Action[] = [];

    setWhen(state: number, x: number, y: number): void {
        this.whenState = state;
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