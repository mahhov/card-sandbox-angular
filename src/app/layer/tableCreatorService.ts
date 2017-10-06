import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Program} from "../class/program";
import {Table} from "../class/table";
import {Deck} from "../class/deck";
import {Interact} from "../class/interact";

@Injectable()
export class TableCreatorService {
    public getTable(): Table {
        return TableCreatorService.createTable(TableCreatorService.createProgram(TableCreatorService.getInput()));
    }

    private static getInput(): string[] {
        let input: string =
            `init
            table 5 5
            deck 0 0 full shuffle hidden
            deck 1 0 empty order visible horiz 3
            deck 0 1 full order hidden
            deck 1 1 empty order visible vert 3
            
            interact
            click 0 0
            move 0 0 top 1 0 top
            
            interact
            click 0 1
            move 0 1 top 1 1 top`;

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
            }
        });

        _.each(program.interacts, (interactBlock: string[]): void => {
            let interact: Interact = new Interact();
            let interactWhenWords: string[] = interactBlock.splice(0, 1)[0].split(' ');
            interact.setWhen(parseInt(interactWhenWords[1]), parseInt(interactWhenWords[2]));
            _.each(interactBlock, (interactDoLine: string): void => {
                interact.addThen(interactDoLine.split(' '));
            });
            table.addInteract(interact);
        });

        return table;
    }
}