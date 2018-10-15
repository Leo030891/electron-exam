## Electron Exam

### Test Format

**Exam**

```
{
  title: String --> the title of the test,
  code: String --> exam code,
  group: String --> organize exams within app,
  time: Int --> exam duration in minutes,
  pass: Int --> minimum passing score percentage,
  cover: [Item] --> presented before exam begins
  test: [Question] --> the exam questions
}
```

**Item**

```
{
  type: Int --> 0 = image | 1 = text,
  src: String --> if type 0 this is image src url,
  text: String --> if type 1 this is text
}
```

**Choice**

```
{
  label: String|Int --> answer label such as 1 or "A",
  text: String --> answer itself
}
```

**Question**

```
{
  type: Int --> 0 = Multiple Choice | 1 = Checkboxes,
  question: [Items] --> components of question,
  choices: [Choices] --> possible answer choices,
  answer: [Boolean] --> true for correct, false for incorrect,
  explanation: [Item] --> explains why answer is the answer
}
```

### App State

- **loading**

  - Boolean
  - true when JSON files are being read and loaded

- **mode**

  - Int
  - 0 - main screen - exams, history, session
  - 1 - cover of selected exam
  - 2 - exam interface
  - 3 - review results

- **mainMode**
  - Int
  - 0 - exams on file
  - 1 - history of taken exams
  - 2 - sessions of tests in progress

### Todos

- [ ] handle fs errors
- [ ] handle user attempt to load duplicate filename
- [ ] handle errors and build out remote exam load
- [ ] replace electron popups menus with Mui - popups too small
- [ ] replace electron dialogs with Mui - annoying sound
- [ ] find better calculator icon
