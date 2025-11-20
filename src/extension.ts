import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let toggleAccessibilitySignalsSettingsCommand = vscode.commands.registerCommand('screenreadermode.toggleAccessibilitySignalsSettings', () => {
		toggleAccessibilitySignalsSettings();
	});

	let toggleAccessibilityVerbositySettingsCommand = vscode.commands.registerCommand('screenreadermode.toggleAccessibilityVerbositySettings', () => {
		toggleAccessibilityVerbositySettings();
	});

	let showSettingsPickerCommand = vscode.commands.registerCommand('screenreadermode.showSettingsPicker', () => {
		showSettingsPicker(context);
	});

	let toggleQuickSuggestionsSettingsCommand = vscode.commands.registerCommand('screenreadermode.toggleQuickSuggestionsSettings', () => {
		toggleQuickSuggestionsSettings();
	});

	let runPythonCodeCommand = vscode.commands.registerCommand('screenreadermode.runPythonCode', () => {
		runPythonCode();
	});

	context.subscriptions.push(
		toggleAccessibilitySignalsSettingsCommand,
		toggleAccessibilityVerbositySettingsCommand,
		showSettingsPickerCommand,
		toggleQuickSuggestionsSettingsCommand,
		runPythonCodeCommand,
	);
	console.log('Extension Screen Reader Mode is now active!');
}

// ***********************Helper functions*************************************************

function getExistingTerminal(name: string) {
	const terminals = vscode.window.terminals;
	for (const terminal of terminals) {
		if (terminal.name === name) {
			return terminal;
		}
	}
	return null;
}

async function setToggleStatus(settingKey: string, value: boolean) {
	const config = vscode.workspace.getConfiguration();
	const newValue = value ? true : undefined;
	await config.update(settingKey, newValue, vscode.ConfigurationTarget.Global);
	console.log(`Set ${settingKey} to ${newValue}`);
}

function getToggleStatus(settingKey: string): boolean {
	const config = vscode.workspace.getConfiguration();
	return config.get<boolean>(settingKey) === true;
}

function updateSettings(settings: { [key: string]: any }) {
	try {
		const config = vscode.workspace.getConfiguration();
		for (const [setting, value] of Object.entries(settings)) {
			config.update(setting, value, vscode.ConfigurationTarget.Global);
			console.log(`Updated setting: ${setting} to value: ${JSON.stringify(value)}`);
		}

	}
	catch (error) {
		if (error instanceof Error) {
			console.error(`Error updating settings: ${error.message}`);
		} else {
			console.error(`Unknown error: ${error}`);
		}
	}
}

async function updateMultipleSettings(settings: { [key: string]: any }) {
	for (const [key, value] of Object.entries(settings)) {
		await vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
		console.log(
			value === undefined
				? `Restored ${key} to default (undefined)`
				: `Set ${key} to: ${JSON.stringify(value)}`
		);
	}
}

// ***********************Core logic *************************************************

// Toggle all accessibility signals settings off or on
async function toggleAccessibilitySignalsSettings() {
	await toggleSettings(
		'accessibility.signals',
		['format', 'save', 'has', 'get', 'update', 'inspect'],
		'screenreadermode.accessibilitySignalsToggledOff',
		(value: any) => {
			if (value && typeof value === 'object') {
				const newValue: { sound: string; announcement?: string } = { ...value, sound: 'off' };
				if ('announcement' in value) {
					newValue.announcement = 'off';
				}
				return newValue;
			}
			return value;
		}
	);
}

// Toggle all accessibility verbosity settings off or on
async function toggleAccessibilityVerbositySettings() {
	await toggleSettings(
		'accessibility.verbosity',
		['has', 'get', 'update', 'inspect'],
		'screenreadermode.accessibilityVerbosityToggledOff',
		() => false
	);
}

