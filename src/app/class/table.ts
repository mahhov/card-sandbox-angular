import * as _ from "underscore";
import {Deck} from "./deck";
import {Interact} from "./interact";

export class Table {
    width: number;
    height: number;
    deck: Deck[] = [];
    interact: Interact[] = [];

    static readonly possibleDeckContain: string[] = ['empty', 'full'];
    static readonly possibleDeckOrder: string[] = ['order', 'shuffle'];
    static readonly possibleDeckVisibility: string[] = ['visible', 'hidden'];

    static readonly fullDeck: string[] = ((): string[] => {
        let prod: string[] = [];
        _.each(['c', 'd', 's', 'h'], (suit: string): void => {
            _.each(_.range(13), (num: number): void => {
                prod.push(suit + num);
            });
        });
        return prod;
    })();

    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    addDeck(deck: Deck): void {
        this.deck.push(deck);
    }

    addInteract(interact: Interact): void {
        this.interact.push(interact);
    }
}