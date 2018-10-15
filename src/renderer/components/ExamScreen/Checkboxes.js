import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckedIcon from '@material-ui/icons/CheckBoxSharp'
import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'

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
    const { choices, explanation, correctAnswers } = this.props
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
                color="default"
                disabled={explanation}
                checkedIcon={<CheckedIcon />}
                icon={<UnCheckedIcon />}
              />
            }
            label={
              <Typography
                variant="subtitle1"
                style={{
                  color:
                    explanation && correctAnswers[k]
                      ? 'green'
                      : explanation && !correctAnswers[k]
                        ? 'red'
                        : 'rgba(0, 0, 0, 0.87)'
                }}
              >
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