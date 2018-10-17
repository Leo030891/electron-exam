import React from 'react'
import Slide from '@material-ui/core/Slide'
import Exams from './Exams'
import History from './History'

function MainScreen(props) {
  const { mainMode, exams, fileData, filepaths, history } = props
  const { onSummaryClick, onHistoryClick } = props
  if (mainMode === 0) {
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
        <History history={history} onHistoryClick={onHistoryClick} />
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
