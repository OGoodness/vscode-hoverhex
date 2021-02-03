'use strict';
import * as vscode from 'vscode';
import {getDataOffset} from "./data/charDataOffset";

export function activate(context: vscode.ExtensionContext) {
    let aa = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, { 
        provideHover(document, position, token) {
            const hoveredWord = document.getText(document.getWordRangeAtPosition(position));
            if (/^0x[0-9a-fA-F]+$/g.test(hoveredWord)) {
                console.log(hoveredWord)
                let numericValue = parseInt(hoveredWord, 16);
                let formattedText = new vscode.MarkdownString(`**ID:** ${hoveredWord} = ${numericValue}  \n`);
                getDataOffset(hoveredWord, formattedText);
                return new vscode.Hover(formattedText);
            }
            
        }
    });
    context.subscriptions.push(aa); 
}

export function deactivate() {
}