import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ExitIcon from '@material-ui/icons/ArrowBackSharp'

function ReviewMenuLeftBack({ exit }) {
  const list = [{ text: 'Back to Main', icon: <ExitIcon />, click: exit }]
  return (
    <div style={{ position: 'absolute', bottom: 0, width: 240, overflow: 'hidden' }}>
      <Divider />
      <List disablePadding>
        {list.map((l, i) => (
          <ListItem key={l.text} onClick={l.click} button>
            <ListItemIcon>{l.icon}</ListItemIcon>
            <ListItemText primary={l.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )
}

export default ReviewMenuLeftBack
