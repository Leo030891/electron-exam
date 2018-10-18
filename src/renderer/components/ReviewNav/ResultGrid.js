import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

class ResultGrid extends Component {
  componentDidMount() {}

  getBackgroundColor = i => {
    const {
      report: { correct, incorrect }
    } = this.props
    let correctIndex = correct.indexOf(i)
    let incorrectIndex = incorrect.indexOf(i)
    if (correctIndex !== -1) {
      return 'rgb(215, 251, 203)'
    } else if (incorrectIndex !== -1) {
      return 'rgb(251, 203, 203)'
    } else {
      return 'rgb(227, 227, 227)'
    }
  }

  render() {
    const { total, report } = this.props
    const { status, score, correct, incorrect, incomplete, date, elapsed } = report
    return (
      <div className="ResultGrid">
        <Typography variant="subtitle1" align="center">
          Correct: {correct.length}
        </Typography>
        <div className="grid">
          {[...Array(total)].map((x, i) => (
            <div
              key={`item-${i}`}
              className="result-item"
              style={{ backgroundColor: this.getBackgroundColor(i) }}
            >
              <Typography variant="overline">{i + 1}</Typography>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ResultGrid
