import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import AddIcon from '@material-ui/icons/AddSharp'
import ImageIcon from '@material-ui/icons/ImageSharp'
import TextIcon from '@material-ui/icons/TitleSharp'
import BoldIcon from '@material-ui/icons/FormatBoldSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'

const styles = theme => ({
  typoTitle: {
    marginLeft: theme.spacing.unit,
    fontSize: '.7rem'
  },
  outlinedInput: {
    width: 600,
    fontSize: '.80rem'
  },
  notchedOutline: {
    borderRadius: 0
  },
  iconButton: {
    fontSize: theme.typography.pxToRem(10),
    padding: 4,
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main
    }
  },
  toggleGroup: {
    borderRadius: 0,
    marginRight: theme.spacing.unit * 2
  },
  toggleSelected: {
    boxShadow: theme.shadows[1]
  },
  toggleButton: {
    borderRadius: 0,
    '&:hover': {
      color: fade(theme.palette.action.active, 0.38)
    }
  },
  toggleButtonSelected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  dialog: {
    width: '70%',
    maxHeight: '75%',
    borderRadius: 0,
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[600]}`
  }
})

const NODE_TYPES = [
  { icon: <TextIcon />, value: 1 },
  { icon: <ImageIcon />, value: 0 },
  { icon: <BoldIcon />, value: 2 }
]

class NotePrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      explanation: null
    }
  }

  componentDidMount() {
    const { explanation } = this.props
    this.setState({ explanation })
  }

  onChange = (e, i) => {
    const { explanation } = this.state
    explanation[i].text = e.target.value
    this.setState({ explanation })
  }

  onToggle = (e, v, i) => {
    const { explanation } = this.state
    explanation[i].variant = v
    this.setState({ explanation })
  }

  removeNode = i => {
    const { explanation } = this.state
    let newExplanation = explanation.slice(0)
    newExplanation.splice(i, 1)
    this.setState({ explanation: newExplanation })
  }

  addNode = () => {
    const { explanation } = this.state
    explanation.push({ variant: 1, text: '' })
    this.setState({ explanation })
  }

  onOkay = () => {
    const { explanation } = this.state
    const { index, onOkay } = this.props
    onOkay(explanation, index)
  }

  render() {
    const { explanation } = this.state
    const { open, onClose, classes } = this.props
    return (
      <Dialog open={open} onClose={onClose} maxWidth={false} classes={{ paper: classes.dialog }}>
        <DialogTitle disableTypography>
          <Typography variant="caption" color="inherit" classes={{ root: classes.typoTitle }}>
            Add Notes
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className="note-content">
            {explanation
              ? explanation.map((e, i) => (
                  <div key={`row-${i}`} className="note-row">
                    <ToggleButtonGroup
                      value={e.variant}
                      onChange={(ev, v) => this.onToggle(ev, v, i)}
                      exclusive
                      selected
                      classes={{ root: classes.toggleGroup, selected: classes.toggleSelected }}
                    >
                      {NODE_TYPES.map((n, j) => (
                        <ToggleButton
                          key={`toggle-${j}`}
                          value={n.value}
                          classes={{
                            root: classes.toggleButton,
                            selected: classes.toggleButtonSelected
                          }}
                        >
                          {n.icon}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    <TextField
                      variant="outlined"
                      label="Text / Source URL"
                      value={e.text}
                      onChange={e => this.onChange(e, i)}
                      autoFocus
                      InputProps={{
                        classes: {
                          root: classes.outlinedInput,
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <IconButton
                      onClick={() => this.removeNode(i)}
                      classes={{ root: classes.iconButton }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))
              : null}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="note-actions">
            <Button onClick={this.addNode}>
              <AddIcon />
              Add Node
            </Button>
            <div>
              <Button onClick={this.onOkay} className="note-ok">
                Ok
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(NotePrompt)
