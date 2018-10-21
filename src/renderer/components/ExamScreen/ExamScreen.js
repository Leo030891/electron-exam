import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import TopBar from './TopBar'
import Question from './Question'
import Checkboxes from './Checkboxes'
import MultipleChoice from './MultipleChoice'
import FillInBlank from './FillInBlank'
import Explanation from './Explanation'
import BottomBar from './BottomBar'

const styles = theme => ({})

function ExamScreen(props) {
  const { exam, question, time, answers, marked, explanation, expRef } = props
  const { onAnswerCheck, onAnswerMultiple, onAnswerFillIn, viewExplanation, openTestMenu } = props
  const { setQuestion, markQuestion, handleSlider, examMode, classes } = props
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
                    ) : t.type === 1 ? (
                      <Checkboxes
                        review={false}
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        correctAnswers={t.answer}
                        explanation={explanation}
                        onAnswerCheck={onAnswerCheck}
                      />
                    ) : t.type === 2 ? (
                      <FillInBlank
                        review={false}
                        question={i}
                        answers={answers[i]}
                        correctAnswers={t.answers}
                        explanation={explanation}
                        onAnswerFillIn={onAnswerFillIn}
                      />
                    ) : null}
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
                        type={t.type}
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
        examMode={examMode}
        totalQuestions={exam.test.length}
        question={question}
        marked={marked}
        time={time}
        explanation={explanation}
        handleSlider={handleSlider}
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
