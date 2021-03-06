# Changelog

- All changes to this project will be recorded in this document

## [Unreleased]

### Changed

- upgrade `react` and `react-dom` to 16.6.0
- shorten style filenames
- restyle exam, history, session items
- restyle dialogs

### Added

- `.gitbook.yml` config file
- `docs` folder and gitbook documentation

### Fix

- Reset question index to 0 when exam starts
- conditionally render dialogs, menus

## [1.0.2] 2018-11-07

### Changed

- Expanded exam validation parameters
- Renamed menu components
- Images max-height set to 50vh

### Added

- First MacOS build - `travis.ci`
- Exam validation error prints list of specific errors
- Added Packages - `react-dnd`, `react-dnd-html5-backend`, `immutability-helper`
- New question type - Drag & Drop Order List
- Changelog link on Readme

### Fix

- Review mode fill in blank explanation bug
- Two consecutive images now separated by line break
- Question Grid fill in blank completed bug
- Removed unused imports and files

## [1.0.1] 2018-10-30

### Changed

- Moved MuiDialog style from theme to component level
- Fill In The Blank processing
- Example Test is now based on Making a Murderer

### Added

- CHANGELOG file
- View Answer, Pause Exam, End Exam added to Exam Menu
- Link to open Exam Maker Web App in Main Menu
- Ability to load remote Exam files
- Note Taking feature in Review Mode
- Ability to add external links to Explanation/Notes
- Added Package - `@material-ui/lab`

## 1.0.0 2018-10-26

- Initial Release

[unreleased]: https://github.com/benjaminadk/electron-exam/compare/v1.0.0...HEAD
[1.0.1]: https://github.com/benjaminadk/electron-exam/compare/v1.0.0...v1.0.1
