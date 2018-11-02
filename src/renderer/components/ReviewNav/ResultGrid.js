import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

class ResultGrid extends Component {
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
    const { reviewType, total, setReviewType } = this.props
    return (
      <div className="ResultGrid">
        <div className="title">
          Correct <div className="mini-green" /> Incorrect <div className="mini-red" /> Incomplete{' '}
          <div className="mini-grey" />
        </div>
        <div className="grid">
          {[...Array(total)].map((x, i) => (
            <div
              key={`item-${i}`}
              className="result-item"
              style={{
                backgroundColor: this.getBackgroundColor(i),
                outline: reviewType === i && '2px solid rgb(31, 144, 224)'
              }}
              onClick={() => setReviewType(i)}
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
