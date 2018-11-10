import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  pass: {
    backgroundColor: 'green'
  },
  fail: {
    backgroundColor: 'red'
  },
  rootLP: {
    height: '10px',
    backgroundColor: 'rgb(230, 230, 230)'
  },
  bar: {
    backgroundColor: 'rgb(186, 186, 186)'
  }
})

function ScoreComp({ pass, score, classes }) {
  return (
    <Paper square className="comparison">
      <Typography variant="overline">Passing Score: {pass}%</Typography>
      <LinearProgress
        variant="determinate"
        value={pass}
        color="primary"
        classes={{ root: classes.rootLP, bar: classes.bar }}
      />
      <Typography variant="overline">Your Score: {score}%</Typography>
      <LinearProgress
        variant="determinate"
        value={score}
        classes={{ root: classes.rootLP, bar: score >= pass ? classes.pass : classes.fail }}
      />
    </Paper>
  )
}

export default withStyles(styles)(ScoreComp)
