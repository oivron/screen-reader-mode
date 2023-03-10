# Change Log

All notable changes to the "recommendedsettings" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 2021-05-18

- Initial release

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
