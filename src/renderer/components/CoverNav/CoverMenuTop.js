import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBackIosSharp'
import ForwardIcon from '@material-ui/icons/ArrowForwardIosSharp'

const styles = theme => ({
  iconButton: {
    width: 73,
    height: 63,
    borderRadius: 0,
    color: theme.palette.grey[800],
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      color: 'rgb(31, 144, 224)',
      outline: '2px solid rgb(1, 139, 244)'
    }
  }
})

function CoverMenuTop({ setMode, openConfirmSE, classes }) {
  return (
    <div className="cover-menu-top">
      <Typography variant="h6">Start Exam</Typography>
      <div>
        <IconButton classes={{ root: classes.iconButton }} onClick={() => setMode(0)}>
          <BackIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }} onClick={openConfirmSE}>
          <ForwardIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(CoverMenuTop)
