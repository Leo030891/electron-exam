import React from 'react'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import TopBar from './TopBar'
import SummaryCard from './SummaryCard'
import ScoreComp from './ScoreProgress'

function ReviewScreen({ reviewMode, exam, report }) {
  const { status, score, correct, incorrect, incomplete, date, elapsed } = report
  if (reviewMode === 0) {
    return (
      <Slide key="review" in={reviewMode === 0} direction="left">
        <div className="review-screen">
          <TopBar status={status} score={score} />
          <div className="summary">
            <Typography variant="h5">{exam.title}</Typography>
            <SummaryCard exam={exam} status={status} elapsed={elapsed} date={date} />
            <ScoreComp pass={exam.pass} score={score} />
          </div>
        </div>
      </Slide>
    )
  } else if (reviewMode === 1) {
    return (
      <Slide key="question" in={reviewMode === 1} direction="left">
        question
      </Slide>
    )
  } else {
    return null
  }
}

export default ReviewScreen
