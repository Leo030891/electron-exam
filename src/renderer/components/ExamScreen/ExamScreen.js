import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import TopBar from './TopBar'
import Question from './Question'
import Checkboxes from './Checkboxes'
import MultipleChoice from './MultipleChoice'
import BottomBar from './BottomBar'

const styles = theme => ({})

function ExamScreen(props) {
  const { exam, question, time, answers, classes } = props
  const { setQuestion, onAnswerCheck, onAnswerMultiple, openTestMenu } = props
  return (
    <div className="ExamScreen">
      <TopBar title={exam.title} question={question} totalQuestions={exam.test.length} />
      <div className="question">
        {exam.test.map((t, i) => {
          if (question === i)
            return (
              <Slide
                key={`question-${i}`}
                in={question === i}
                direction="left"
                timeout={{ enter: 500, exit: 200 }}
                unmountOnExit
              >
                <div>
                  <Question question={t.question} />
                  <div>
                    {t.type === 0 ? (
                      <MultipleChoice
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        onAnswerMultiple={onAnswerMultiple}
                      />
                    ) : (
                      <Checkboxes
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        onAnswerCheck={onAnswerCheck}
                      />
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
