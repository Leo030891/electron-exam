import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

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
        <div className="legend">
          <div className="row">
            Answered <div className="mini answered" />
          </div>
          <div className="row">
            Marked <div className="mini marked" />
          </div>
          <div className="row">
            Incomplete <div className="mini incomplete" />
          </div>
        </div>
        <div className="grid">
          {[...Array(total)].map((x, i) => (
            <div
              key={`item-${i}`}
              className="question-item"
              style={{
                backgroundColor: this.getBackgroundColor(i),
                outline: question === i && '2px solid rgb(1, 139, 244)'
              }}
              onClick={() => setQuestion(i)}
            >
              <Typography variant="overline">{i + 1}</Typography>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default QuestionGrid
