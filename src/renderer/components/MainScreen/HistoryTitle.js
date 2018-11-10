import React from 'react'
import Typography from '@material-ui/core/Typography'

function HistoryTitle({ title, code, average }) {
  return (
    <div className="history-info">
      <Typography variant="h6" className="history-title">
        {title} / {code}
      </Typography>
      <Typography variant="h6"> Average Score: {average}%</Typography>
    </div>
  )
}

export default HistoryTitle
