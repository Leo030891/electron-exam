import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowIcon from '@material-ui/icons/ArrowForwardIos'

const styles = theme => ({})

function CoverScreen({ exam, classes }) {
  return (
    <div>
      <Typography variant="h4">Exam File</Typography>
      <IconButton>
        <ArrowIcon />
      </IconButton>
      <div className="cover-content">
        {exam.cover.map((c, i) => {
          if (c.type === 0) {
            return <img key={i} src={c.src} />
          } else if (c.type === 1) {
            return (
              <Typography key={i} variant="subtitle1">
                {c.text}
              </Typography>
            )
          }
        })}
      </div>
    </div>
  )
}

export default withStyles(styles)(CoverScreen)
