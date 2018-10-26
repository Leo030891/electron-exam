import React from 'react'
import Slide from '@material-ui/core/Slide'
import Exams from './Exams'
import History from './History'
import Sessions from './Sessions'
import Options from '../Options/Options'

function MainScreen(props) {
  const { mainMode, exams, fileData, filepaths, history, sessions } = props
  const { onExamClick, onHistoryClick, onSessionClick, setMainMode } = props
  const { saveOptions, options } = props
  if (mainMode === 0) {
    return (
      <Slide key="exams" in={mainMode === 0} direction="left">
        <Exams exams={exams} fileData={fileData} filepaths={filepaths} onExamClick={onExamClick} />
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
        <Sessions sessions={sessions} onSessionClick={onSessionClick} />
      </Slide>
    )
  } else if (mainMode === 3) {
    return (
      <Slide key="settings" in={mainMode === 3} direction="left">
        <Options options={options} setMainMode={setMainMode} saveOptions={saveOptions} />
      </Slide>
    )
  }
}

export default MainScreen
