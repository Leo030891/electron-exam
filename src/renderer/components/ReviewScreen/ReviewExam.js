import React, { Component } from 'react'
import Slide from '@material-ui/core/Slide'
import TopBar from './TopBar'
import Question from '../ExamScreen/Question'
import Checkboxes from '../ExamScreen/Checkboxes'
import MultipleChoice from '../ExamScreen/MultipleChoice'
import Explanation from '../ExamScreen/Explanation'
import BottomBar from './BottomBar'

class ReviewExam extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { reviewType, title, index, number, questions, answers, setIndex } = this.props
    return (
      <div className="ExamScreen">
        <TopBar
          top={`${title}, Q${number}`}
          bottom={
            Number.isInteger(reviewType) ? `question ${reviewType}` : `${reviewType} questions`
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
                        {q.type === 0 ? (
                          <MultipleChoice
                            review={true}
                            choices={q.choices}
                            question={i}
                            answers={answers[number - 1]}
                            correctAnswers={q.answer}
                            explanation={true}
                            onAnswerMultiple={() => {}}
                          />
                        ) : (
                          <Checkboxes
                            review={true}
                            choices={q.choices}
                            question={i}
                            answers={answers[number - 1]}
                            correctAnswers={q.answer}
                            explanation={true}
                            onAnswerCheck={() => {}}
                          />
                        )}
                      </div>
                      <Slide
                        in={true}
                        direction="up"
                        timeout={{ enter: 500, exit: 200 }}
                        unmountOnExit
                      >
                        <Explanation
                          expRef={null}
                          answers={answers[number - 1]}
                          correctAnswers={q.answer}
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
