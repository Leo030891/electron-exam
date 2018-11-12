import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { getTimeHHMMSS } from '../../utils/dateHelpers'

function CoverMenuLeft({ code, passing, timeLimit, total }) {
  return (
    <Paper square className="detail-list">
      <Typography variant="h6">Details</Typography>
      <Divider />
      <div className="detail">
        <Typography variant="subtitle1">Exam Code:</Typography>
        <Typography variant="subtitle1">{code}</Typography>
      </div>
      <div className="detail">
        <Typography variant="subtitle1">Passing %:</Typography>
        <Typography variant="subtitle1">{passing}%</Typography>
      </div>
      <div className="detail">
        <Typography variant="subtitle1">Passing Score:</Typography>
        <Typography variant="subtitle1">{`${Math.ceil(
          total * passing * 0.01
        )}/${total}`}</Typography>
      </div>
      <div className="detail">
        <Typography variant="subtitle1">Time Limit:</Typography>
        <Typography variant="subtitle1">{getTimeHHMMSS(timeLimit * 60)}</Typography>
      </div>
    </Paper>
  )
}

export default CoverMenuLeft
