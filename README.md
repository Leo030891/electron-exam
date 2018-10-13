## Electron Exam

### Test Format

```
{
  title: String,
  code: String
}
```

- entries - elements of question

  - type 0 - image
  - type 1 - text

- questions
  - type 0 - multiple choice
  - type 1 - checkbox

### App State

- mode

  - 0 - main screen - exams, history, session
  - 1 - cover of selected exam
  - 2 - exam interface
  - 3 - review results

- mainMode

  - 0 - exams on file
  - 1 - history of taken exams
  - 2 - sessions of tests in progress

### Todos

**App**

- [ ] handle fs errors
- [ ] handle user attempt to load duplicate filename
- [ ] replace electron popups menus with Mui - popups too small
- [ ] replace electron dialogs with Mui - annoying sound
