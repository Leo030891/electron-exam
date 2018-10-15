import React from 'react'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

function ScoreComp({ pass, score }) {
  return (
    <div className="comparison">
      <Typography>Passing Score: {pass}%</Typography>
      <LinearProgress variant="determinate" value={pass} />
      <LinearProgress variant="determinate" value={score} />
      <Typography>Your Score: {score}%</Typography>
    </div>
  )
}

export default ScoreComp
