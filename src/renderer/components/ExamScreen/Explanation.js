import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import decodeCorrect from '../../utils/decodeCorrect'
import isEqual from 'lodash/isEqual'

const styles = theme => ({})

function Explanation({ answers, correctAnswers, explanation, classes }) {
  const status = isEqual(answers, correctAnswers)
  return (
    <div className="explanation">
      <Typography variant="subtitle1">
        Your answer is{' '}
        <span style={{ color: status ? 'green' : 'red' }}>{status ? 'CORRECT' : 'INCORRECT'}</span>
      </Typography>
      <Typography variant="subtitle1">
        The correct answer is <strong>{decodeCorrect(correctAnswers)}</strong>
      </Typography>
      <Typography variant="subtitle1">
        <strong>Explanation: </strong>
      </Typography>
      <Typography variant="subtitle1">{explanation}</Typography>
    </div>
  )
}

export default withStyles(styles)(Explanation)
