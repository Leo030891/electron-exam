import React from 'react'
import { shell } from 'electron'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  typoTitle: {
    marginLeft: theme.spacing.unit,
    fontSize: '.7rem'
  },
  dialog: {
    width: '50%',
    borderRadius: 0,
    boxShadow: theme.shadows[3]
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, .25)'
  }
})

function About({ open, version, onClose, classes }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{ invisible: true, classes: { invisible: classes.backdrop } }}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle disableTypography>
        <Typography variant="caption" color="inherit" classes={{ root: classes.typoTitle }}>
          About
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className="about-content">
          <Paper square elevation={1} className="about-paper">
            <div className="about-item">
              <Typography variant="overline">Name</Typography>
              <Typography variant="overline">Exam Simulator</Typography>
            </div>
            <div className="about-item">
              <Typography variant="overline">Version</Typography>
              <Typography variant="overline">{version}</Typography>
            </div>
            <div className="about-item">
              <Typography variant="overline">Platform</Typography>
              <Typography variant="overline">{process.platform}</Typography>
            </div>
            <div className="about-item">
              <Typography variant="overline">Author</Typography>
              <Typography variant="overline">benjaminadk</Typography>
            </div>
            <div className="about-item">
              <Typography variant="overline">Homepage</Typography>
              <Typography
                variant="overline"
                onClick={() => shell.openExternal('https://github.com/benjaminadk/electron-exam')}
                className="about-link"
              >
                Click To Open
              </Typography>
            </div>
          </Paper>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(About)
