
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let previousTextLength = 0;
    let lastCheckTime = Date.now();
    let score = 0;

	console.log('LineSense is now active!');

	const disposable = vscode.commands.registerCommand('linesense.checkCode', () => {
		const editor = vscode.window.activeTextEditor

		if (!editor) {
            vscode.window.showInformationMessage('No active editor found!');
            return;
        }
		const document = editor.document;
        const currentText = document.getText();
        const currentTime = Date.now();

		const timeElapsed = (currentTime - lastCheckTime) / 1000;

		const charsWritten = currentText.length - previousTextLength;

		previousTextLength = currentText.length;
        lastCheckTime = currentTime;
		if (timeElapsed < 2 && charsWritten > 50) {
            vscode.window.showWarningMessage(
                `Detected rapid input: ${charsWritten} characters in ${timeElapsed.toFixed(2)} seconds. Potential copied code.`
            );
        } else if (charsWritten > 0) {
            score += charsWritten;
            vscode.window.showInformationMessage(
                `Great job! You've written ${charsWritten} characters. Total score: ${score}`
            );
        }
    });
	context.subscriptions.push(disposable);
}
export function deactivate() {}
