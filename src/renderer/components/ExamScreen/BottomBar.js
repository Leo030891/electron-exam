import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slider from 'react-rangeslider'
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
    color: 'rgb(31, 144, 224)'
  },
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
  const { time, explanation, openTestMenu, viewExplanation, classes } = props
  const { question, marked, examMode, totalQuestions, handleSlider } = props
  const { onFirstClick, onBackClick, onForwardClick, onLastClick } = props
  return (
    <div className="bottom-bar">
      <div className="timer">
        <TimerIcon className="clock-icon" />
        <Typography variant="subtitle1">{getTimeHHMMSS(time)}</Typography>
      </div>
      <div className="slider">
        <Slider
          min={1}
          max={examMode === 0 ? totalQuestions : marked.length}
          step={1}
          value={examMode === 0 ? question + 1 : marked.indexOf(question) + 1}
          onChange={handleSlider}
        />
      </div>
      <div className="arrows">
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
      <div className="menu-icon">
        <IconButton
          onClick={viewExplanation}
          style={{ color: explanation && 'rgb(31, 144, 224)' }}
          classes={{
            root: classNames(
              { [`${classes.iconButton}`]: true },
              { [`${classes.explaining}`]: explanation }
            )
          }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }} onClick={openTestMenu}>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(BottomBar)
