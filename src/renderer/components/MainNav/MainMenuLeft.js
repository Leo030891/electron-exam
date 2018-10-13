import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/PlaylistAdd'

const styles = theme => ({})

function MainMenuLeft({ loadLocalExam, classes }) {
  const list = [{ text: 'Load Local File', icon: <AddIcon />, click: loadLocalExam }]
  return (
    <List>
      {list.map((l, i) => (
        <ListItem key={l.text} onClick={loadLocalExam} button>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(MainMenuLeft)
