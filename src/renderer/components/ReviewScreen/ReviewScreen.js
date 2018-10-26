import React, { Component } from 'react'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import TopBar from './TopBar'
import SummaryCard from './SummaryCard'
import ScoreComp from './ScoreProgress'
import ReviewExam from './ReviewExam'

class ReviewScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      index: 0,
      number: 1
    }
  }

  componentDidMount() {
    this.setQuestions()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviewType !== this.props.reviewType) {
      this.setQuestions()
    }
  }

  setQuestions = () => {
    let questions
    const {
      reviewType,
      exam: { test },
      report: { incorrect, incomplete }
    } = this.props
    if (Number.isInteger(reviewType)) {
      questions = [test[reviewType]]
    } else if (reviewType === 'all') {
      questions = test
    } else if (reviewType === 'incorrect') {
      questions = test.filter((t, i) => {
        return incorrect.indexOf(i) !== -1
      })
    } else if (reviewType === 'incomplete') {
      questions = test.filter((t, i) => {
        return incomplete.indexOf(i) !== -1
      })
    }
    this.setState({ questions })
    this.setIndex(0, false)
  }

  setIndex = (index, check) => {
    if (index < 0) return
    if (check) {
      if (index > this.state.questions.length - 1) return
    }
    let number
    const {
      reviewType,
      report: { incorrect, incomplete }
    } = this.props
    if (reviewType === 'all') {
      number = index + 1
    } else if (reviewType === 'incorrect') {
      number = incorrect[index] + 1
    } else if (reviewType === 'incomplete') {
      number = incomplete[index] + 1
    } else {
      number = reviewType + 1
    }
    this.setState({ index, number })
  }

  render() {
    const { questions, index, number } = this.state
    const { reviewMode, reviewType, exam, report } = this.props
    const { title, status, score, answers, date, elapsed } = report
    const { incomplete, incorrect } = report
    if (reviewMode === 0) {
      return (
        <Slide key="review" in={reviewMode === 0} direction="left">
          <div className="review-screen">
            <TopBar
              top={'Review Exam Results'}
              bottom={`Your Score: ${score}% - ${status ? 'PASS' : 'FAIL'}`}
            />
            <div className="summary">
              <Typography variant="h5">{exam.title}</Typography>
              <SummaryCard
                exam={exam}
                status={status}
                elapsed={elapsed}
                date={date}
                incorrect={incorrect}
                incomplete={incomplete}
              />
              <ScoreComp pass={exam.pass} score={score} />
            </div>
          </div>
        </Slide>
      )
    } else if (reviewMode === 1) {
      return (
        <Slide key="question" in={reviewMode === 1} direction="left">
          <ReviewExam
            reviewType={reviewType}
            title={title}
            index={index}
            number={number}
            questions={questions}
            answers={answers}
            setIndex={this.setIndex}
          />
        </Slide>
      )
    } else {
      return null
    }
  }
}

export default ReviewScreen
