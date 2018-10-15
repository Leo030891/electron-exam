import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddLocalIcon from '@material-ui/icons/PlaylistAddSharp'
import { AddRemoteIcon } from '../Icons'

const styles = theme => ({})

function MainMenuLeft({ loadLocalExam, openPromptLR, classes }) {
  const list = [
    { text: 'Load Local File', icon: <AddLocalIcon />, click: loadLocalExam },
    { text: 'Load Remote File', icon: <AddRemoteIcon />, click: openPromptLR }
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

export default withStyles(styles)(MainMenuLeft)
