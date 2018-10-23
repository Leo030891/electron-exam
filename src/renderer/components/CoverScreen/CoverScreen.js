import React from 'react'
import Typography from '@material-ui/core/Typography'

function CoverScreen({ cover }) {
  return (
    <div className="cover-content">
      {cover.map((c, i) => {
        if (c.variant === 0) {
          return <img key={i} src={c.text} className="cover-item" />
        } else if (c.variant === 1) {
          return (
            <Typography key={i} variant="subtitle1" className="cover-item">
              {c.text}
            </Typography>
          )
        } else if (c.variant === 2) {
          return (
            <Typography key={i} variant="h5" className="cover-item">
              {c.text}
            </Typography>
          )
        }
      })}
    </div>
  )
}

export default CoverScreen
