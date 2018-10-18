import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ForwardIcon from '@material-ui/icons/ChevronRightSharp'
import BackIcon from '@material-ui/icons/ChevronLeftSharp'
import LastIcon from '@material-ui/icons/LastPageSharp'
import FirstIcon from '@material-ui/icons/FirstPageSharp'

function BottomBar(props) {
  const { onFirstClick, onBackClick, onForwardClick, onLastClick } = props
  return (
    <div className="review-bottom-bar">
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
    </div>
  )
}

export default BottomBar
