import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import TopBar from './TopBar'
import Question from './Question'
import Checkboxes from './Checkboxes'
import MultipleChoice from './MultipleChoice'
import Explanation from './Explanation'
import BottomBar from './BottomBar'

const styles = theme => ({})

function ExamScreen(props) {
  const { exam, question, time, answers, marked, explanation, expRef } = props
  const { onAnswerCheck, onAnswerMultiple, viewExplanation, openTestMenu } = props
  const { setQuestion, markQuestion, classes } = props
  return (
    <div className="ExamScreen">
      <TopBar
        title={exam.title}
        question={question}
        marked={marked}
        totalQuestions={exam.test.length}
        markQuestion={markQuestion}
      />
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
                        review={false}
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        correctAnswers={t.answer}
                        explanation={explanation}
                        onAnswerMultiple={onAnswerMultiple}
                      />
                    ) : (
                      <Checkboxes
                        review={false}
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        correctAnswers={t.answer}
                        explanation={explanation}
                        onAnswerCheck={onAnswerCheck}
                      />
                    )}
                  </div>
                  {explanation && (
                    <Slide
                      in={explanation}
                      direction="up"
                      timeout={{ enter: 500, exit: 200 }}
                      unmountOnExit
                    >
                      <Explanation
                        expRef={expRef}
                        answers={answers[i]}
                        correctAnswers={t.answer}
                        explanation={t.explanation}
                      />
                    </Slide>
                  )}
                </div>
              </Slide>
            )
        })}
      </div>
      <BottomBar
        time={time}
        explanation={explanation}
        onFirstClick={() => setQuestion(0, 0)}
        onBackClick={() => setQuestion(question - 1, 1)}
        onForwardClick={() => setQuestion(question + 1, 2)}
        onLastClick={() => setQuestion(exam.test.length - 1, 3)}
        viewExplanation={viewExplanation}
        openTestMenu={openTestMenu}
      />
    </div>
  )
}

export default withStyles(styles)(ExamScreen)
