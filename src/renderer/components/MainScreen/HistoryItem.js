import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ThumbsUp from '@material-ui/icons/ThumbUpSharp'
import ThumbsDown from '@material-ui/icons/ThumbDownSharp'

const styles = theme => ({
  paper: {
    backgroundColor: 'rgb(232, 244, 252)',
    '&:hover': {
      backgroundColor: 'rgb(209, 235, 250)',
      outline: '2px solid rgb(1, 139, 244)'
    }
  }
})

function HistoryItem({ pass, score, date, time, elapsed, filename, classes, onClick }) {
  return (
    <Paper square onClick={onClick} className="panel-paper" classes={{ root: classes.paper }}>
      {pass ? <ThumbsUp className="panel-icon" /> : <ThumbsDown className="panel-icon" />}
      <div className="panel-container">
        <div className="panel-left">
          <div className="panel-info">
            <Typography
              variant="h5"
              className="panel-mr10"
              style={{ color: pass ? 'green' : 'red' }}
            >
              {pass ? 'PASS' : 'FAIL'}
            </Typography>
            <Typography variant="h5">{score}%</Typography>
          </div>
          <div className="panel-info">
            <Typography variant="subtitle2" className="panel-mr20">
              Date: {date}
            </Typography>
            <Typography variant="subtitle2" className="panel-mr20">
              Time: {time}
            </Typography>
            <Typography variant="subtitle2">Elapsed Time: {elapsed}</Typography>
          </div>
        </div>
        <div className="panel-right">
          <Typography variant="subtitle2">Filename: {filename}</Typography>
        </div>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(HistoryItem)
