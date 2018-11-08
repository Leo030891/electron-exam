import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function(errors) {
  return errors.map((e, i) => (
    <Typography key={i} variant="caption">
      {e.dataPath} - {e.message}
    </Typography>
  ))
}
