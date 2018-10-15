import React from 'react'
import Typography from '@material-ui/core/Typography'
import TopBar from './TopBar'
import SummaryCard from './SummaryCard'
import ScoreComp from './ScoreComp'

function ReviewScreen({ exam, report }) {
  const { status, score, correct, incorrect, incomplete, date, elapsed } = report
  return (
    <div className="ReviewScreen">
      <TopBar status={status} score={score} />
      <div className="summary">
        <Typography variant="h5">{exam.title}</Typography>
        <SummaryCard exam={exam} status={status} elapsed={elapsed} date={date} />
        <ScoreComp pass={exam.pass} score={score} />
      </div>
    </div>
  )
}

export default ReviewScreen
