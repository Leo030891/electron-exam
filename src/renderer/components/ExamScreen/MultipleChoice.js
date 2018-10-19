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
    this.setValue()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.answers !== this.props.answers && this.props.review) {
      this.setValue()
    }
  }

  setValue = () => {
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
    const { choices, explanation, correctAnswers } = this.props
    const { value } = this.state
    return (
      <RadioGroup value={value} onChange={this.onChange} className="choices">
        {choices.map((c, k) => (
          <FormControlLabel
            key={`choice-${k}`}
            value={k.toString()}
            control={<Radio color="default" disabled={explanation} />}
            label={
              <Typography
                variant="subtitle1"
                style={{
                  color:
                    explanation && correctAnswers[k]
                      ? 'rgb(31, 144, 224)'
                      : explanation && !correctAnswers[k]
                        ? 'rgba(0, 0, 0, 0.25)'
                        : 'rgba(0, 0, 0, 0.87)'
                }}
              >
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
