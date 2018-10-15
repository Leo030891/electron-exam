import React, { Component } from 'react'
import { remote } from 'electron'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ForwardIcon from '@material-ui/icons/ArrowForwardIos'
import BackIcon from '@material-ui/icons/ArrowBackIos'

const styles = theme => ({})

class CoverScreen extends Component {
  confirmExamStart = () => {
    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        type: 'question',
        title: 'Start Exam',
        message: 'Do you want to start this exam now?',
        buttons: ['OK', 'Cancel']
      },
      response => {
        if (response === 1) return
        this.props.setMode(2)
        this.props.initTimer()
      }
    )
  }

  render() {
    const { cover, setMode, openConfirmSE, classes } = this.props
    return (
      <div>
        <div className="cover-top">
          <Typography variant="h4">Exam File</Typography>
          <div>
            <IconButton onClick={() => setMode(0)}>
              <BackIcon />
            </IconButton>
            <IconButton onClick={openConfirmSE}>
              <ForwardIcon />
            </IconButton>
          </div>
        </div>
        <div className="cover-content">
          {cover.map((c, i) => {
            if (c.type === 0) {
              return <img key={i} src={c.text} />
            } else if (c.type === 1) {
              return (
                <Typography key={i} variant="subtitle1">
                  {c.text}
                </Typography>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CoverScreen)
