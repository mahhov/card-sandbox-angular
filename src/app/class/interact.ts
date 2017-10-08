import {Action} from "./action/action";
import {Condition} from "./condition/condition";

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
        this.conditions.push(new Condition(words));
    }

    addAction(words: string[]): void {
        this.actions.push(new Action(words));
    }
}

// export class Then {
//     action: string;
//     fromX: number;
//     fromY: number;
//     fromOrder: string;
//     toX: number;
//     toY: number;
//     toOrder: string;
//
//     constructor(words: string[]) {
//         this.action = words[0];
//         if (this.action === 'move') {
//             this.fromX = parseInt(words[1]);
//             this.fromY = parseInt(words[2]);
//             this.fromOrder = words[3];
//             this.toX = parseInt(words[4]);
//             this.toY = parseInt(words[5]);
//             this.toOrder = words[6];
//         } else
//             this.action = null;
//     }
// }