import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

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

function Confirm({ alert, open, title, message, detail, icon, onClose, onOkay, classes }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{ invisible: true, classes: { invisible: classes.backdrop } }}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle disableTypography>
        <Typography variant="overline" color="inherit" classes={{ root: classes.typoTitle }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className="confirm-content">
          {icon}
          <div>
            <Typography variant="h5" className="message">
              {message}
            </Typography>
            <Typography variant="subtitle2">{detail}</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOkay}>Ok</Button>
        {!alert && <Button onClick={onClose}>Cancel</Button>}
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(Confirm)
