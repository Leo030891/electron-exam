import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import BookmarkIcon from '@material-ui/icons/BookmarkSharp'
import BookmarkOutlineIcon from '@material-ui/icons/BookmarkBorderSharp'

const styles = theme => ({
  bookmark: {
    fontSize: 40
  }
})

function TopBar({ title, question, marked, totalQuestions, markQuestion, classes }) {
  return (
    <div className="top-bar">
      <div className="top-left">
        <Typography variant="h4">{`${title}, Q${question + 1}`}</Typography>
        <Typography variant="caption">{`Question ${question + 1} of ${totalQuestions}`}</Typography>
      </div>
      <div className="top-right">
        <IconButton onClick={() => markQuestion(question)} classes={{ root: classes.bookmark }}>
          {marked.indexOf(question) !== -1 ? (
            <BookmarkIcon fontSize="inherit" />
          ) : (
            <BookmarkOutlineIcon fontSize="inherit" />
          )}
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(TopBar)
