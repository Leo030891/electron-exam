import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  paper: {
    borderRadius: 0
  }
})

function Popup({ anchorEl, menuItems, onClose, classes }) {
  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorReference="anchorPosition"
      anchorPosition={anchorEl}
      onClose={onClose}
      elevation={5}
      MenuListProps={{ disablePadding: true }}
      classes={{ paper: classes.paper }}
    >
      {menuItems.map((m, i) => (
        <MenuItem key={m.text} onClick={m.click}>
          {m.text}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default withStyles(styles)(Popup)
