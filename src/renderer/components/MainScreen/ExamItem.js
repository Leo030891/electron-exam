import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  paper: {
    backgroundColor: 'rgb(232, 244, 252)',
    '&:hover': {
      backgroundColor: 'rgb(209, 235, 250)',
      outline: '2px solid rgb(1, 139, 244)'
    }
  }
})

function ExamItem({ image, title, code, filename, questions, time, classes, onClick }) {
  return (
    <Paper square onClick={onClick} className="panel-paper" classes={{ root: classes.paper }}>
      <img src={image || 'https://s3.amazonaws.com/electron-exam/general/icon-50x50.png'} alt="" />
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
              Questions: {questions}
            </Typography>
            <Typography variant="subtitle2">Time Limit: {time} Min</Typography>
          </div>
        </div>
        <div className="panel-right">
          <Typography variant="subtitle2">Filename: {filename}</Typography>
        </div>
      </div>
      <div />
    </Paper>
  )
}

export default withStyles(styles)(ExamItem)
