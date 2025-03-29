// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

function formatCurrentTime() {
	const currentTime = new Date();

	const year = currentTime.getFullYear();
	const month = String(currentTime.getMonth() + 1).padStart(2, '0');
	const day = String(currentTime.getDate()).padStart(2, '0');
	const hours = String(currentTime.getHours()).padStart(2, '0');
	const minutes = String(currentTime.getMinutes()).padStart(2, '0');
	const seconds = String(currentTime.getSeconds()).padStart(2, '0');
	const milliseconds = String(currentTime.getMilliseconds()).padStart(3, '0');
	const timezoneOffset = -currentTime.getTimezoneOffset();
	const timezoneHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
	const timezoneMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
	const timezoneSign = timezoneOffset >= 0 ? '+' : '-';
	const timezone = `${timezoneSign}${timezoneHours}:${timezoneMinutes}`;

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;
}

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
		let dateString = formatCurrentTime();

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
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
