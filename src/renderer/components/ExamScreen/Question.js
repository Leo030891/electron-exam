import React from 'react'
import Typography from '@material-ui/core/Typography'

function Question({ question }) {
  return (
    <div>
      {question.map((q, j) => {
        if (q.variant === 0)
          return (
            <React.Fragment>
              <img key={j} className="question-item" src={q.text} />
              <br />
            </React.Fragment>
          )
        else if (q.variant === 1) {
          return (
            <Typography key={j} className="question-item" variant="subtitle1">
              {q.text}
            </Typography>
          )
        } else if (q.variant === 2) {
          return (
            <Typography key={j} className="question-item" variant="h5">
              {q.text}
            </Typography>
          )
        }
      })}
    </div>
  )
}

export default Question
