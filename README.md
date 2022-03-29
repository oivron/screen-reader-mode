# Recommended Settings README

This extension updates User Settings. The overall idea is to make things as easy as possible for students who are using a screen reader. See list of settings below.

## Features

When installed, you will have two commands available from the Command Palette (Ctrl+Shift+P). The extension also adds a keyboard shortcut to access the notifications list:

| Command                                        | Keyboard       | Description                                                   |
| -----------                                    | -----------    | -----------                                                   |
| __Recommended User Settings (Screen Readers)__ | N/A            | Updates User Settings with recommended settings |
| __Toggle Automatic Quick Suggestions__         | __Ctrl+Alt+Q__ | Toggles Automatic Quick Suggestions on or off                 |
| __Notifications: Show Notifications__          | __Ctrl+Alt+N__ | Shows notification list (shortcut added)                      |

### Recommended User Settings (Screen Readers)

Run this command to update User settings. Settings are updated as described below:

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
    "--disable=W0614", // unused-wildcard-import
    "--disable=C0111", // missing-docstring
    "--disable=W0401", // wildcard-import
    "--disable=C0411", // wrong-import-order
    "--disable=C0413", // wrong-import-position
    "--disable=E0401", // import-error
    "--disable=C0326", // bad-whitespace
    "--disable=C0303", // trailing-whitespace
    "--disable=C0305", // trailing-newlines
    "--disable=C0103", // invalid-name
]

// Miscellaneous
"jupyter.disableJupyterAutoStart": true,
"extensions.ignoreRecommendations": true
```

### Toggle Quick Suggestions Ctrl+Alt+Q

Toggles Automatic Quick Suggestions on or off. For some screen reader users, Quick Suggestions makes coding more complicated. The suggestions list that pops up might be confusing and do not work well with all screen readers. When disabled, Quick Suggestions may still be triggered manually with Ctrl+space.

Toggle Quick Suggestions updates User Settings:

```
// Automatic Quick Suggestions off
"editor.quickSuggestions": {
    "other": false,
    "comments": false,
    "strings": false
}

// Automatic Quick Suggestions on (default)
"editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
}
```

## Known Issues

## Release Notes

## [1.0.0] - 2022-03-28

- Security updates
- Added Pylint argument for trailing newlines (C0305) and invalid-name (0103)
- Added settings:
    - security.workspace.trust.enabled: false
    - python.languageServer: Pylance
    - python.linting.enabled: true
    - python.linting.pylintEnabled: true
    - jupyter.disableJupyterAutoStart: true
- Added Lisence
- Updated readme file
