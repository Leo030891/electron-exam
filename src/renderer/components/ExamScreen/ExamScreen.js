import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ForwardIcon from '@material-ui/icons/ArrowForward'
import BackIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({})

function ExamScreen({ exam, question, setQuestion, classes }) {
  return (
    <div className="ExamScreen">
      <Typography variant="h3">{`${exam.title}, Q${question + 1}`}</Typography>
      <Typography variant="caption">{`Question ${question + 1} of ${exam.test.length}`}</Typography>
      <div className="question">
        {exam.test.map((t, i) => {
          if (question === i)
            return (
              <Slide key={`question-${i}`} in={question === i} direction="left">
                <div>
                  <div>
                    {t.question.map((q, j) => {
                      if (q.type === 0) return <img key={`img-${j}`} src={q.src} />
                      else if (q.type === 1)
                        return (
                          <Typography key={`text-${j}`} variant="subtitle1">
                            {q.text}
                          </Typography>
                        )
                    })}
                  </div>
                  <div className="choices">
                    {t.choices.map((c, k) => {
                      if (t.type === 0) return null
                      else if (t.type === 1) {
                        return (
                          <FormControlLabel
                            key={`choice-${i}-${k}`}
                            control={<Checkbox />}
                            label={c.text}
                          />
                        )
                      }
                    })}
                  </div>
                </div>
              </Slide>
            )
        })}
      </div>
      <div className="bottom-bar">
        <div>
          <IconButton onClick={() => setQuestion(question - 1)}>
            <BackIcon />
          </IconButton>
          <IconButton onClick={() => setQuestion(question + 1)}>
            <ForwardIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(ExamScreen)
