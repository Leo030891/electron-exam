import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { CalcIcon } from '../Icons'
import { execFile } from 'child_process'

function ExamMenuLeft() {
  const list = [
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
