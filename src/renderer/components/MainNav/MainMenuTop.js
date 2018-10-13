import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({})

function MainMenuTop({ setMainMode, classes }) {
  return (
    <div className="main-menu-top">
      <Typography variant="h5" className="items" onClick={() => setMainMode(0)}>
        Exams
      </Typography>
      <Typography variant="h5" className="items" onClick={() => setMainMode(1)}>
        History
      </Typography>
      <Typography variant="h5" className="items" onClick={() => setMainMode(2)}>
        Sessions
      </Typography>
    </div>
  )
}

export default withStyles(styles)(MainMenuTop)
