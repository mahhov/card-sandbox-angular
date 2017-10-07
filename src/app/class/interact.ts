export class Interact {
    whenState: number;
    whenX: number;
    whenY: number;
    thens: Then[] = [];

    setWhen(state: number, x: number, y: number): void {
        this.whenState = state;
        this.whenX = x;
        this.whenY = y;
    }

    addThen(words: string[]): void {
        let then: Then = new Then(words);
        if (then.action)
            this.thens.push(then);
    }
}

export class Then {
    action: string;
    fromX: number;
    fromY: number;
    fromOrder: string;
    toX: number;
    toY: number;
    toOrder: string;

    constructor(words: string[]) {
        this.action = words[0];
        if (this.action === 'move') {
            this.fromX = parseInt(words[1]);
            this.fromY = parseInt(words[2]);
            this.fromOrder = words[3];
            this.toX = parseInt(words[4]);
            this.toY = parseInt(words[5]);
            this.toOrder = words[6];
        } else
            this.action = null;
    }
}