import React from 'react'
import Slide from '@material-ui/core/Slide'
import TopBar from './TopBar'
import Question from './Question'
import Checkboxes from './Checkboxes'
import MultipleChoice from './MultipleChoice'
import FillInBlank from './FillInBlank'
import ListOrder from './ListOrder'
import Explanation from './Explanation'
import BottomBar from './BottomBar'

function ExamScreen(props) {
  const { exam, question, time, answers, marked, explanation, expRef, viewExplanation } = props
  const { onAnswerCheck, onAnswerMultiple, onAnswerFillIn, onAnswerDragOrder, orders } = props
  const { setQuestion, markQuestion, handleSlider, examMode, fillIns, openTestMenu } = props
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
                    {t.variant === 0 ? (
                      <MultipleChoice
                        review={false}
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        correctAnswers={t.answer}
                        explanation={explanation}
                        onAnswerMultiple={onAnswerMultiple}
                      />
                    ) : t.variant === 1 ? (
                      <Checkboxes
                        review={false}
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        correctAnswers={t.answer}
                        explanation={explanation}
                        onAnswerCheck={onAnswerCheck}
                      />
                    ) : t.variant === 2 ? (
                      <FillInBlank
                        review={false}
                        question={i}
                        fillIn={fillIns[i]}
                        explanation={explanation}
                        onAnswerFillIn={onAnswerFillIn}
                      />
                    ) : t.variant === 3 ? (
                      <ListOrder
                        review={false}
                        choices={t.choices}
                        question={i}
                        answers={answers[i]}
                        order={orders[i]}
                        explanation={explanation}
                        onAnswerDragOrder={onAnswerDragOrder}
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
                        variant={t.variant}
                        answers={answers[i]}
                        correctAnswers={t.variant === 0 || t.variant === 1 ? t.answer : t.choices}
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

export default ExamScreen
