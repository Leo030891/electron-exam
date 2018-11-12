import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import GridLegend from './GridLegend'
import GridItem from './GridItem'

class QuestionGrid extends Component {
  getBackgroundColor = i => {
    const { marked, fillIns, orders, answers } = this.props
    let incomplete = []
    answers.forEach((a, j) => {
      if (a.indexOf(true) === -1 && !fillIns[j] && !orders[j]) {
        incomplete.push(j)
      }
    })
    let incompleteIndex = incomplete.indexOf(i)
    let markedIndex = marked.indexOf(i)
    if (markedIndex !== -1) {
      return 'rgb(249, 255, 158)'
    } else if (incompleteIndex !== -1) {
      return 'rgb(227, 227, 227)'
    } else {
      return 'rgb(168, 213, 245)'
    }
  }

  render() {
    const { total, question, setQuestion } = this.props
    return (
      <div className="QuestionGrid">
        <GridLegend />
        <div className="grid">
          {[...Array(total)].map((x, i) => (
            <GridItem
              key={i}
              number={i + 1}
              style={{
                backgroundColor: this.getBackgroundColor(i),
                outline: question === i && '2px solid rgb(1, 139, 244)'
              }}
              onClick={() => setQuestion(i)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default QuestionGrid
