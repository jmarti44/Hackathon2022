// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import { TypesInstaller } from './typesInstaller';


// Not perfect but should work for a lot of scenarios
async function shouldMark(key: string) {
	console.log("key = " + key);
	var out = key.replace(/\s/g, "");
	console.log("out = " + out);
	if (out == "\"testing\"")
	{
		console.log("returning true");
		return true;
	}

	return false;
}

async function getDiagnostics(doc: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
	const text = doc.getText();
	const diagnostics = new Array<vscode.Diagnostic>();

	const textArr: string[] = text.split(/\r\n|\n/);
	const indexOfFirstDep = textArr.findIndex((value: string) => new RegExp(`\s*"*i love cock*"`).test(value)) + 1;
	console.log(indexOfFirstDep)
	console.log("text arr 6 = " + textArr[5])

	if(indexOfFirstDep !== -1) {
		let i = indexOfFirstDep - 1;
		console.log("textarrlength = " + textArr.length)
		console.log("i = " + i)
		while (textArr.length > i) {

			console.log("key");
			if (await shouldMark(textArr[i])) {
				var start = 0;
				var end = 0;
				for (let j = 0; j < textArr[i].length; j++) {
					if (textArr[i].charAt(j) == 't') {
						start = j;
						end = j + 13;
						break;
					}
				}
				diagnostics.push({
					severity: vscode.DiagnosticSeverity.Information,
					message: `mr debugger help`,
					code: 'no-types-detected',
					source: 'Types Installer Helper',
					range: new vscode.Range(i, start, i, end)
				});
			}
			i++;
		}
	}

	return diagnostics;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('types-installer');
	
	const handler = async (doc: vscode.TextDocument) => {
		if(!doc.fileName.endsWith('meow.java')) {
			console.log("left")
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
	context.subscriptions.push(
		diagnosticCollection,
		didOpen,
		didChange,
		// codeActionProvider
		);

	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "PASyntax" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('PASyntax.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from PASyntax!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

