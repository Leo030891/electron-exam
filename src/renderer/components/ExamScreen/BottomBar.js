import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/ChevronRightSharp'
import BackIcon from '@material-ui/icons/ChevronLeftSharp'
import LastIcon from '@material-ui/icons/LastPageSharp'
import FirstIcon from '@material-ui/icons/FirstPageSharp'
import TimerIcon from '@material-ui/icons/TimerSharp'
import MenuIcon from '@material-ui/icons/MenuSharp'

function BottomBar({ time, onFirstClick, onBackClick, onForwardClick, onLastClick, openTestMenu }) {
  return (
    <div className="bottom-bar">
      <div className="timer">
        <TimerIcon className="clock-icon" />
        <Typography variant="subtitle1">
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </Typography>
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
        <IconButton onClick={openTestMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1">Menu</Typography>
      </div>
    </div>
  )
}

export default BottomBar
