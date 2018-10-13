import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import BackIcon from '@material-ui/icons/ChevronLeft'
import LastIcon from '@material-ui/icons/LastPage'
import FirstIcon from '@material-ui/icons/FirstPage'
import TimerIcon from '@material-ui/icons/Timer'
import MenuIcon from '@material-ui/icons/Menu'

function BottomBar({ time, onBackClick, onForwardClick }) {
  return (
    <div className="bottom-bar">
      <div className="timer">
        <TimerIcon className="clock-icon" />
        <Typography variant="subtitle1">
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </Typography>
      </div>
      <div>
        <IconButton>
          <FirstIcon />
        </IconButton>
        <IconButton onClick={onBackClick}>
          <BackIcon />
        </IconButton>
        <IconButton onClick={onForwardClick}>
          <ForwardIcon />
        </IconButton>
        <IconButton>
          <LastIcon />
        </IconButton>
      </div>
      <div className="menu-icon">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1">Menu</Typography>
      </div>
    </div>
  )
}

export default BottomBar
