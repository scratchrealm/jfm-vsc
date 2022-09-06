// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	console.info(`Root path: ${rootPath}`);

	if (!rootPath) {
		console.warn('No root path');
	}

	const outputChannel = vscode.window.createOutputChannel('jfm-vsc');
	outputChannel.appendLine(`Root path: ${rootPath}`);

	vscode.commands.registerCommand('jfm-vsc.create-tsx-component', (info: any) => {
		const dirPath: string = info.path;
		;(async () => {
			const componentName = await vscode.window.showInputBox({
				placeHolder: 'NewComponent'
			});
			if (componentName) {
				const fileName = `${dirPath}/${componentName}.tsx`;
				if (fs.existsSync(fileName)) {
					return;
				}
				const content = newComponentContent(componentName);
				await fs.promises.writeFile(fileName, content);
			}
		})();
	});

	vscode.commands.registerCommand("jfm-vsc.show-snippets-info", () => {
		vscode.window.showInformationMessage(`
For snippets, create .json files in ~/.config/Code/User/snippets/.
Examples of snippets .json files are found at: https://github.com/scratchrealm/jfm-vsc/tree/main/snippets
		`)
	});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "jfm-vsc" is active');
}

function newComponentContent(componentName: string) {
	return `import { FunctionComponent } from "react";

type Props ={
}

const ${componentName}: FunctionComponent<Props> = () => {
	return (
		<div />
	)
}

export default ${componentName}
`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
