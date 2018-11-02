import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { HistoryIcon } from '../Icons'
import NoteIcon from '@material-ui/icons/NoteAddSharp'

const styles = theme => ({
  listItem: {
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      outline: '2px solid rgb(1, 139, 244)',
      color: 'rgb(1, 139, 244)'
    }
  }
})

function ReviewMenuBottom({ backToSummary, openNotePrompt, classes }) {
  const list = [
    {
      text: 'Add Notes',
      icon: <NoteIcon />,
      click: openNotePrompt
    },
    { text: 'Back to Summary', icon: <HistoryIcon />, click: backToSummary }
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

export default withStyles(styles)(ReviewMenuBottom)
