import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/DoneOutlineSharp'
import PauseIcon from '@material-ui/icons/PauseSharp'
import StopIcon from '@material-ui/icons/StopSharp'

const styles = theme => ({
  listItem: {
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      outline: '2px solid rgb(1, 139, 244)',
      color: 'rgb(1, 139, 244)'
    }
  }
})

function ExamMenuBottom({ viewExplanation, pauseExam, endExam, classes }) {
  const list = [
    { text: 'Show Answer', icon: <CheckIcon />, click: viewExplanation },
    { text: 'Pause Exam', icon: <PauseIcon />, click: pauseExam },
    { text: 'End Exam', icon: <StopIcon />, click: endExam }
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

export default withStyles(styles)(ExamMenuBottom)
