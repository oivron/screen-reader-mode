# Changelog

## [2.0.18] - 2025-11-20

### Changed
- Fixed vulnerabilities in `glob` and `js-yaml` by upgrading to safe versions.

## [2.0.17] - 2025-11-18

### Added
- New function to Tweak User Settings.
- Option to toggle Accessibility Verbosity settings.
- Option to toggle Accessibility Signals settings.
- Command to run the current Python script with minimal output.
- Category prefix for `contributes.commands`.

### Changed
- Improved function for toggling automatic quick suggestions.
- Upgraded TypeScript to version 5.8.3.
- Upgraded Node.js to the latest LTS version, 22.16.0.
- Updated npm packages for compatibility with the new Node.js version.
- Refactored code to address breaking changes in TypeScript.
- General code refactoring and improvements throughout the extension.
- Updated `README.md`.

### Removed
- Deprecated function for updating user settings.
- Keybinding for quick access to the Status Bar.
- Keybinding for showing notifications ([use default command instead](readme.md#available-commands-and-keyboard-shortcuts)).
- Python-specific linting settings.

### To Do
- Include an option to toggle accessibility signals for `accessibility.signals.format` and `accessibility.signals.save` in addition to the other accessibility signals settings.
- Improve the extension’s settings in the User Settings UI, as the current configuration is incomplete.
- Add a check to determine if Python is installed.
- Resolve the issue with settings in Quick Pick within the Tweak User Settings function. If any of these settings are manually configured, they will not be retained when using Quick Pick. This applies only to the settings in Quick Pick; all other settings remain unchanged.

## [1.1.1] - 2023-03-10
- Fixed typo in package.json

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

## [0.0.1] - 2021-05-18

- Initial release