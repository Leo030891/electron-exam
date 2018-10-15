import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

function Loading() {
  return (
    <div className="loading">
      <div className="spinner">
        <CircularProgress size={80} thickness={2} color="inherit" />
        <Typography variant="caption">Loading...</Typography>
      </div>
    </div>
  )
}

export default Loading
