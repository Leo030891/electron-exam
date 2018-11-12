import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

function GridItem({ style, number, onClick }) {
  return (
    <Paper square className="result-item" style={{ ...style }} onClick={onClick}>
      <Typography variant="overline">{number}</Typography>
    </Paper>
  )
}

export default GridItem
