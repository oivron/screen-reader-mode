"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
// TEST DENNE EXTENSION UTEN AT pYTHON EXTENSION ER INSTALLERT.
// Test på Mac.
// Kjør Python - hvilken hurtigtast? Ctrl+F5 nå. Ctrl+Alt+F5?
// toggleAccessibilitySignalsSettings: Bør også ta høyde for 'format' og 'save'
// Kjør Python. Hvordan fjerne den ved deaktivering av extension?
function activate(context) {
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
    context.subscriptions.push(toggleAccessibilitySignalsSettingsCommand, toggleAccessibilityVerbositySettingsCommand, showSettingsPickerCommand, toggleQuickSuggestionsSettingsCommand, runPythonCodeCommand);
    console.log('Extension Screen Reader Mode is now active!');
}
// ***********************Helper functions*************************************************
function getExistingTerminal(name) {
    const terminals = vscode.window.terminals;
    for (const terminal of terminals) {
        if (terminal.name === name) {
            return terminal;
        }
    }
    return null;
}
// Helper function to set toggle status in user settings
async function setToggleStatus(settingKey, value) {
    const config = vscode.workspace.getConfiguration();
    const newValue = value ? true : undefined;
    await config.update(settingKey, newValue, vscode.ConfigurationTarget.Global);
    console.log(`Set ${settingKey} to ${newValue}`);
}
// Helper function to get toggle status from user settings
function getToggleStatus(settingKey) {
    const config = vscode.workspace.getConfiguration();
    return config.get(settingKey) === true;
}
// Function to update user settings
function updateSettings(settings) {
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
        }
        else {
            console.error(`Unknown error: ${error}`);
        }
    }
}
// Helper function to update multiple user settings
async function updateMultipleSettings(settings) {
    for (const [key, value] of Object.entries(settings)) {
        await vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
        console.log(value === undefined
            ? `Restored ${key} to default (undefined)`
            : `Set ${key} to: ${JSON.stringify(value)}`);
    }
}
// ***********************Core logic functions*************************************************
// Function to toggle all accessibility signals settings off or on
async function toggleAccessibilitySignalsSettings() {
    await toggleSettings('accessibility.signals', 
    // format og save bør være med og ikke ekskluderes (verdier: never, always, userGestures)
    ['format', 'save', 'has', 'get', 'update', 'inspect'], 'screenreadermode.accessibilitySignalsToggledOff', (value) => {
        if (value && typeof value === 'object') {
            const newValue = { ...value, sound: 'off' };
            if ('announcement' in value) {
                newValue.announcement = 'off';
            }
            return newValue;
        }
        return value;
    });
}
// Function to toggle accessibility all verbosity settings off or on
async function toggleAccessibilityVerbositySettings() {
    await toggleSettings('accessibility.verbosity', ['has', 'get', 'update', 'inspect'], 'screenreadermode.accessibilityVerbosityToggledOff', (value) => false);
}
async function toggleSettings(section, exclude, toggleStatusKey, updateValue) {
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
            vscode.window.showInformationMessage(`${section} settings toggled off.`);
        }
        else {
            // Remove settings from user settings to set back to default
            for (const key of keys) {
                await config.update(key, undefined, vscode.ConfigurationTarget.Global);
                console.log(`Removed setting: ${key} from user settings.`);
            }
            await setToggleStatus(toggleStatusKey, false);
            vscode.window.showInformationMessage(`${section} settings restored to default.`);
        }
        console.log(`${section} settings toggled.`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error toggling ${section} settings: ${error.message}`);
        }
        else {
            console.error(`Unknown error: ${error}`);
        }
    }
}
// Function to handle the checkbox selection in order to toggle user settings.
// Hvis noen av disse er valgt fra før, vil de likevel fjernes hvis du fjerner avkryssingen i quickPick-funksjonen.
function showSettingsPicker(context) {
    try {
        const settingsGroups = [
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
                // Sjekk at riktig hurtigtast vises også på Mac.
                label: 'Disable automatic hover.',
                description: `Automatic hover will be disabled. Trigger manually.`,
                settings: {
                    'editor.hover.enabled': false
                }
            },
        ];
        const storedState = context.workspaceState.get('checkboxState') || [];
        const checkboxes = settingsGroups.map(group => ({
            label: group.label,
            description: group.description,
            picked: storedState.find(state => state.label === group.label)?.picked || false,
            settings: group.settings
        }));
        const quickPick = vscode.window.createQuickPick();
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
                }
                else {
                    // Set settings to undefined when unchecked
                    const undefinedSettings = Object.keys(checkbox.settings).reduce((acc, key) => {
                        acc[key] = undefined;
                        return acc;
                    }, {});
                    updateSettings(undefinedSettings);
                }
            });
            context.workspaceState.update('checkboxState', checkboxes.map(cb => ({ label: cb.label, picked: cb.picked })));
            quickPick.hide();
            vscode.window.showInformationMessage(`User settings were tweaked.`);
        });
        quickPick.show();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error(`Unknown error: ${error}`);
        }
    }
}
async function toggleQuickSuggestionsSettings() {
    try {
        const config = vscode.workspace.getConfiguration();
        const suggestions = config.get('editor.quickSuggestions');
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
            vscode.window.showInformationMessage('Automatic Quick Suggestions disabled!');
        }
        else {
            await updateMultipleSettings(settingsToRestore);
            vscode.window.showInformationMessage('Automatic Quick Suggestions restored to default!');
        }
    }
    catch (error) {
        console.error(`Failed to toggle Automatic Quick Suggestions: ${error}`);
        vscode.window.showErrorMessage(`Failed to toggle Automatic Quick Suggestions: ${error}`);
    }
}
// Function to run Python scripts with minimal text in the terminal.
function runPythonCode() {
    try {
        const terminalName = 'Python';
        let terminal = getExistingTerminal(terminalName);
        if (!terminal) {
            terminal = vscode.window.createTerminal(terminalName);
            console.log(`Created new terminal: ${terminalName}`);
        }
        else {
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
        }
        else {
            console.error(`Unknown error: ${error}`);
        }
    }
}
function deactivate() {
    const config = vscode.workspace.getConfiguration();
    // Reset all accessibility.verbosity settings to default
    const verbosityConfig = vscode.workspace.getConfiguration('accessibility.verbosity');
    const exclude = ['has', 'get', 'update', 'inspect'];
    const verbosityKeys = Object.keys(verbosityConfig).filter(key => !exclude.includes(key));
    for (const key of verbosityKeys) {
        config.update(`accessibility.verbosity.${key}`, undefined, vscode.ConfigurationTarget.Global);
        console.log(`Restored accessibility.verbosity.${key} to default (undefined)`);
    }
    // Reset all accessibility.signals settings to default
    const signalsConfig = vscode.workspace.getConfiguration('accessibility.signals');
    const excludeSignals = ['format', 'save', 'has', 'get', 'update', 'inspect'];
    const signalsKeys = Object.keys(signalsConfig).filter(key => !excludeSignals.includes(key));
    for (const key of signalsKeys) {
        config.update(`accessibility.signals.${key}`, undefined, vscode.ConfigurationTarget.Global);
        console.log(`Restored accessibility.signals.${key} to default (undefined)`);
    }
    const settingsToClear = {
        'editor.minimap.enabled': undefined,
        'workbench.startupEditor': undefined,
        'workbench.editor.empty.hint': undefined,
        'security.workspace.trust.enabled': undefined,
        'git.ignoreMissingGitWarning': undefined,
        'extensions.ignoreRecommendations': undefined,
        'editor.hover.enabled': undefined,
        'editor.quickSuggestions': undefined,
        'editor.suggestOnTriggerCharacters': undefined,
        'editor.parameterHints.enabled': undefined,
        'terminal.integrated.suggest.quickSuggestions': undefined,
        'terminal.integrated.suggest.suggestOnTriggerCharacters': undefined
    };
    for (const [setting, value] of Object.entries(settingsToClear)) {
        config.update(setting, value, vscode.ConfigurationTarget.Global);
    }
    vscode.window.showInformationMessage('Screen Reader Mode deactivated. All settings have been reset to default! Thank you for using Screen Reader Mode!');
}
//# sourceMappingURL=extension.js.map