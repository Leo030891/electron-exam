### Exam Files

- Exam Simulator ships with one `Demo Exam`, all other exam files must be loaded
- Exam files must have the `JSON` extension
- Exam files must be in the valid Exam Simulator format
- Exam files can be loaded locally or remotely

### Exam Format

Will contain format rules

### Local Files

1. Click `Load Local File` on main menu
2. Select desired file from dialog
3. Exam appears in exam list

### Remote Files

1. Click `Load Remote File`
2. Enter HTTP address into text input and press OK
3. Exam appears in exam list

This feature is designed to work with [Exam Maker](https://exam-maker.herokuapp.com) but will work with any endpoint that sends a valid exam file.

### Validation Errors

If an exam file is not valid an error message will be displayed. This will list the location and reason for each error in the file.

### Deleting Files

1. Click on exam
2. Select `Delete Exam` and confirm
3. Exam file and any associated history or session data will be removed from Exam Simulator

- Will not delete other local copies of the exam file
