import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddLocalIcon from '@material-ui/icons/PlaylistAddSharp'
import { AddRemoteIcon } from '../Icons'

const styles = theme => ({
  listItem: {
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      outline: '2px solid rgb(1, 139, 244)',
      color: 'rgb(1, 139, 244)'
    }
  }
})

function MainMenuLeftTop({ loadLocalExam, openPromptLR, classes }) {
  const list = [
    { text: 'Load Local File', icon: <AddLocalIcon />, click: loadLocalExam },
    { text: 'Load Remote File', icon: <AddRemoteIcon />, click: openPromptLR }
  ]
  return (
    <List disablePadding>
      {list.map((l, i) => (
        <ListItem key={l.text} button onClick={l.click} classes={{ button: classes.listItem }}>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(MainMenuLeftTop)
