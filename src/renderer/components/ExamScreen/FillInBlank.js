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
    this.setState({ value: this.props.fillIn })
  }

  onChange = e => {
    const { question, onAnswerFillIn } = this.props
    this.setState({ value: e.target.value })
    onAnswerFillIn(e.target.value.toLowerCase(), question)
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
