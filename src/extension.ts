import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// Recommended user settings for screen reader users.
	function updateSettings() {
		//Git
		vscode.workspace.getConfiguration("git").update("enabled", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("git").update("autofetch", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("git").update("ignoreMissingGitWarning", true, vscode.ConfigurationTarget.Global);

		//Workbench
		vscode.workspace.getConfiguration("workbench.editor").update("enablePreview", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("workbench.tips").update("enabled", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("workbench").update("startupEditor", "none", vscode.ConfigurationTarget.Global);

		//Editor
		vscode.workspace.getConfiguration("editor.minimap").update("enabled", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("editor.hover").update("enabled", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("editor.parameterHints").update("enabled", false, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("editor").update("accessibilitySupport", "on", vscode.ConfigurationTarget.Global);

		//Python
		let myPylintArgs: string[] = ['--disable=W0614', '--disable=C0111', '--disable=W0401', '--disable=C0411', '--disable=C0413', '--disable=E0401', '--disable=C0326', '--disable=C0303'];
		//let pylint = vscode.workspace.getConfiguration("python.linting").get("pylintArgs");
		vscode.workspace.getConfiguration("python.linting").update("pylintArgs", myPylintArgs, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("jupyter").update("disableJupyterAutoStart", true, vscode.ConfigurationTarget.Global);

		//Misc
		vscode.workspace.getConfiguration("extensions").update("ignoreRecommendations", true, vscode.ConfigurationTarget.Global);
	}

	let updateSettingsCommand = vscode.commands.registerCommand('recommendedsettings.updateSettings', () => {
		updateSettings();

		vscode.window.showInformationMessage('Finished updating settings!');
	});


	// Automatic Quick suggestions toggle
	function toggleQuickSuggestions() {
		let suggestionsDisable = { "other": false, "comments": false, "strings": false };
		let suggestionsDefault = { "other": true, "comments": false, "strings": false };
		let status = vscode.workspace.getConfiguration("editor.quickSuggestions").get("other");
		if (status) {
			vscode.workspace.getConfiguration("editor").update("quickSuggestions", suggestionsDisable, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage("Automatic Quick Suggestions disabled!");
		}
		else {
			vscode.workspace.getConfiguration("editor").update("quickSuggestions", suggestionsDefault, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage("Automatic Quick Suggestions enabled!");
		}
	}

	let toggleQuickSuggestionsCommand = vscode.commands.registerCommand('recommendedsettings.toggleQuickSuggestions', function () {
		toggleQuickSuggestions();
	});

	context.subscriptions.push(updateSettingsCommand);
	context.subscriptions.push(toggleQuickSuggestionsCommand);

	console.log('Extension Recommended Settings is now active!');

}

// this method is called when your extension is deactivated
export function deactivate() { }
