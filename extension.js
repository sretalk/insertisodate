// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "insertisodate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('insertisodate.insert', function () {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		// get current date
		let dateString = new Date().toISOString();

		editor.edit(function (text) {
            // get current selection
            let selection = editor.selection;

            if (!selection.isEmpty) {
                // Replace selected text with dateString
                text.replace(selection, dateString);
            } else {
                // Insert dateString at current cursor position
                let startLine = selection.start.line;
                let startCharacter = selection.start.character;
                text.insert(new vscode.Position(startLine, startCharacter), dateString);
            }
        });

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
