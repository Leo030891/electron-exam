import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import decodeCorrect from '../../utils/decodeCorrect'
import isEqual from 'lodash/isEqual'

const styles = theme => ({})

function Explanation({ expRef, variant, answers, correctAnswers, explanation, classes }) {
  const status = variant === 2 ? answers[0] : isEqual(answers, correctAnswers)
  return (
    <div ref={expRef} className="explanation">
      <Typography variant="subtitle1">
        Your answer is{' '}
        <span style={{ color: status ? 'green' : 'red' }}>{status ? 'CORRECT' : 'INCORRECT'}</span>
      </Typography>
      <Typography variant="subtitle1">
        The correct answer is <strong>{decodeCorrect(correctAnswers, variant)}</strong>
      </Typography>
      <Typography variant="subtitle1">
        <strong>Explanation: </strong>
      </Typography>
      <div>
        {explanation.length > 0 &&
          explanation.map((e, i) => {
            if (e.variant === 0) {
              return <img key={`explanation - ${i}`} src={e.text} alt="" />
            } else if (e.variant === 1) {
              return (
                <Typography key={`explanation - ${i}`} variant="subtitle1">
                  {e.text}
                </Typography>
              )
            }
          })}
      </div>
    </div>
  )
}

export default withStyles(styles)(Explanation)
