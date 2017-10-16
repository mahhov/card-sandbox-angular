import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Dictionary} from "underscore";
import {ActionCreator} from "../class/action/actionCreator";
import {Interact} from "../class/interact";
import {Program} from "../class/program";
import {Deck} from "../class/table/deck";
import {Table} from "../class/table/table";

@Injectable()
export class TableCreatorService {
    public getTable(): Table {
        return TableCreatorService.createTable(
            TableCreatorService.createProgram(
                TableCreatorService.preprocessInput(
                    TableCreatorService.getInput())));
    }

    private static getInput(): string {
        return `
            init
            table 10 8
            deck 0 0 full shuffle visible // deck
            deck 0 2 empty order visible // draw
            
            let 4 x (2 3 4 5) // pillars
            init
            deck x 0 empty order visible
            
            let 6 x (2 3 4 5 6 7) n (1 2 3 4 5 6) // main
            init
            deck x 2 empty order visible vert -1
            move (stack 0 0 n) (x 2 top)

            interact // draw
            state 0 1
            click 0 0
            ifnot empty 0 0
            move (0 0 top) (0 2 top)
            unselect
            setstate 0
            
            interact // reshuffle
            state 0 1
            click 0 0
            if empty 0 0
            move (stack 0 2 all) (0 0 top)
            unselect
            setstate 0

            interact // select draw
            state 0
            click 0 2
            ifnot empty 0 2
            setselect (0 2 top)
            setstate 1

            interact // unselect draw
            state 1
            click 0 2
            unselect
            setstate 0
            
            let 4 x (2 3 4 5) suit (h s d c) // add to pillar
            interact
            state 1
            click x 0
            if numericdif (selected) (x 0 top) 1 // todo if istop (selected)
            if suitequal (selected) suit
            move (selected) (x 0 top)
            unselect
            setstate 0
             
            let 4 x (2 3 4 5) suit (h s d c) // move base to pillar
            interact
            state 1
            click x 0
            if numericequal (selected) 1 // todo if istop (selected)
            if suitequal (selected) suit
            move (selected) (x 0 top)
            unselect
            setstate 0
            
            let 6 x (2 3 4 5 6 7) // select main
            interact
            state 0
            click x 2
            setselect (highlighted)
            setstate 1
            
            let 6 x (2 3 4 5 6 7) // move to main
            interact
            state 1
            click x 2
            if numericdif (selected) (x 2 top) -1
            ifnot suitsame (selected) (x 2 top) // todo not same color suit
            move (selectedstack) (x 2 top)
            unselect
            setstate 0
            
            // todo moving king to empty main
            // allow unselecting when clicking on main
            `;
    }

    private static preprocessInput(input: string): string[][] {
        let lines = input.split('\n');
        lines = _.map(lines, (line: string): string => line.replace(/(\(|\)|\/\/.*)/g, '').trim().toLocaleLowerCase());

        let blocks: string[][] = [[]];
        let expandedBlocks: string[][] = [];

        _.each(lines, (line: string) => {
            if (!line && _.last(blocks).length)
                blocks.push([]);
            else if (line)
                _.last(blocks).push(line);
        });

        _.each(blocks, (block: string[]) => {
            if (!block.length)
                return;
            let firstLineWords: string[] = block[0].split(' ');
            if (firstLineWords[0] === 'let') {
                let letN = parseInt(firstLineWords[1]);
                let letVarCount = (firstLineWords.length - 2) / (letN + 1);
                let letMap: Dictionary<string[]> = {};
                _.times(letVarCount, (i: number): void => {
                    let shift: number = (letN + 1) * i;
                    letMap[firstLineWords[2 + shift]] = firstLineWords.slice(3 + shift, 3 + shift + letN);
                });

                _.times(letN, (i: number): void => {
                    let expandedBlock: string[] = [];
                    _.each(_.rest(block), (line: string): void => {
                        let expandedLine: string = line;
                        _.each(letMap, (letTo: string[], letFrom: string): void => {
                            let replaceFrom: RegExp = new RegExp('\\b' + letFrom + '\\b', 'g');
                            expandedLine = expandedLine.replace(replaceFrom, letTo[i]);
                        });
                        expandedBlock.push(expandedLine);
                    });
                    expandedBlocks.push(expandedBlock);
                });

            } else
                expandedBlocks.push(block);
        });

        return expandedBlocks;
    }

    private static createProgram(blocks: string[][]): Program {
        let program: Program = new Program();

        _.each(blocks, (block: string[]): void => {
            let category: string = block[0];
            if (category === 'interact')
                program.newInteract();
            _.each(_.rest(block), (line: string): void => {
                if (category === 'init')
                    program.addInit(line);
                else if (category === 'interact')
                    program.addInteract(line);
            });
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
                    interact.addCondition(_.rest(words), false);
                else if (words[0] === 'ifnot')
                    interact.addCondition(_.rest(words), true);
                else
                    interact.addAction(words);
            });
            table.addInteract(interact);
        });

        return table;
    }
}