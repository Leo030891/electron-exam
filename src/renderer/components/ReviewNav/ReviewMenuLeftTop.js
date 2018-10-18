import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AllIcon from '@material-ui/icons/ListAltSharp'
import IncorrectIcon from '@material-ui/icons/CloseSharp'
import { IncompleteIcon } from '../Icons'

function ReviewMenuLeftTop({ total, report: { incomplete, incorrect }, setReviewType }) {
  const list = [
    {
      text: 'All Questions',
      total: `(${total})`,
      icon: <AllIcon />,
      click: () => setReviewType('all')
    },
    {
      text: 'Incorrect Answers',
      total: `(${incorrect.length})`,
      icon: <IncorrectIcon />,
      click: () => setReviewType('incorrect')
    },
    {
      text: 'Incomplete',
      total: `(${incomplete.length})`,
      icon: <IncompleteIcon />,
      click: () => setReviewType('incomplete')
    }
  ]
  return (
    <List disablePadding>
      {list.map((l, i) => (
        <ListItem key={l.text} onClick={l.click} button>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {l.text} <small>{l.total}</small>
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

export default ReviewMenuLeftTop
