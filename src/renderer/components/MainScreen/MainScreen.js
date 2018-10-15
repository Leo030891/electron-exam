import React from 'react'
import Slide from '@material-ui/core/Slide'
import Exams from './Exams'

function MainScreen({ loading, mainMode, exams, fileData, filepaths, onSummaryClick }) {
  if (loading) return <h3>Loading...</h3>
  else if (mainMode === 0) {
    return (
      <Slide key="exams" in={mainMode === 0} direction="left">
        <Exams
          exams={exams}
          fileData={fileData}
          filepaths={filepaths}
          onSummaryClick={onSummaryClick}
        />
      </Slide>
    )
  } else if (mainMode === 1) {
    return (
      <Slide key="history" in={mainMode === 1} direction="left">
        <div>History</div>
      </Slide>
    )
  } else if (mainMode === 2) {
    return (
      <Slide key="sessions" in={mainMode === 2} direction="left">
        <div>Sessions</div>
      </Slide>
    )
  }
}

export default MainScreen
