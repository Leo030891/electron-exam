import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

function NoneSaved({ message }) {
  return (
    <div className="empty-panels">
      <Paper square elevation={2} className="paper">
        <img src="https://s3.amazonaws.com/electron-exam/general/brain.png" alt="" />
        <Typography variant="h4" align="center" className="message">
          {message}
        </Typography>
      </Paper>
    </div>
  )
}

export default NoneSaved
