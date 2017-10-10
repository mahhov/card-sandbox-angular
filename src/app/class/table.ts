import * as _ from "underscore";
import {Condition} from "./condition/condition";
import {Deck} from "./deck";
import {Interact} from "./interact";
import {Pos} from "./selector/pos";

export class Table {
    width: number;
    height: number;
    decks: Deck[] = [];
    interacts: Interact[] = [];
    highlights: Pos[] = [];
    select: Pos;
    state: number = 0;

    static readonly possibleDeckContain: string[] = ['empty', 'full'];
    static readonly possibleDeckOrder: string[] = ['order', 'shuffle'];
    static readonly possibleDeckVisibility: string[] = ['visible', 'hidden'];

    static readonly fullDeck: string[][] = ((): string[][] => {
        let product: string[][] = [];
        _.each(['c', 'd', 's', 'h'], (suit: string): void => {
            _.each(_.range(13), (num: number): void => {
                product.push([suit, '' + (num + 1)]);
            });
        });
        return product;
    })();

    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    addDeck(deck: Deck): void {
        this.decks.push(deck);
    }

    addInteract(interact: Interact): void {
        this.interacts.push(interact);
    }

    handleClick(coord: Pos): void {
        let interact: Interact = _.find(this.interacts, (interact): boolean => {
            if (interact.whenX === coord.x && interact.whenY === coord.y && _.contains(interact.whenStates, this.state))
                return _.every(interact.conditions, (condition: Condition): boolean => {
                    return condition.verify(this);
                });
        });
        if (interact)
            _.invoke(interact.actions, 'act', this);
    }

    handleMouse(coord: Pos): void {
        this.highlights = [];
        _.each(this.interacts, (interact): void => {
            if (interact.whenX === coord.x && interact.whenY === coord.y)
                this.highlights.push(coord);
        })
    }

    private
    findDeck(x: number, y: number): Deck {
        return _.find(this.decks, (deck: Deck): boolean => {
            return deck.x === x && deck.y === y;
        });
    }
}