# Recommended Settings README

This extension updates User Settings with settings that could benefit screen reader users.

## Features

When installed, you will have two commands available from Command Palette (Ctrl+Shift+P):

- Recommended User Settings (Screen Readers)
- Toggle Quick Suggestions Ctrl+Alt+Q

### Recommended User Settings (Screen Readers)

Updates User Settings as described below.

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

// Python
"jupyter.disableJupyterAutoStart": true,
"python.linting.pylintArgs": [
    "--disable=W0614", // unused-wildcard-import
    "--disable=C0111", // missing-docstring
    "--disable=W0401", // wildcard-import
    "--disable=C0411", // wrong-import-order
    "--disable=C0413", // wrong-import-position
    "--disable=E0401", // import-error
    "--disable=C0326", // bad-whitespace
    "--disable=C0303" // trailing-whitespace
]

// Miscellaneous
"extensions.ignoreRecommendations": true,
"editor.accessibilitySupport": "on",
```

### Toggle Quick Suggestions Ctrl+Alt+Q

Toggles  Quick Suggestions on or off.

```
// Quick Suggestions off
"editor.quickSuggestions": {
    "other": false,
    "comments": false,
    "strings": false
}

// Quick Suggestions on (default)
"editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
}
```

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

## Release Notes

### 0.0.1 2021-05-18

Initial release.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
#   s e t t i n g s - e x t e n s i o n - v s c o d e  
 