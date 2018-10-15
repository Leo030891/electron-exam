import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { getDateString, getTimeString, getTimeHHMMSS } from '../../utils/dateHelpers'

function SummaryCard({ exam, status, elapsed, date }) {
  return (
    <Paper elevation={1} square className="card">
      <div>
        <Typography variant="h6">
          <strong>Date: </strong>
        </Typography>
        <Typography variant="h6">
          <strong>Time: </strong>
        </Typography>
        <Typography variant="h6">
          <strong>Exam #: </strong>
        </Typography>
        <Typography variant="h6">
          <strong>Elapsed: </strong>
        </Typography>
        <Typography variant="h6">
          <strong>Grade: </strong>
        </Typography>
      </div>
      <div>
        <Typography variant="h6">{getDateString(date)}</Typography>
        <Typography variant="h6">{getTimeString(date)}</Typography>
        <Typography variant="h6">{exam.code}</Typography>
        <Typography variant="h6">{getTimeHHMMSS(elapsed)}</Typography>
        <Typography variant="h6" style={{ color: status ? 'green' : 'red' }}>
          {status ? 'PASS' : 'FAIL'}
        </Typography>
      </div>
    </Paper>
  )
}

export default SummaryCard
