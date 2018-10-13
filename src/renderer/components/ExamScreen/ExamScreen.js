import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import BottomBar from './BottomBar'

const styles = theme => ({})

function ExamScreen(props) {
  const { exam, question, time, classes } = props
  const { setQuestion, onAnswerCheck, openTestMenu } = props
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
                  <div>
                    {t.type === 0 ? (
                      <RadioGroup className="choices">
                        {t.choices.map((c, k) => (
                          <FormControlLabel
                            key={`choice-${i}-${k}`}
                            control={<Radio />}
                            label={
                              <Typography variant="subtitle1">
                                <b>{c.label}.</b> {c.text}
                              </Typography>
                            }
                          />
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="choices">
                        {t.choices.map((c, k) => (
                          <FormControlLabel
                            key={`choice-${i}-${k}`}
                            control={
                              <Checkbox onChange={(e, checked) => onAnswerCheck(checked, i, k)} />
                            }
                            label={
                              <Typography variant="subtitle1">
                                <b>{c.label}.</b> {c.text}
                              </Typography>
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Slide>
            )
        })}
      </div>
      <BottomBar
        time={time}
        onFirstClick={() => setQuestion(0)}
        onBackClick={() => setQuestion(question - 1)}
        onForwardClick={() => setQuestion(question + 1)}
        onLastClick={() => setQuestion(exam.test.length - 1)}
        openTestMenu={openTestMenu}
      />
    </div>
  )
}

export default withStyles(styles)(ExamScreen)
