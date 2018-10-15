import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/ChevronRightSharp'
import BackIcon from '@material-ui/icons/ChevronLeftSharp'
import LastIcon from '@material-ui/icons/LastPageSharp'
import FirstIcon from '@material-ui/icons/FirstPageSharp'
import TimerIcon from '@material-ui/icons/TimerSharp'
import MenuIcon from '@material-ui/icons/MenuSharp'
import CheckIcon from '@material-ui/icons/DoneOutlineSharp'
import { getTimeHHMMSS } from '../../utils/dateHelpers'

const styles = theme => ({
  explaining: {
    backgroundColor: '#999999',
    color: '#FAFAFA'
  }
})

function BottomBar(props) {
  const { time, explanation, openTestMenu, viewExplanation, classes } = props
  const { onFirstClick, onBackClick, onForwardClick, onLastClick } = props
  return (
    <div className="bottom-bar">
      <div className="timer">
        <TimerIcon className="clock-icon" />
        <Typography variant="subtitle1">{getTimeHHMMSS(time)}</Typography>
      </div>
      <div>
        <IconButton onClick={onFirstClick}>
          <FirstIcon />
        </IconButton>
        <IconButton onClick={onBackClick}>
          <BackIcon />
        </IconButton>
        <IconButton onClick={onForwardClick}>
          <ForwardIcon />
        </IconButton>
        <IconButton onClick={onLastClick}>
          <LastIcon />
        </IconButton>
      </div>
      <div className="menu-icon">
        <IconButton
          onClick={viewExplanation}
          classes={{ root: classNames({ [`${classes.explaining}`]: explanation }) }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton onClick={openTestMenu}>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(BottomBar)
