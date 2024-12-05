import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let previousTextLength = 0;
    let lastCheckTime = Date.now();
    let score = 0;

    console.log('LineSense is now active!');

    // Create a Status Bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(star) LineSense Ready | Score: 0";
    statusBarItem.tooltip = "Track your coding progress and score!";
    statusBarItem.color = "#FFD700"; // Golden color
    statusBarItem.show();

    const disposable = vscode.commands.registerCommand('linesense.checkCode', () => {
        const editor = vscode.window.activeTextEditor;

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
            statusBarItem.text = `$(star) LineSense Active | Score: ${score}`;
        }
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(statusBarItem);
}

export function deactivate() {}
