import * as _ from "underscore";
import {Card} from "./card";
import {Table} from "./table";

export class Deck {
    readonly BLACK_SPADE: string = '\u2660';
    readonly BLACK_CLUB: string = '\u2663';
    readonly BLACK_HEART: string = '\u2665';
    readonly BLACK_DIAMOND: string = '\u2666';
    readonly WHITE_SPADE: string = '\u2664';
    readonly WHITE_CLUB: string = '\u2667';
    readonly WHITE_HEART: string = '\u2661';
    readonly WHITE_DIAMOND: string = '\u2662';
    readonly SUITE_MAP: { [key: string]: string; } = {
        's': this.BLACK_SPADE,
        'c': this.BLACK_CLUB,
        'h': this.WHITE_HEART,
        'd': this.WHITE_DIAMOND
    };

    x: number;
    y: number;
    contain: string;
    order: string;
    visibility: string;
    horiz: number;
    vert: number;
    cards: Card[];

    constructor() {
        this.contain = Table.possibleDeckContain[0];
        this.order = Table.possibleDeckOrder[0];
        this.visibility = Table.possibleDeckVisibility[0];
        this.horiz = 0;
        this.vert = 0;
    }

    setPos(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    setProperties(words: string[]) {
        _.each(words, (word: string): void => {
            if (_.contains(Table.possibleDeckContain, word))
                this.contain = word;
            else if (_.contains(Table.possibleDeckOrder, word))
                this.order = word;
            else if (_.contains(Table.possibleDeckVisibility, word))
                this.visibility = word;
        });

        if (this.contain === 'full')
            this.cards = Table.fullDeck.slice();
        else if (this.contain === 'empty')
            this.cards = [];

        if (this.order === 'shuffle')
            this.cards = _.shuffle(this.cards) as Card[];

        let horizSpread = _.indexOf(words, 'horiz');
        let vertSpread = _.indexOf(words, 'vert');
        if (horizSpread !== -1 && horizSpread < words.length - 1)
            this.horiz = parseInt(words[horizSpread + 1]);
        if (vertSpread !== -1 && vertSpread < words.length - 1)
            this.vert = parseInt(words[vertSpread + 1]);
    }

    getCard(order: string): Card {
        if (order === 'top')
            return _.last(this.cards);
        else if (order === 'bottom')
            return _.first(this.cards);
        else {
            let index: number = parseInt(order);
            return index >= this.cards.length ? _.last(this.cards) : this.cards[index];
        }
    }

    removeCard(order: string): Card {
        if (order === 'top')
            return this.cards.pop();
        else if (order === 'bottom')
            return this.cards.shift();
        else {
            let index: number = parseInt(order);
            return index >= this.cards.length ? this.cards.pop() : this.cards.splice(index, 1)[0];
        }
    }

    addCard(card: Card, order: string): void {
        if (order === 'top')
            this.cards.push(card);
        else if (order === 'bottom')
            this.cards.unshift(card);
        else
            this.cards.splice(parseInt(order), 0, card);
    }

    getString(): string {
        let lastCard: Card = _.last(this.cards);
        if (!lastCard)
            return 'xXx';
        if (this.visibility === 'visible')
            return this.getCardString(lastCard);
        return '';
    }

    getCardString(card: Card): string {
        if (this.visibility === 'visible')
            return this.SUITE_MAP[card.suit] + card.num;
        return '';
    }
}