import * as _ from "underscore";
import {Condition} from "../condition/condition";
import {Interact} from "../interact";
import {Pos} from "../selector/pos";
import {Card} from "./card";
import {Deck} from "./deck";

export class Table {
    width: number;
    height: number;
    decks: Deck[] = [];
    interacts: Interact[] = [];
    state: number = 0;
    highlightsCount: number = 1;
    selectCount: number = 1;
    select: Pos;

    static readonly possibleDeckContain: string[] = ['empty', 'full'];
    static readonly possibleDeckOrder: string[] = ['order', 'shuffle'];
    static readonly possibleDeckVisibility: string[] = ['visible', 'hidden'];

    static readonly fullDeck: Card[] = ((): Card[] => {
        let product: Card[] = [];
        _.each(['c', 'd', 's', 'h'], (suit: string): void => {
            _.times(13, (num: number): void => {
                product.push(new Card(suit, num + 1));
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

    unselect(): void {
        ++this.selectCount;
        this.select === null;
    }

    setSelect(coord: Pos): void {
        let deck: Deck = this.findDeck(coord.x, coord.y);
        deck && deck.getCard(coord.order).select(++this.selectCount);
        this.select = coord;
    }

    handleClick(coord: Pos): void {
        let interact: Interact = this.findInteract(coord);
        if (interact)
            _.invoke(interact.actions, 'act', this);
        this.handleMouse(coord);
    }

    handleMouse(coord: Pos): void {
        this.highlightsCount++;
        if (this.findInteract(coord)) {
            let card: Card = this.findDeck(coord.x, coord.y).getCard(coord.order);
            card && card.highlight(this.highlightsCount);
        }
    }

    findInteract(coord: Pos): Interact {
        return _.find(this.interacts, (interact): boolean => {
            if (interact.whenX === coord.x && interact.whenY === coord.y && _.contains(interact.whenStates, this.state))
                return _.every(interact.conditions, (condition: Condition): boolean => {
                    return condition.verify(this);
                });
        });
    }

    findDeck(x: number, y: number): Deck {
        return _.find(this.decks, (deck: Deck): boolean => {
            return deck.x === x && deck.y === y;
        });
    }
}