import React from 'react'

function ReviewScreen({ exam, report }) {
  let status = report.score >= exam.pass
  return (
    <div>
      <p>{status ? 'Pass' : 'Fail'}</p>
      <p>{report.score} %</p>
    </div>
  )
}

export default ReviewScreen
