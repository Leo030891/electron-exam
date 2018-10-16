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
  }
})

function Confirm({ alert, open, title, message, detail, icon, onClose, onOkay, classes }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="caption" color="inherit" classes={{ root: classes.typoTitle }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className="confirm-content">
          {icon}
          <div>
            <Typography variant="h6" className="message">
              {message}
            </Typography>
            <Typography variant="caption">{detail}</Typography>
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
