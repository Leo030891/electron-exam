import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/SaveSharp'

const styles = theme => ({
  paper: {
    backgroundColor: 'rgb(232, 244, 252)',
    '&:hover': {
      backgroundColor: 'rgb(209, 235, 250)',
      outline: '2px solid rgb(1, 139, 244)'
    }
  }
})

function SessionItem({ title, code, date, time, answered, remaining, filename, classes, onClick }) {
  return (
    <Paper square onClick={onClick} className="panel-paper" classes={{ root: classes.paper }}>
      <SaveIcon className="panel-icon" />
      <div className="panel-container">
        <div className="panel-left">
          <div className="panel-info">
            <Typography variant="h5" className="panel-mr10">
              {title}
            </Typography>
            <Typography variant="h5">{code}</Typography>
          </div>
          <div className="panel-info">
            <Typography variant="subtitle2" className="panel-mr20">
              Date: {date}
            </Typography>
            <Typography variant="subtitle2">Time: {time}</Typography>
          </div>
          <div className="panel-info">
            <Typography variant="subtitle2" className="panel-mr20">
              Answered: {answered}
            </Typography>
            <Typography variant="subtitle2">Time Remaining: {remaining}</Typography>
          </div>
        </div>
        <div className="panel-right">
          <div className="panel-info">
            <Typography variant="subtitle2">Filename: {filename}</Typography>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(SessionItem)
