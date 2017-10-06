export class Interact {
    whenX: number;
    whenY: number;
    thens: Then[] = [];

    setWhen(x: number, y: number): void {
        this.whenX = x;
        this.whenY = y;
    }

    addThen(words: string[]): void {
        let then: Then = new Then();
        then.action = words[0];
        if (then.action === 'move') {
            then.fromX = parseInt(words[1]);
            then.fromY = parseInt(words[2]);
            then.fromOrder = words[3];
            then.toX = parseInt(words[4]);
            then.toY = parseInt(words[5]);
            then.toOrder = words[6];
        }
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
}