async function toggleSettings(
	section: string,
	exclude: string[],
	toggleStatusKey: string,
	updateValue: (value: any) => any
) {
	try {
		const config = vscode.workspace.getConfiguration(section);
		const keys = Object.keys(config).filter(key => !exclude.includes(key));
		const isToggledOff = getToggleStatus(toggleStatusKey);

		console.log(`Found ${keys.length} ${section} settings (excluding ${exclude.join(', ')}).`);
		console.log(`All ${section} keys:`, keys);

		if (!isToggledOff) {
			// Turn off settings
			for (const key of keys) {
				const value = config.get(key);
				console.log(`Processing setting: ${key} with value: ${JSON.stringify(value)}`);
				const newValue = updateValue(value);
				await config.update(key, newValue, vscode.ConfigurationTarget.Global);
				console.log(`Updated setting: ${key} to value: ${JSON.stringify(newValue)}`);
			}
			await setToggleStatus(toggleStatusKey, true);
			vscode.window.showInformationMessage(`${section} settings was toggled off.`);
		} else {
			// Remove settings from user settings to set back to default
			for (const key of keys) {
				await config.update(key, undefined, vscode.ConfigurationTarget.Global);
				console.log(`Removed setting: ${key} from user settings.`);
			}
			await setToggleStatus(toggleStatusKey, false);
			vscode.window.showInformationMessage(`${section} settings was restored to default.`);
		}
		console.log(`${section} settings toggled.`);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error toggling ${section} settings: ${error.message}`);
		} else {
			console.error(`Unknown error: ${error}`);
		}
	}
}

// Handle the checkbox selection in order to toggle user settings
function showSettingsPicker(context: vscode.ExtensionContext) {
	try {
		const settingsGroups: { label: string, description: string, settings: { [key: string]: any } }[] = [
			{
				label: 'Hide Minimap',
				description: 'Do not show the code outline.',
				settings: {
					'editor.minimap.enabled': false
				}
			},
			{
				label: 'Start without editor',
				description: 'Launch without an editor window.',
				settings: {
					'workbench.startupEditor': 'none',
				}
			},
			{
				label: 'Hide hint in empty editor',
				description: 'No hints in empty editor.',
				settings: {
					'workbench.editor.empty.hint': 'hidden',
				}
			},
			{
				label: 'Disable workspace trust',
				description: 'Trust confirmation will be disabled.',
				settings: {
					'security.workspace.trust.enabled': false,
				}
			},
			{
				label: 'Ignore missing Git warning',
				description: 'No warnings about missing Git.',
				settings: {
					'git.ignoreMissingGitWarning': false
				}
			},
			{
				label: 'Ignore recommendations from Extensions',
				description: 'Extension recommendations will be disabled.',
				settings: {
					'extensions.ignoreRecommendations': false
				}
			},
			{
				label: 'Disable automatic hover.',
				description: `Automatic hover will be disabled. Trigger manually.`,
				settings: {
					'editor.hover.enabled': false
				}
			},
		];

		const storedState: { label: string, picked: boolean }[] = context.workspaceState.get<{ label: string, picked: boolean }[]>('checkboxState') || [];

		const checkboxes: { label: string, description: string, picked: boolean, settings: { [key: string]: any } }[] = settingsGroups.map(group => ({
			label: group.label,
			description: group.description,
			picked: storedState.find(state => state.label === group.label)?.picked || false,
			settings: group.settings
		}));

		const quickPick: vscode.QuickPick<{ label: string, description: string }> = vscode.window.createQuickPick();
		quickPick.items = checkboxes.map(cb => ({ label: cb.label, description: cb.description }));
		quickPick.placeholder = 'Select options to tweak your user settings...';
		quickPick.ignoreFocusOut = true;
		quickPick.canSelectMany = true;

		// Pre-select items based on stored state
		quickPick.selectedItems = quickPick.items.filter(item => {
			const checkbox = checkboxes.find(cb => cb.label === item.label);
			return checkbox ? checkbox.picked : false;
		});

		quickPick.onDidChangeSelection(selectedItems => {
			const selectedLabels = selectedItems.map(item => item.label);
			checkboxes.forEach(checkbox => {
				checkbox.picked = selectedLabels.includes(checkbox.label);
			});
			context.workspaceState.update('checkboxState', checkboxes.map(cb => ({ label: cb.label, picked: cb.picked })));
		});

		quickPick.onDidAccept(() => {
			checkboxes.forEach(checkbox => {
				if (checkbox.picked) {
					updateSettings(checkbox.settings);
				} else {
					// Set settings to undefined when unchecked
					const undefinedSettings = Object.keys(checkbox.settings).reduce((acc, key) => {
						acc[key] = undefined;
						return acc;
					}, {} as { [key: string]: any });
					updateSettings(undefinedSettings);
				}
			});
			context.workspaceState.update('checkboxState', checkboxes.map(cb => ({ label: cb.label, picked: cb.picked })));
			quickPick.hide();
			vscode.window.showInformationMessage(`User settings was modified.`);
		});
		quickPick.show();
	}
	catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		} else {
			console.error(`Unknown error: ${error}`);
		}
	}
}

// Toggle automatic quick suggestions and parameter hints off or on
async function toggleQuickSuggestionsSettings() {
	try {
		const config = vscode.workspace.getConfiguration();
		const suggestions = config.get<{ other?: boolean; comments?: boolean; strings?: boolean }>('editor.quickSuggestions');
		const isDisabled = suggestions && suggestions.other === false && suggestions.comments === false && suggestions.strings === false;

		const settingsToDisable = {
			'editor.quickSuggestions': { other: false, comments: false, strings: false },
			'editor.suggestOnTriggerCharacters': false,
			'editor.parameterHints.enabled': false,
			'terminal.integrated.suggest.quickSuggestions': { comments: 'off', arguments: 'off', unknown: 'off' },
			'terminal.integrated.suggest.suggestOnTriggerCharacters': false //Preview setting ready to use in VSCode v.1.103.2
		};

		const settingsToRestore = {
			'editor.quickSuggestions': undefined,
			'editor.suggestOnTriggerCharacters': undefined,
			'editor.parameterHints.enabled': undefined,
			'terminal.integrated.suggest.quickSuggestions': undefined,
			'terminal.integrated.suggest.suggestOnTriggerCharacters': undefined
		};

		if (!isDisabled) {
			await updateMultipleSettings(settingsToDisable);
			vscode.window.showInformationMessage('Automatic Quick Suggestions was disabled.');
		} else {
			await updateMultipleSettings(settingsToRestore);
			vscode.window.showInformationMessage('Automatic Quick Suggestions was restored to default.');
		}
	} catch (error) {
		console.error(`Failed to toggle Automatic Quick Suggestions: ${error}`);
		vscode.window.showErrorMessage(`Failed to toggle Automatic Quick Suggestions: ${error}`);
	}
}

// Run Python scripts with minimal output in the terminal
function runPythonCode() {
	try {
		const terminalName = 'Python';
		let terminal = getExistingTerminal(terminalName);

		if (!terminal) {
			terminal = vscode.window.createTerminal(terminalName);
			console.log(`Created new terminal: ${terminalName}`);
		} else {
			console.log(`Found existing terminal: ${terminalName}`);
		}

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const documentFileName = path.basename(document.fileName);
			terminal.show();
			const isWindows = process.platform === 'win32';
			const isMacOS = process.platform === 'darwin';
			const pythonCommand = isWindows ? 'python' : (isMacOS ? 'python3' : 'python3');
			terminal.sendText(`${pythonCommand} ${documentFileName}`);
		}
	}
	catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		} else {
			console.error(`Unknown error: ${error}`);
		}
	}
}

export function deactivate() {
	console.log('Extension Screen Reader Mode is now deactivated.');
}
