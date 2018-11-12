import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

function GridItem({ number, style, onClick }) {
  return (
    <Paper
      square
      className="question-item"
      style={{
        ...style
      }}
      onClick={onClick}
    >
      <Typography variant="overline">{number}</Typography>
    </Paper>
  )
}

export default GridItem
