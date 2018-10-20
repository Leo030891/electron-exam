import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ForwardIcon from '@material-ui/icons/ChevronRightSharp'
import BackIcon from '@material-ui/icons/ChevronLeftSharp'
import LastIcon from '@material-ui/icons/LastPageSharp'
import FirstIcon from '@material-ui/icons/FirstPageSharp'

const styles = theme => ({
  iconButton: {
    borderRadius: 0,
    color: theme.palette.grey[800],
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      color: 'rgb(31, 144, 224)',
      outline: '2px solid rgb(1, 139, 244)'
    }
  }
})

function BottomBar(props) {
  const { onFirstClick, onBackClick, onForwardClick, onLastClick, classes } = props
  return (
    <div className="bottom-bar">
      <div>
        <IconButton classes={{ root: classes.iconButton }} onClick={onFirstClick}>
          <FirstIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }} onClick={onBackClick}>
          <BackIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }} onClick={onForwardClick}>
          <ForwardIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }} onClick={onLastClick}>
          <LastIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(BottomBar)
