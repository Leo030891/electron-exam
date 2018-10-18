import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { HistoryIcon } from '../Icons'

function ReviewMenuLeftBottom({ backToSummary }) {
  const list = [{ text: 'Back to Summary', icon: <HistoryIcon />, click: backToSummary }]
  return (
    <List disablePadding>
      {list.map((l, i) => (
        <ListItem key={l.text} onClick={l.click} button>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default ReviewMenuLeftBottom
