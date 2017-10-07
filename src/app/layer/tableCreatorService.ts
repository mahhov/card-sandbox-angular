import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Program} from "../class/program";
import {Table} from "../class/table";
import {Deck} from "../class/deck";
import {Interact, Then} from "../class/interact";

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
            deck 2 2 empty order visible vert 6 
            deck 3 2 empty order visible vert 6 
            deck 4 2 empty order visible vert 6 
            deck 5 2 empty order visible vert 6 
            deck 6 2 empty order visible vert 6 
            deck 7 2 empty order visible vert 6 
            move 0 0 top 2 2 top                     
            move 0 0 top 3 2 top                     
            move 0 0 top 3 2 top                     
            move 0 0 top 4 2 top                     
            move 0 0 top 4 2 top                     
            move 0 0 top 4 2 top                     
            move 0 0 top 5 2 top                     
            move 0 0 top 5 2 top                     
            move 0 0 top 5 2 top                     
            move 0 0 top 5 2 top                     
            move 0 0 top 6 2 top                     
            move 0 0 top 6 2 top                     
            move 0 0 top 6 2 top                     
            move 0 0 top 6 2 top                     
            move 0 0 top 6 2 top                     
            move 0 0 top 7 2 top                     
            move 0 0 top 7 2 top                     
            move 0 0 top 7 2 top                     
            move 0 0 top 7 2 top                     
            move 0 0 top 7 2 top                     
            move 0 0 top 7 2 top                     
            
            interact
            state 0 1
            click 0 0
            move 0 0 top 0 2 top
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
        return _.map(lines, (line: string): string => line.trim());
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
            } else if (words[0] === 'move') {
                let then: Then = new Then(words);
                table.handleAction(then);
            }
        });

        _.each(program.interacts, (interactBlock: string[]): void => {
            let interact: Interact = new Interact();
            let interactStateWords: string[] = interactBlock.shift().split(' ');
            let interactWhenWords: string[] = interactBlock.shift().split(' ');
            interact.setWhen(parseInt(interactStateWords[1]), parseInt(interactWhenWords[1]), parseInt(interactWhenWords[2]));
            _.each(interactBlock, (interactDoLine: string): void => {
                interact.addThen(interactDoLine.split(' '));
            });
            table.addInteract(interact);
        });

        return table;
    }
}