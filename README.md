# Screen Reader Mode README

![Version](https://img.shields.io/visual-studio-marketplace/v/Statped.recommendedsettings)
![Latest](https://img.shields.io/github/last-commit/oivron/settings-extension-vscode)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/Statped.recommendedsettings)
![Repo size](https://img.shields.io/github/license/oivron/settings-extension-vscode)

A Visual Studio Code extension for users of screen readers like [NVDA](https://www.nvaccess.org/), [JAWS](https://www.freedomscientific.com/products/software/jaws/) and VoiceOver. It is intended for students who are learning to code with Python, but also other languages. The extension updates User Settings and adds a few extra keyboard shortcuts. The overall idea is to make things as simple as possible. [See list of features below](#features).

## Table of Contents
- [Features](#features)
- [How to use](#how-to-use)
- [Available Commands and shortcuts](#available-commands-and-shortcuts)
- [Modified User Settings](#modified-user-settings)
- [Prerequisits](#prerequisits)
- [Visual Studio Code Accessibility](#visual-studio-code-accessibility)
- [Release Notes](#release-notes)

## Features

This extension [disables and enables various user settings](#modified-user-settings). It also [adds some new shortcuts](#available-commands-and-shortcuts).

### Disables

- Disables [Git](https://code.visualstudio.com/docs/sourcecontrol/overview) (students will basically work on smaller projects and do not need Git)
- Disables Preview Mode (each file will have their own tab)
- Disables Watermark Tips when no editor is open
- Disables Startup Editor (the startup editor will be empty until you open a file)
- Disables Minimap (not accessible with screen readers)
- Disables Hover (not accessible with screen readers)
- Disables Parameterhints (not accessible with screen readers)
- Disables Workspace Trust (students will basically work on their own files)
- Disables Jupyter Auto Start (you can always start Jupyter later on)
- Disables Recommended Extensions (to avoid unneccesary notifications)
- Disables Pylint messages in the Warning and Convention categories (only showing errors)

### Enables or adds

- Enables [Pylint](https://code.visualstudio.com/docs/python/linting) (If Pylint is not installed, you will be notified)
- Enables Accessibility Support (for screen readers to work properly)
- Adds shortcut to toggle Quick Suggestions on or off
- Adds shortcut to access the Notifications list
- Adds shortcut to access the Status Bar

## How to use

1. Make sure [Python](https://www.python.org/) is installed on your system.
2. Open Extensions view and make sure you have the [Python extension from Microsoft](https://marketplace.visualstudio.com/items?itemName=ms-python.python) installed.
3. From Extensions view, search for and install this extension ('__Recommended Settings__' from publisher Statped).
4. Restart Visual Studio Code.
5. The installed extension will now provide you with a few additional commands.
    - __Recommended User Settings (Screen Readers)__
    - __Toggle Automatic Quick Suggestions__
    - __Notifications: Show Notifications__
    - __Focus Status Bar__
5. Open Command Palette and select __Recommended User Settings (Screen Readers)__. This will modify your Visual Studio Code User Settings.

## Available Commands and shortcuts

The extension provides you with some new Command Palette commands:

| Command                                        | Windows       | macOS|Description                                                   |
| -----------                                    | -----------    | ---------- | -----------                                                   |
| __Recommended User Settings (Screen Readers)__ | N/A            | N/A | Updates User Settings with recommended settings |
| __Toggle Automatic Quick Suggestions__*         | __Ctrl+Alt+Q__ | __Command+Option+Q__ | Toggles Automatic Quick Suggestions on or off                 |
| __Notifications: Show Notifications__          | __Ctrl+Alt+N__ | __Command+Option+N__ | Shows notification list                      |
| __Focus Status Bar__          | __Ctrl+Alt+B__ | __Command+Option+B__ | Sets focus on the first item of the Status Bar                      |
|||||

*__Toggles Automatic Quick Suggestions on or off__: For some screen reader users, Quick Suggestions makes coding more complicated. The suggestions list that pops up might be confusing and do not work well with all screen readers. When disabled, Quick Suggestions may still be triggered manually with __Ctrl+Space__.

## Modified User Settings

This extension modifies User Settings as described below. User Settings are located at:

- Windows: `%APPDATA%\Code\User\settings.json`
- macOS: `$HOME/Library/Application Support/Code/User/settings.json`

```
// Git
"git.enabled": false,
"git.autofetch": false,
"git.ignoreMissingGitWarning": true,

// Workbench
"workbench.editor.enablePreview": false,
"workbench.tips.enabled": false,
"workbench.startupEditor": "none",

// Editor
"editor.minimap.enabled": false,
"editor.hover.enabled": false,
"editor.parameterHints.enabled": false,
"editor.accessibilitySupport": "on",

// Security
"security.workspace.trust.enabled": false,

// Python
"python.languageServer": "Pylance",
"python.linting.enabled": true,
"python.linting.pylintEnabled": true
"python.linting.pylintArgs": [
    "--disable:W,C" //disables Pylint messages in the Warning and Convention categories
]

// Miscellaneous
"jupyter.disableJupyterAutoStart": true,
"extensions.ignoreRecommendations": true
```

## Prerequisits

[Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) from Microsoft.

## Visual Studio Code Accessibility

A description of all accessibility features in Visual Studio Code can be found at [code.visualstudio.com/docs/editor/accessibility](https://code.visualstudio.com/docs/editor/accessibility).

## Release Notes

## [1.1.0] - 2023-03-10

- Removed disabling Pylint messages by numerical IDs (e.g. W0614)
- Added disabling Pylint messages by category (e.g. W)
- Added keybinding for easy access to the Status Bar
- Added keybindings for macOS
- Updated readme file
- Updated description (package.json)
- Replaced icon
- Renamed extension Screen Reader Mode (previously Recommended Settings)
- npm updates