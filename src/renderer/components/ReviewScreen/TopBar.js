import React from 'react'
import Typography from '@material-ui/core/Typography'

function TopBar({ score, status }) {
  return (
    <div>
      <Typography variant="h4">Review Exam Results</Typography>
      <Typography variant="caption">
        Your Score: {score}% - {status ? 'PASS' : 'FAIL'}
      </Typography>
    </div>
  )
}

export default TopBar
