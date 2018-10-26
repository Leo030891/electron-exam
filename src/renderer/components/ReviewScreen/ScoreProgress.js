import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
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
    height: 20,
    backgroundColor: 'rgb(230, 230, 230)'
  },
  bar: {
    backgroundColor: 'rgb(186, 186, 186)'
  }
})

function ScoreComp({ pass, score, classes }) {
  return (
    <div className="comparison">
      <Typography>Passing Score: {pass}%</Typography>
      <LinearProgress
        variant="determinate"
        value={pass}
        color="primary"
        classes={{
          root: classes.rootLP,
          bar: classes.bar
        }}
      />
      <LinearProgress
        variant="determinate"
        value={score}
        classes={{ root: classes.rootLP, bar: score >= pass ? classes.pass : classes.fail }}
      />
      <Typography>Your Score: {score}%</Typography>
    </div>
  )
}

export default withStyles(styles)(ScoreComp)
