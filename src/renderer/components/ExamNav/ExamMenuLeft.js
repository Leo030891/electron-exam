import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { CalcIcon } from '../Icons'
import AllIcon from '@material-ui/icons/ListAltSharp'
import BookmarkIcon from '@material-ui/icons/BookmarkSharp'
import { execFile } from 'child_process'

function ExamMenuLeft({ enterMarkedMode, setExamMode }) {
  const list = [
    { text: 'All Questions', icon: <AllIcon />, click: () => setExamMode(0) },
    { text: 'Marked Questions', icon: <BookmarkIcon />, click: enterMarkedMode },
    {
      text: 'Calculator',
      icon: <CalcIcon />,
      click: () => execFile(`C:/Windows/System32/calc.exe`)
    }
  ]
  return (
    <List>
      {list.map((l, i) => (
        <ListItem key={l.text} onClick={l.click} button>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default ExamMenuLeft
