import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { CalcIcon } from '../Icons'
import AllIcon from '@material-ui/icons/ListAltSharp'
import BookmarkIcon from '@material-ui/icons/BookmarkSharp'
import { execFile } from 'child_process'

const styles = theme => ({
  listItem: {
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      outline: '2px solid rgb(1, 139, 244)',
      color: 'rgb(1, 139, 244)'
    }
  }
})

function ExamMenuTop({ enterMarkedMode, setExamMode, classes }) {
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
    <List disablePadding>
      {list.map((l, i) => (
        <ListItem key={l.text} onClick={l.click} classes={{ button: classes.listItem }} button>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(ExamMenuTop)
