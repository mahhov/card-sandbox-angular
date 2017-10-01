export class Interact {
    whenX: number;
    whenY: number;
    then: Then[];

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
            then.fromOrder = parseInt(words[3]);
            then.toX = parseInt(words[4]);
            then.toY = parseInt(words[5]);
            then.toOrder = parseInt(words[6]);
        }
        this.then.push(then);
    }
}

class Then {
    action: String;
    fromX: number;
    fromY: number;
    fromOrder: number;
    toX: number;
    toY: number;
    toOrder: number;
}