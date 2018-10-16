import React, { Component } from 'react'
import { remote } from 'electron'
import MainNav from './components/MainNav/MainNav'
import MainScreen from './components/MainScreen/MainScreen'
import CoverScreen from './components/CoverScreen/CoverScreen'
import ExamNav from './components/ExamNav/ExamNav'
import ExamScreen from './components/ExamScreen/ExamScreen'
import ReviewNav from './components/ReviewNav/ReviewNav'
import ReviewScreen from './components/ReviewScreen/ReviewScreen'
import Prompt from './components/App/Prompt'
import Confirm from './components/App/Confirm'
import Loading from './components/App/Loading'
import Popup from './components/App/Popup'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import StartExamIcon from '@material-ui/icons/PowerSettingsNewSharp'
import ExitExamIcon from '@material-ui/icons/StopSharp'
import TimerIcon from '@material-ui/icons/TimerSharp'
import { readDirectory, getFilename } from './utils/fileHelpers'
import isEqual from 'lodash/isEqual'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const deleteFile = promisify(fs.unlink)

const mainWin = remote.BrowserWindow.fromId(1)

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      mode: 0,
      mainMode: 0,
      exams: null,
      history: null,
      exam: null,
      question: 0,
      answers: null,
      time: null,
      explanation: false,
      report: null,
      fileData: null,
      filepaths: null,
      promptLR: false,
      confirmDE: false,
      confirmSE: false,
      confirmEE: false,
      confirmRE: false,
      indexExam: null,
      anchorEl1: null,
      anchorEl2: null
    }

    this.explanation = React.createRef()
  }

  componentDidMount() {
    this.loadExams()
    this.loadHistory()
  }

  loadExams = () => {
    let dir = path.resolve(__static, 'exams')
    readdir(dir)
      .then(filenames => readDirectory(dir, filenames))
      .then(([data, stats, files]) => {
        let exams = []
        let fileData = []
        let filepaths = []
        data.forEach(d => exams.push(JSON.parse(d)))
        stats.forEach((s, i) => {
          fileData.push({ size: s.size })
          filepaths.push(path.join(dir, files[i]))
        })
        this.setState({ loading: false, exams, fileData, filepaths })
      })
      .catch(console.error)
  }

  loadHistory = () => {
    let filepath = path.resolve(__static, 'history.json')
    readFile(filepath)
      .then(data => {
        let history = data.length ? JSON.parse(data) : []
        this.setState({ history })
      })
      .catch(console.error)
  }

  loadLocalExam = () => {
    remote.dialog.showOpenDialog(
      mainWin,
      {
        title: 'Load Local File',
        button: 'Open',
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openFile']
      },
      filepath => {
        if (!filepath) return
        const { filepaths } = this.state
        if (filepaths.includes(filepath[0])) {
          // already exists overwrite/error message
          return
        } else {
          let file = getFilename(filepath[0])
          readFile(filepath[0])
            .then(data => writeFile(path.resolve(__static, 'exams', file), data))
            .then(this.loadExams)
            .catch(console.error)
        }
      }
    )
  }

  openPromptLR = () => this.setState({ promptLR: true })

  closePromptLR = () => this.setState({ promptLR: false })

  loadRemoteExam = str => {
    const url = new URL(str)
    const filename = url.pathname.split('/')[2] + '.json'
    const request = remote.net.request(url.href)
    request.on('response', response => {
      response.on('data', data => {
        writeFile(path.resolve(__static, 'exams', filename), data)
          .then(this.loadExams)
          .catch(console.error)
      })
    })
    request.end()
  }

  openConfirmDE = () => this.setState({ confirmDE: true, anchorEl1: null })

  closeConfirmDE = () => this.setState({ confirmDE: false })

  deleteExam = () => {
    deleteFile(this.state.filepaths[this.state.indexExam])
      .then(() => {
        this.loadExams()
        this.setState({ indexExam: null })
        this.closeConfirmDE()
      })
      .catch(console.error)
  }

  setMode = mode => this.setState({ mode })

  setMainMode = mainMode => this.setState({ mainMode })

  onSummaryClick = (e, i) => {
    this.setState({ anchorEl1: { left: e.clientX, top: e.clientY }, indexExam: i })
  }

  closeanchorEl1 = () => this.setState({ anchorEl1: null })

  initTimer = () => {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time - 1 })
    }, 1000)
  }

  pauseTimer = () => {
    this.setState({ confirmRE: true, anchorEl2: null })
    clearInterval(this.timer)
  }

  closeConfirmRE = () => {
    this.initTimer()
    this.setState({ confirmRE: false })
  }

  openConfirmSE = () => this.setState({ confirmSE: true })

  closeConfirmSE = () => this.setState({ confirmSE: false })

  enterTestMode = () => {
    let answers = []
    let exam = this.state.exams[this.state.indexExam]
    let time = exam.time * 60
    exam.test.forEach(t => answers.push(Array(t.choices.length).fill(false)))
    this.setState({ mode: 1, exam, answers, time, anchorEl1: null })
  }

  startExam = () => {
    this.closeConfirmSE()
    this.setMode(2)
    this.initTimer()
  }

  openConfirmEE = () => this.setState({ confirmEE: true, anchorEl2: null })

  closeConfirmEE = () => this.setState({ confirmEE: false })

  exitTest = () => {
    clearInterval(this.timer)
    const { exam, answers, time, history, filepaths, indexExam } = this.state
    let correct = []
    let incorrect = []
    let incomplete = []
    answers.forEach((a, i) => {
      let answer = exam.test[i].answer
      if (answer.indexOf(true) === -1) {
        incomplete.push(i)
      } else if (isEqual(a, answer)) {
        correct.push(i)
      } else {
        incorrect.push(i)
      }
    })
    let score = Math.round((correct.length / exam.test.length) * 100)
    let status = score >= exam.pass
    let date = new Date()
    let elapsed = exam.time * 60 - time
    let filename = filepaths[indexExam]
    let report = {
      filename,
      title: exam.title,
      code: exam.code,
      status,
      score,
      correct,
      incorrect,
      incomplete,
      date,
      elapsed
    }
    history.push(report)
    this.setState({ mode: 3, report, confirmEE: false, history, indexExam: null }, () => {
      let filepath = path.resolve(__static, 'history.json')
      writeFile(filepath, JSON.stringify(history)).catch(console.error)
    })
  }

  setQuestion = question => {
    if (question < 0 || question > this.state.exam.test.length - 1) return
    this.setState({ question, explanation: false })
  }

  viewExplanation = () => {
    this.setState({ explanation: !this.state.explanation }, () => {
      if (this.state.explanation) {
        setTimeout(() => {
          this.explanation.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'end'
          })
        }, 500)
      }
    })
  }

  openTestMenu = e => {
    this.setState({ anchorEl2: { left: e.clientX, top: e.clientY } })
  }

  onAnswerCheck = (checked, x, y) => {
    let { answers } = this.state
    answers[x][y] = checked
    this.setState({ answers })
  }

  onAnswerMultiple = (x, y) => {
    let { answers } = this.state
    for (let i = 0; i < answers[x].length; i++) {
      if (i === y) answers[x][i] = true
      else answers[x][i] = false
    }
    this.setState({ answers })
  }

  render() {
    const { loading, mode, mainMode } = this.state
    const { promptLR, confirmDE, confirmSE, confirmEE, confirmRE } = this.state
    const { exams, exam, question, time, answers, explanation, fileData, filepaths } = this.state
    const { report, history, anchorEl1, anchorEl2 } = this.state
    if (loading) return <Loading />
    else if (mode === 0) {
      const menuItems1 = [
        { text: 'Start Exam', click: this.enterTestMode },
        { text: 'Delete Exam', click: this.openConfirmDE }
      ]
      return [
        <MainNav
          key="main-screen"
          setMainMode={this.setMainMode}
          loadLocalExam={this.loadLocalExam}
          openPromptLR={this.openPromptLR}
        >
          <MainScreen
            mainMode={mainMode}
            exams={exams}
            fileData={fileData}
            filepaths={filepaths}
            history={history}
            onSummaryClick={this.onSummaryClick}
          />
        </MainNav>,
        <Prompt
          key="load-remote"
          open={promptLR}
          title="Load Remote Exam"
          message="File must have Electron Exam format and JSON extension"
          label="Enter URL"
          onClose={this.closePromptLR}
          onOkay={this.loadRemoteExam}
        />,
        <Confirm
          key="delete-exam"
          open={confirmDE}
          title="Delete Exam"
          message="Delete Exam"
          detail="Do you want to permanently delete this exam?"
          icon={<DeleteIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmDE}
          onOkay={this.deleteExam}
        />,
        <Popup
          key="popup-1"
          anchorEl={anchorEl1}
          anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
          menuItems={menuItems1}
          onClose={this.closeanchorEl1}
        />
      ]
    } else if (mode === 1) {
      return [
        <CoverScreen
          key="cover-screen"
          cover={exam.cover}
          setMode={this.setMode}
          initTimer={this.initTimer}
          openConfirmSE={this.openConfirmSE}
        />,
        <Confirm
          key="start-exam"
          open={confirmSE}
          title="Start Exam"
          message="Start Exam"
          detail="Do you want to begin taking this exam?"
          icon={<StartExamIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmSE}
          onOkay={this.startExam}
        />
      ]
    } else if (mode === 2) {
      const menuItems2 = [
        { text: 'Pause Exam', click: this.pauseTimer },
        { text: 'End Exam', click: this.openConfirmEE }
      ]
      return [
        <ExamNav key="exam-screen" title={exam.code}>
          <ExamScreen
            expRef={this.explanation}
            exam={exam}
            question={question}
            time={time}
            answers={answers}
            explanation={explanation}
            setQuestion={this.setQuestion}
            onAnswerCheck={this.onAnswerCheck}
            onAnswerMultiple={this.onAnswerMultiple}
            viewExplanation={this.viewExplanation}
            openTestMenu={this.openTestMenu}
          />
        </ExamNav>,
        <Confirm
          key="pause-exam"
          alert={true}
          open={confirmRE}
          title="Exam Paused"
          message="Exam Paused"
          detail="Click OK to start timer and unpause exam."
          icon={<TimerIcon fontSize="inherit" className="confirm-icon" />}
          onOkay={this.closeConfirmRE}
        />,
        <Confirm
          key="exit-exam"
          open={confirmEE}
          title="Exit Exam"
          message="Exit Exam"
          detail="Do you want to permanently exit current exam?"
          icon={<ExitExamIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmEE}
          onOkay={this.exitTest}
        />,
        <Popup
          key="popup-2"
          anchorEl={anchorEl2}
          anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
          menuItems={menuItems2}
          onClose={this.closeanchorEl2}
        />
      ]
    } else if (mode === 3) {
      return (
        <ReviewNav title={exam.title} code={exam.code}>
          <ReviewScreen exam={exam} report={report} />
        </ReviewNav>
      )
    } else {
      return null
    }
  }
}
