# Loading Exam Files

## Exam Files

* Exam Simulator ships with one `Demo Exam`, all other exam files must be loaded
* Exam files must have the `JSON` extension
* Exam files must be in the valid Exam Simulator format
* Exam files can be loaded locally or remotely

## Exam Format

A valid Exam is a JSON object with a specific format

### Exam Object

| Property | Type | Description |
| :--- | :--- | :--- |
| title | String | title of the exam |
| code | String | code for exam - common with certifications |
| pass | Integer | passing percentage score |
| time | Integer | time limit in minutes |
| image | String | URL of featured image - use square dimensions |
| cover | \[Node\] | visualization of exam - seen before exam begins |
| test | \[Question\] | actual content of exam |

### Question Object

| Property | Type | Description |
| :--- | :--- | :--- |
| variant | Integer { 0, 1, 2, 3 } | represents question type |
| question | \[Node\] | question text and/or graphics |
| choices | \[Choice\] | possible answers |
| answer | \[Boolean\] | correct answer/s |
| explanation | \[Explanation\] | explanation text, link, graphics |

### Question Variants

* 0 - Multiple Choice
* 1 - Multiple Answer
* 2 - Fill In The Blank
* 3 - List Order

### Choice Object

| Property | Type | Description |
| :--- | :--- | :--- |
| label | String | label of choice |
| text | String | text of choice |

### Node Object

| Property | Type | Description |
| :--- | :--- | :--- |
| variant | Integer { 0, 1, 2 } | represents type of node |
| text | String | text or source of image |

### Node Variants

* 0 - Image
* 1 - Normal Text
* 2 - Large Text

Explanation Object

Same to Node Object but allows variant 3, which is an external link. This requires the additional property of _href._ 

| Property | Type | Description |
| :--- | :--- | :--- |
| href | String | URL of external link |

Answer Array

The Answer Array consists of Boolean values. These correspond to the _choices_ property. If `choices[0]` is correct, then `answer[0]` should be `true`. 

## Local Files

1. Click `Load Local File` on main menu
2. Select desired file from dialog
3. Exam appears in exam list

## Remote Files

1. Click `Load Remote File`
2. Enter HTTP address into text input and press OK
3. Exam appears in exam list

This feature is designed to work with [Exam Maker](https://exam-maker.herokuapp.com) but will work with any endpoint that sends a valid exam file.

## Validation Errors

If an exam file is not valid an error message will be displayed. This will list the location and reason for each error in the file.

## Deleting Files

1. Click on exam
2. Select `Delete Exam` and confirm
3. Exam file and any associated history or session data will be removed from Exam Simulator
4. Will not delete other local copies of the exam file

