import React from 'react'
import Typography from '@material-ui/core/Typography'

function TopBar({ top, bottom }) {
  return (
    <div className="review-exam-top">
      <Typography variant="h4">{top}</Typography>
      <Typography variant="caption">{bottom}</Typography>
    </div>
  )
}

export default TopBar
