import React, { Component } from 'react'
import Slide from '@material-ui/core/Slide'
import TopBar from './TopBar'
import Question from '../ExamScreen/Question'
import Checkboxes from '../ExamScreen/Checkboxes'
import MultipleChoice from '../ExamScreen/MultipleChoice'
import FillInBlank from '../ExamScreen/FillInBlank'
import StaticList from './StaticList'
import Explanation from '../ExamScreen/Explanation'
import BottomBar from './BottomBar'

class ReviewExam extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { reviewType, title, index, number, questions, answers, setIndex } = this.props
    const { fillIns, orders } = this.props
    return (
      <div className="ReviewExam">
        <TopBar
          top={`${title}, Q${number}`}
          bottom={
            Number.isInteger(reviewType) ? `question ${reviewType + 1}` : `${reviewType} questions`
          }
        />
        <div className="question">
          {questions &&
            questions.map((q, i) => {
              if (index === i) {
                return (
                  <Slide
                    key={i}
                    in={index === i}
                    direction="left"
                    timeout={{ enter: 500, exit: 200 }}
                  >
                    <div>
                      <Question question={q.question} />
                      <div>
                        {q.variant === 0 ? (
                          <MultipleChoice
                            review={true}
                            choices={q.choices}
                            answers={answers[number - 1]}
                            correctAnswers={q.answer}
                            explanation={true}
                          />
                        ) : q.variant === 1 ? (
                          <Checkboxes
                            review={true}
                            choices={q.choices}
                            answers={answers[number - 1]}
                            correctAnswers={q.answer}
                            explanation={true}
                          />
                        ) : q.variant === 2 ? (
                          <FillInBlank review={true} fillIn={fillIns[i]} explanation={true} />
                        ) : q.variant === 3 ? (
                          <StaticList choices={q.choices} order={orders[i]} />
                        ) : null}
                      </div>
                      <Slide
                        in={true}
                        direction="up"
                        timeout={{ enter: 500, exit: 200 }}
                        unmountOnExit
                      >
                        <Explanation
                          expRef={null}
                          variant={q.variant}
                          answers={answers[number - 1]}
                          correctAnswers={q.variant === 0 || q.variant === 1 ? q.answer : q.choices}
                          explanation={q.explanation}
                        />
                      </Slide>
                    </div>
                  </Slide>
                )
              }
            })}
        </div>
        <BottomBar
          onFirstClick={() => setIndex(0, false)}
          onBackClick={() => setIndex(index - 1, true)}
          onForwardClick={() => setIndex(index + 1, true)}
          onLastClick={() => setIndex(questions.length - 1, false)}
        />
      </div>
    )
  }
}

export default ReviewExam
