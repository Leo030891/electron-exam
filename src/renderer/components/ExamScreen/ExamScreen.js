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
  const { exam, question, time, answers, explanation, classes } = props
  const { setQuestion, onAnswerCheck, onAnswerMultiple, viewExplanation, openTestMenu } = props
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
                        correctAnswers={t.answer}
                        explanation={explanation}
                        onAnswerMultiple={onAnswerMultiple}
                      />
                    ) : (
                      <Checkboxes
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
                    <Explanation
                      answers={answers[i]}
                      correctAnswers={t.answer}
                      explanation={t.explanation}
                    />
                  )}
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
        viewExplanation={viewExplanation}
        openTestMenu={openTestMenu}
      />
    </div>
  )
}

export default withStyles(styles)(ExamScreen)
