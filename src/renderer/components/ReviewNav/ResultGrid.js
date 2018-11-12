import React, { Component } from 'react'
import GridLegend from './GridLegend'
import GridItem from './GridItem'

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
        <GridLegend />
        <div className="grid">
          {[...Array(total)].map((x, i) => (
            <GridItem
              key={i}
              number={i + 1}
              style={{
                backgroundColor: this.getBackgroundColor(i),
                outline: reviewType === i && '2px solid rgb(1, 139, 244)'
              }}
              onClick={() => setReviewType(i)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ResultGrid
