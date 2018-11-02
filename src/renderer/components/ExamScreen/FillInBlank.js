import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  outlinedInput: {
    width: 500,
    fontSize: '.9rem'
  },
  notchedOutline: {
    borderRadius: 0
  }
})

class FillInBlank extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    const { fillIn } = this.props
    this.setState({ value: fillIn })
  }

  onChange = e => {
    this.setState({ value: e.target.value })
    this.props.onAnswerFillIn(e.target.value.toLowerCase(), this.props.question)
  }

  render() {
    const { value } = this.state
    const { review, classes } = this.props
    return (
      <div className="fill-in-blank">
        <TextField
          variant="outlined"
          label="Type Answer Here"
          value={value}
          onChange={this.onChange}
          autoFocus
          disabled={review}
          InputProps={{
            classes: {
              root: classes.outlinedInput,
              notchedOutline: classes.notchedOutline
            }
          }}
          InputLabelProps={{ shrink: true }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(FillInBlank)
