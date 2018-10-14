import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class Checkboxes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: this.props.answers
    }
  }

  onChange = (e, checked) => {
    this.props.onAnswerCheck(checked, this.props.question, parseInt(e.target.value, 10))
  }

  render() {
    const { choices } = this.props
    return (
      <div className="choices">
        {choices.map((c, k) => (
          <FormControlLabel
            key={`choice-${k}`}
            control={
              <Checkbox
                checked={this.state.values[k]}
                value={k.toString()}
                onChange={this.onChange}
              />
            }
            label={
              <Typography variant="subtitle1">
                <b>{c.label}.</b> {c.text}
              </Typography>
            }
          />
        ))}
      </div>
    )
  }
}

export default Checkboxes
