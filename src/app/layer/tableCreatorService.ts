import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {ActionCreator} from "../class/action/actionCreator";
import {Deck} from "../class/deck";
import {Interact} from "../class/interact";
import {Program} from "../class/program";
import {Table} from "../class/table";

@Injectable()
export class TableCreatorService {
    public getTable(): Table {
        return TableCreatorService.createTable(TableCreatorService.createProgram(TableCreatorService.getInput()));
    }

    private static getInput(): string[] {
        let input: string =
            `init
            table 10 8
            deck 0 0 full shuffle hnidden
            deck 0 2 empty order visible
            deck 2 0 empty order visible
            deck 3 0 empty order visible
            deck 4 0 empty order visible
            deck 5 0 empty order visible
            deck 2 2 empty order visible vert -1
            deck 3 2 empty order visible vert -1
            deck 4 2 empty order visible vert -1
            deck 5 2 empty order visible vert -1
            deck 6 2 empty order visible vert -1
            deck 7 2 empty order visible vert -1
            move (card 0 0 top) (card 2 2 top)
            move (card 0 0 top) (card 3 2 top)
            move (card 0 0 top) (card 3 2 top)
            move (card 0 0 top) (card 4 2 top)
            move (card 0 0 top) (card 4 2 top)
            move (card 0 0 top) (card 4 2 top)
            move (card 0 0 top) (card 5 2 top)
            move (card 0 0 top) (card 5 2 top)
            move (card 0 0 top) (card 5 2 top)
            move (card 0 0 top) (card 5 2 top)
            move (card 0 0 top) (card 6 2 top)
            move (card 0 0 top) (card 6 2 top)
            move (card 0 0 top) (card 6 2 top)
            move (card 0 0 top) (card 6 2 top)
            move (card 0 0 top) (card 6 2 top)
            move (card 0 0 top) (card 7 2 top)
            move (card 0 0 top) (card 7 2 top)
            move (card 0 0 top) (card 7 2 top)
            move (card 0 0 top) (card 7 2 top)
            move (card 0 0 top) (card 7 2 top)
            move (card 0 0 top) (card 7 2 top)

            interact
            state 0 1
            click 0 0
            if notempty 0 0
            move 0 0 top 0 2 top
            setselect -1
            setstate 0
            
            interact
            state 0 1
            click 0 0
            if empty 0 0
            moveall 0 2 0 0 top
            setselect -1
            setstate 0

            interact
            state 0
            click 0 2
            setselect 0 2
            setstate 1

            interact
            state 1
            click 0 2
            setselect -1
            setstate 0
            `;

        let lines = input.split('\n');
        return _.map(lines, (line: string): string => line.trim().replace(/[()]/g, ''));
    }

    private static createProgram(lines: string[]): Program {
        let category: string = null;

        let program: Program = new Program();

        _.each(lines, (line: string): void => {
            if (!category || !line) {
                category = line;
                if (category === 'interact')
                    program.newInteract();
            } else if (category === 'init')
                program.addInit(line);
            else if (category === 'interact')
                program.addInteract(line);
        });

        return program;
    }

    private static createTable(program: Program): Table {
        let table: Table = new Table();

        _.each(program.init, (initLine: string): void => {
            let words = initLine.split(' ');
            if (words[0] === 'table')
                table.setSize(parseInt(words[1]), parseInt(words[2]));
            else if (words[0] === 'deck') {
                let deck: Deck = new Deck();
                deck.setPos(parseInt(words[1]), parseInt(words[2]));
                deck.setProperties(words.splice(3));
                table.addDeck(deck);
            } else
                ActionCreator.create(words).act(table);
        });

        _.each(program.interacts, (interactBlock: string[]): void => {
            let interact: Interact = new Interact();
            let interactStateWords: string[] = interactBlock.shift().split(' ');
            let interactWhenWords: string[] = interactBlock.shift().split(' ');
            interact.setWhen(_.rest(interactStateWords), parseInt(interactWhenWords[1]), parseInt(interactWhenWords[2]));
            _.each(interactBlock, (interactDoLine: string): void => {
                let words: string[] = interactDoLine.split(' ');
                if (words[0] === 'if')
                    interact.addCondition(_.rest(words));
                else
                    interact.addAction(words);
            });
            table.addInteract(interact);
        });

        return table;
    }
}