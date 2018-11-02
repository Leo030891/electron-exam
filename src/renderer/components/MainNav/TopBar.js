import React from 'react'
import Typography from '@material-ui/core/Typography'

function TopBar({ mainMode, setMainMode }) {
  return (
    <div className="main-menu-top">
      <Typography
        variant="h5"
        className="items"
        style={{
          borderBottom: mainMode === 0 ? '3px solid rgb(31, 144, 224)' : '3px solid transparent'
        }}
        onClick={() => setMainMode(0)}
      >
        Exams
      </Typography>
      <Typography
        variant="h5"
        className="items"
        onClick={() => setMainMode(1)}
        style={{
          borderBottom: mainMode === 1 ? '3px solid rgb(31, 144, 224)' : '3px solid transparent'
        }}
      >
        History
      </Typography>
      <Typography
        variant="h5"
        className="items"
        onClick={() => setMainMode(2)}
        style={{
          borderBottom: mainMode === 2 ? '3px solid rgb(31, 144, 224)' : '3px solid transparent'
        }}
      >
        Sessions
      </Typography>
    </div>
  )
}

export default TopBar
