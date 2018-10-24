import React from 'react'
import Typography from '@material-ui/core/Typography'

function Question({ question }) {
  return (
    <div>
      {question.map((q, j) => {
        if (q.variant === 0) return <img key={`img-${j}`} className="question-img" src={q.text} />
        else if (q.variant === 1) {
          return (
            <Typography key={`text-${j}`} className="question-text" variant="subtitle1">
              {q.text}
            </Typography>
          )
        } else if (q.variant === 2) {
          return (
            <Typography key={`text-${j}`} className="question-text" variant="h5">
              {q.text}
            </Typography>
          )
        }
      })}
    </div>
  )
}

export default Question
