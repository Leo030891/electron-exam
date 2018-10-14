import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  typoTitle: {
    marginLeft: theme.spacing.unit,
    fontSize: '.7rem'
  },
  outlinedInput: {
    width: 400,
    fontSize: '.85rem',
    marginBottom: theme.spacing.unit * 2
  },
  notchedOutline: {
    borderRadius: 0
  }
})

class Prompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  onClick = () => {
    this.props.onOkay(this.state.value)
    this.props.onClose()
  }

  onChange = e => this.setState({ value: e.target.value })

  render() {
    const { open, title, message, label, onClose, classes } = this.props
    const { value } = this.state
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle disableTypography>
          <Typography variant="caption" color="inherit" classes={{ root: classes.typoTitle }}>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label={label}
            value={value}
            onChange={this.onChange}
            autoFocus
            InputProps={{
              classes: { root: classes.outlinedInput, notchedOutline: classes.notchedOutline }
            }}
            InputLabelProps={{ shrink: true }}
          />
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={!value} onClick={this.onClick}>
            Ok
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Prompt)
