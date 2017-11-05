import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {Dictionary} from "underscore";
import {ActionCreator} from "../class/action/actionCreator";
import {Interact} from "../class/interact";
import {Program} from "../class/program";
import {Script} from "../class/script";
import {Deck} from "../class/table/deck";
import {Table} from "../class/table/table";

@Injectable()
export class TableCreatorService {
    private demoScript: Script;

    public setDemoScript(script: Script) {
        this.demoScript = script
    };

    public getTable(): Table {
        return this.createTable(this.createProgram(this.preprocessInput(this.getInput())));
    }

    private getInput(): string[] {
        return this.demoScript.lines;
    }

    private preprocessInput(lines: string[]): string[][] {
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

    private createProgram(blocks: string[][]): Program {
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

    private createTable(program: Program): Table {
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