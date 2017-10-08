import {Table} from '../table';

export class Action {
    constructor(words: string[]) {
    }

    do(table: Table): void {
    }
}


//
// handleAction(then: Then): void {
//     let fromDeck: Deck = this.findDeck(then.fromX, then.fromY);
// let toDeck: Deck = this.findDeck(then.toX, then.toY);
// let fromCard: string[] = fromDeck.removeCard(then.fromOrder);
// toDeck.addCard(fromCard, then.toOrder);
// }