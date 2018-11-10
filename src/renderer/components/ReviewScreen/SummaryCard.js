import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { getDateString, getTimeString, getTimeHHMMSS } from '../../utils/dateHelpers'

function SummaryCard({ exam, status, elapsed, incomplete, incorrect, date }) {
  return (
    <Paper elevation={1} square className="card">
      <div>
        <Typography variant="subtitle1">
          <strong>Date</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Time</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Exam Code</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Elapsed Time</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Correct</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Incorrect</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Incomplete</strong>
        </Typography>
        <Typography variant="subtitle1">
          <strong>Grade</strong>
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1">{getDateString(date)}</Typography>
        <Typography variant="subtitle1">{getTimeString(date)}</Typography>
        <Typography variant="subtitle1">{exam.code}</Typography>
        <Typography variant="subtitle1">{getTimeHHMMSS(elapsed)}</Typography>
        <Typography variant="subtitle1">{`${exam.test.length -
          incomplete.length -
          incorrect.length} / ${exam.test.length}`}</Typography>
        <Typography variant="subtitle1">{`${incorrect.length} / ${exam.test.length}`}</Typography>
        <Typography variant="subtitle1">{`${incomplete.length} / ${exam.test.length}`}</Typography>
        <Typography variant="subtitle1" style={{ color: status ? 'green' : 'red' }}>
          {status ? 'PASS' : 'FAIL'}
        </Typography>
      </div>
    </Paper>
  )
}

export default SummaryCard
