import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

class MultipleChoice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    let { answers } = this.props
    answers.forEach((a, i) => {
      if (!!a) this.setState({ value: i.toString() })
    })
  }

  onChange = (e, value) => {
    this.props.onAnswerMultiple(this.props.question, parseInt(value, 10))
    this.setState({ value })
  }

  render() {
    const { choices } = this.props
    const { value } = this.state
    return (
      <RadioGroup value={value} onChange={this.onChange} className="choices">
        {choices.map((c, k) => (
          <FormControlLabel
            key={`choice-${k}`}
            value={k.toString()}
            control={<Radio />}
            label={
              <Typography variant="subtitle1">
                <b>{c.label}.</b> {c.text}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
    )
  }
}

export default MultipleChoice
