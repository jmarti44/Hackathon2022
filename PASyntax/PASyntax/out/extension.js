"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// import { TypesInstaller } from './typesInstaller';
async function getDiagnostics(doc) {
    const text = doc.getText();
    const diagnostics = new Array();
    const textArr = text.split(/\r\n|\n/);
    for (let i = 0; i < textArr.length; i++) {
        let found = -1;
        found = textArr[i].search("testing");
        if (found >= 0) {
            var start = textArr[i].search("testing");
            var end = start + 7;
            // for (let j = 0; j < textArr[i].length; j++) {
            // 	if (textArr[i].charAt(j) == 'x') {
            // 		start = j;
            // 		end = j + 13;
            // 		break;
            // 	}
            // }
            diagnostics.push({
                severity: vscode.DiagnosticSeverity.Warning,
                message: `FUCKKK OOFFOFOFDIJSOKFJ`,
                code: 'no-types-detected',
                source: 'Types Installer Helper',
                range: new vscode.Range(i, start, i, end)
            });
        }
    }
    return diagnostics;
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
async function activate(context) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('types-installer');
    const handler = async (doc) => {
        if (!doc.fileName.endsWith('meow.java')) {
            console.log("left");
            return;
        }
        const diagnostics = await getDiagnostics(doc);
        diagnosticCollection.set(doc.uri, diagnostics);
    };
    const didOpen = vscode.workspace.onDidOpenTextDocument(doc => handler(doc));
    const didChange = vscode.workspace.onDidChangeTextDocument(e => handler(e.document));
    // const codeActionProvider = vscode.languages.registerCodeActionsProvider('java', new TypesInstaller(context));
    // If we have an activeTextEditor when we open the workspace, trigger the handler
    if (vscode.window.activeTextEditor) {
        await handler(vscode.window.activeTextEditor.document);
    }
    // Push all of the disposables that should be cleaned up when the extension is disabled
    context.subscriptions.push(diagnosticCollection, didOpen, didChange);
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "PASyntax" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('PASyntax.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Meow Meow');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map