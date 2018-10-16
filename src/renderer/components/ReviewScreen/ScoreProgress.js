import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  pass: {
    backgroundColor: 'green'
  },
  fail: {
    backgroundColor: 'red'
  }
})

function ScoreComp({ pass, score, classes }) {
  return (
    <div className="comparison">
      <Typography>Passing Score: {pass}%</Typography>
      <LinearProgress variant="determinate" value={pass} />
      <LinearProgress
        variant="determinate"
        value={score}
        classes={{ bar: score >= pass ? classes.pass : classes.fail }}
      />
      <Typography>Your Score: {score}%</Typography>
    </div>
  )
}

export default withStyles(styles)(ScoreComp)
