import React, { Component } from 'react'
import { remote } from 'electron'
import MainNav from './components/MainNav/MainNav'
import MainScreen from './components/MainScreen/MainScreen'
import CoverNav from './components/CoverNav/CoverNav'
import CoverScreen from './components/CoverScreen/CoverScreen'
import ExamNav from './components/ExamNav/ExamNav'
import ExamScreen from './components/ExamScreen/ExamScreen'
import ReviewNav from './components/ReviewNav/ReviewNav'
import ReviewScreen from './components/ReviewScreen/ReviewScreen'
import Prompt from './components/App/Prompt'
import Confirm from './components/App/Confirm'
import Loading from './components/App/Loading'
import Popup from './components/App/Popup'
import About from './components/App/About'
import ErrorIcon from '@material-ui/icons/ErrorSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import StartExamIcon from '@material-ui/icons/PowerSettingsNewSharp'
import ExitExamIcon from '@material-ui/icons/StopSharp'
import TimerIcon from '@material-ui/icons/TimerSharp'
import SaveIcon from '@material-ui/icons/SaveSharp'
import TimeExpiredIcon from '@material-ui/icons/TimerOffSharp'
import { readDirectory, getFilename, formatFilename } from './utils/fileHelpers'
import validateExam from './utils/validateExam'
import isEqual from 'lodash/isEqual'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

// promisify fs operation to use promises vs callbacks
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const deleteFile = promisify(fs.unlink)

// reference the electron mainWin object
const mainWin = remote.BrowserWindow.fromId(1)

// main React class
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      mode: 0,
      mainMode: 0,
      examMode: 0,
      reviewMode: 0,
      reviewType: null,
      exams: null,
      history: null,
      sessions: null,
      exam: null,
      question: 0,
      answers: null,
      fillIns: null,
      marked: null,
      time: null,
      explanation: false,
      report: null,
      fileData: null,
      filepaths: null,
      aboutES: false,
      notePrompt: false,
      promptLR: false,
      confirmDE: false,
      confirmSE: false,
      confirmEE: false,
      confirmRE: false,
      confirmDH: false,
      confirmSS: false,
      confirmDS: false,
      confirmRS: false,
      confirmFAE: false,
      confirmTE: false,
      confirmSVE: false,
      anchorEl1: null,
      anchorEl2: null,
      anchorEl3: null,
      anchorEl4: null,
      indexExam: null,
      indexHist: null,
      indexSess: null,
      options: { timer: true }
    }

    this.explanation = React.createRef()
  }

  // load exams, history and sessions from json files when component has mounted
  componentDidMount() {
    this.loadExams()
    this.loadHistory()
    this.loadSessions()
    this.loadOptions()
  }

  // load exams by reading entire static/exams directory
  // readDirectory also gets all file stats and filepaths
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

  // reads history file and sets state
  loadHistory = () => {
    let filepath = path.resolve(__static, 'history.json')
    readFile(filepath)
      .then(data => {
        let history = data.length ? JSON.parse(data) : []
        this.setState({ history })
      })
      .catch(console.error)
  }

  // reads sessions file and sets state
  loadSessions = () => {
    let filepath = path.resolve(__static, 'sessions.json')
    readFile(filepath)
      .then(data => {
        let sessions = data.length ? JSON.parse(data) : []
        this.setState({ sessions })
      })
      .catch(console.error)
  }

  // reads options file and sets state
  loadOptions = () => {
    let filepath = path.resolve(__static, 'options.json')
    readFile(filepath)
      .then(data => this.setState({ options: JSON.parse(data) }))
      .catch(console.error)
  }

  // reads and copies any local file into static/exams and updates state
  // validates exam json schema with ajv against pre-defined schema
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
          this.setState({ confirmFAE: true })
        } else {
          let file = getFilename(filepath[0])
          readFile(filepath[0])
            .then(data => {
              if (validateExam(data) !== 'valid') {
                this.setState({ confirmSVE: true })
                return
              }
              writeFile(path.resolve(__static, 'exams', file), data).then(this.loadExams)
            })
            .catch(console.error)
        }
      }
    )
  }

  // fetch an exam from a remote source
  // currently under construction
  loadRemoteExam = str => {
    const url = new URL(str)
    const request = remote.net.request(url.href)

    request.on('response', response => {
      response.on('data', data => {
        if (validateExam(data) !== 'valid') {
          this.setState({ confirmSVE: true })
        } else {
          let exam = JSON.parse(data)
          let filename = formatFilename(exam.title)
          writeFile(path.resolve(__static, 'exams', filename), data)
            .then(this.loadExams)
            .catch(console.error)
        }
      })
    })
    request.end()
  }

  // delete exam and rewrite file
  // finds related history and sessions and deletes/rewrites
  deleteExam = () => {
    const { filepaths, indexExam, sessions, history } = this.state
    let filename = filepaths[indexExam]
    let newHistory = history.filter(h => h.filename !== filename)
    let newSessions = sessions.filter(s => s.filename !== filename)
    deleteFile(filename)
      .then(() => {
        this.loadExams()
        this.setState({ indexExam: null })
        newHistory.length < history.length && this.updateHistory(newHistory)
        newSessions.length < sessions.length && this.updateSessions(newSessions)
        this.closeConfirmDE()
      })
      .catch(console.error)
  }

  // helper to delete exam
  updateHistory = history => {
    let filepath = path.resolve(__static, 'history.json')
    this.setState({ history }, () => {
      writeFile(filepath, JSON.stringify(history)).catch(console.error)
    })
  }

  // helper to delete exam
  updateSessions = sessions => {
    let filepath = path.resolve(__static, 'sessions.json')
    this.setState({ sessions }, () => {
      writeFile(filepath, JSON.stringify(sessions)).catch(console.error)
    })
  }

  // set App mode --> 0 = main, 1 = cover, 2 = exam, 3 = review
  setMode = mode => this.setState({ mode })

  // set Main mode --> 0 = exams, 1 = history, 2 = sessions, 3 = settings
  setMainMode = mainMode => this.setState({ mainMode })

  // set Review mode --> 0 = summary, 1 = detail
  setReviewMode = reviewMode => this.setState({ reviewMode })

  // set Review question type --> Number = specific question, all, marked, incomplete
  setReviewType = reviewType => this.setState({ reviewType })

  // opens exam menu at coords and stores index
  onExamClick = (e, i) => {
    this.setState({
      anchorEl1: { left: e.clientX, top: e.clientY },
      indexExam: i
    })
  }
  // opens history menu at coords and stores index
  onHistoryClick = (e, i) => {
    this.setState({
      anchorEl3: { left: e.clientX, top: e.clientY },
      indexHist: i
    })
  }

  // opens sessions menu at coords and stores index
  onSessionClick = (e, i) => {
    this.setState({
      anchorEl4: { left: e.clientX, top: e.clientY },
      indexSess: i
    })
  }

  // initializes exam process
  enterTestMode = () => {
    let answers = []
    let marked = []
    let fillIns = []
    let exam = this.state.exams[this.state.indexExam]
    let time = exam.time * 60
    exam.test.forEach(t => {
      answers.push(Array(t.choices.length).fill(false))
      fillIns.push('')
    })
    this.setState({
      mode: 1,
      exam,
      answers,
      marked,
      fillIns,
      time,
      anchorEl1: null
    })
  }

  // starts timer and opens exam
  startExam = () => {
    this.closeConfirmSE()
    this.setMode(2)
    this.initTimer()
  }

  // starts the exam timer
  initTimer = () => {
    this.timer = setInterval(() => {
      const { time } = this.state
      if (time === 0) {
        clearInterval(this.timer)
        this.setState({ confirmTE: true })
        return
      }
      this.setState({ time: time - 1 })
    }, 1000)
  }

  // pauses the exam timer
  pauseTimer = () => {
    this.setState({ confirmRE: true, anchorEl2: null })
    clearInterval(this.timer)
  }

  handleSlider = value => {
    const { examMode, question, marked } = this.state
    if (question === value - 1) return
    if (examMode === 0) {
      let mode = value - 1 > question ? 2 : 1
      this.setQuestion(value - 1, mode)
    } else if (examMode === 1) {
      this.setState({ question: marked[value - 1] })
    }
  }

  setQuestion = (question, mode) => {
    if (mode === 'click') return this.setState({ question })
    if (question < 0 || question > this.state.exam.test.length - 1) return
    const { examMode } = this.state
    if (examMode === 0) {
      this.setState({ question, explanation: false })
    } else if (examMode === 1) {
      const { marked } = this.state
      if (marked.length === 1) return
      let newQuestion
      if (mode === 0) {
        newQuestion = marked[0]
      } else if (mode === 1) {
        let i = marked.indexOf(question + 1)
        if (i === 0) return
        newQuestion = marked[i - 1]
      } else if (mode === 2) {
        let i = marked.indexOf(question - 1)
        if (i === marked.length - 1) return
        newQuestion = marked[i + 1]
      } else if (mode === 3) {
        newQuestion = marked[marked.length - 1]
      }
      this.setState({ question: newQuestion })
    }
  }

  markQuestion = i => {
    const { marked, examMode } = this.state
    var newMarked = marked.slice(0)
    if (marked.indexOf(i) === -1) {
      newMarked.push(i)
    } else {
      newMarked = marked.filter(el => el !== i)
      if (examMode === 1) {
        if (!newMarked.length) {
          this.setExamMode(0)
        } else {
          this.setState({ question: newMarked[0] })
        }
      }
    }
    newMarked.sort((a, b) => a - b)
    this.setState({ marked: newMarked })
  }

  enterMarkedMode = () => {
    const { marked } = this.state
    if (!marked.length) return
    this.setExamMode(1)
    this.setState({ question: marked[0] })
  }

  setExamMode = examMode => this.setState({ examMode })

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

  onAnswerFillIn = (value, x) => {
    let { answers, fillIns, exam } = this.state
    let correct = exam.test[x].answer
    if (correct.indexOf(value) !== -1) {
      answers[x] = [true]
    } else {
      answers[x] = [false]
    }
    fillIns[x] = value
    this.setState({ answers, fillIns })
  }

  exitExam = () => {
    clearInterval(this.timer)
    const { exam, answers, time, history, filepaths, indexExam } = this.state
    let correct = []
    let incorrect = []
    let incomplete = []
    answers.forEach((a, i) => {
      let answer = exam.test[i].answer
      if (a.indexOf(true) === -1) {
        incomplete.push(i)
      } else if (isEqual(a, answer) || (a.length === 1 && !!a)) {
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
      answers,
      date,
      elapsed
    }
    history.push(report)
    this.setState(
      {
        mode: 3,
        reviewMode: 0,
        report,
        confirmEE: false,
        confirmTE: false,
        history,
        indexExam: null
      },
      () => {
        let filepath = path.resolve(__static, 'history.json')
        writeFile(filepath, JSON.stringify(history)).catch(console.error)
      }
    )
  }

  enterReviewMode = () => {
    const { history, exams, filepaths, indexHist } = this.state
    let report = history[indexHist]
    let indexExam = filepaths.indexOf(report.filename)
    let exam = exams[indexExam]
    this.setState({ report, exam, mode: 3 })
  }

  exitReviewMode = () => {
    this.setState({ mode: 0, mainMode: 0, anchorEl3: null })
  }

  deleteHistory = () => {
    const { history, indexHist } = this.state
    let newHistory = history.filter((h, i) => indexHist !== i)
    this.setState({ history: newHistory, confirmDH: false }, () => {
      let filepath = path.resolve(__static, 'history.json')
      writeFile(filepath, JSON.stringify(newHistory))
        .then(() => this.setState({ indexHist: null }))
        .catch(console.error)
    })
  }

  saveSession = () => {
    clearInterval(this.timer)
    const { exam, answers, question, time, filepaths, indexExam, sessions, marked } = this.state
    let date = new Date()
    let filename = filepaths[indexExam]
    let completed = 0
    answers.forEach((a, i) => {
      if (a.indexOf(true) !== -1) {
        completed++
      }
    })
    let session = {
      filename,
      title: exam.title,
      code: exam.code,
      completed,
      answers,
      marked,
      question,
      time,
      date
    }
    sessions.push(session)
    this.setState({ mode: 0, sessions, indexExam: null, confirmSS: false }, () => {
      let filepath = path.resolve(__static, 'sessions.json')
      writeFile(filepath, JSON.stringify(sessions)).catch(console.error)
    })
  }

  resumeSession = () => {
    const { sessions, indexSess, exams, filepaths } = this.state
    let session = sessions[indexSess]
    let { time, question, answers, marked, filename } = session
    let indexExam = filepaths.indexOf(filename)
    let exam = exams[indexExam]
    this.setState(
      {
        mode: 2,
        mainMode: 0,
        confirmRS: false,
        indexExam,
        exam,
        time,
        question,
        answers,
        marked
      },
      () => {
        this.initTimer()
      }
    )
  }

  deleteSession = () => {
    const { sessions, indexSess } = this.state
    let newSessions = sessions.filter((s, i) => i !== indexSess)
    this.setState({ sessions: newSessions, indexSess: null, confirmDS: false }, () => {
      let filepath = path.resolve(__static, 'sessions.json')
      writeFile(filepath, JSON.stringify(newSessions)).catch(console.error)
    })
  }

  updateExplanation = explanation => {
    const { exams, exam, filepaths } = this.state
    let i = exams.findIndex(el => el.title === exam.title)
    const newExam = Object.assign({}, exam)
    newExam.test[i].explanation = explanation
    this.setState({ exam: newExam }, () => {
      let filepath = filepaths[i]
      console.log(filepath, filepaths, exam, i)
      writeFile(filepath, JSON.stringify(newExam))
        .then(() => {
          this.loadExams()
          this.closeNotePrompt()
        })
        .catch(console.error)
    })
  }

  openNotePrompt = () => this.setState({ notePrompt: true })

  closeNotePrompt = () => this.setState({ notePrompt: false })

  openPromptLR = () => this.setState({ promptLR: true })

  closePromptLR = () => this.setState({ promptLR: false })

  closeAnchorEl1 = () => this.setState({ anchorEl1: null })

  closeAnchorEl2 = () => this.setState({ anchorEl2: null })

  closeAnchorEl3 = () => this.setState({ anchorEl3: null })

  closeAnchorEl4 = () => this.setState({ anchorEl4: null })

  openConfirmDE = () =>
    this.setState({
      confirmDE: true,
      anchorEl1: null
    })

  closeConfirmDE = () => this.setState({ confirmDE: false })

  openConfirmDH = () =>
    this.setState({
      confirmDH: true,
      anchorEl3: null
    })

  closeConfirmDH = () => this.setState({ confirmDH: false })

  closeConfirmRE = () => {
    this.initTimer()
    this.setState({ confirmRE: false })
  }

  openConfirmSE = () => this.setState({ confirmSE: true })

  closeConfirmSE = () => this.setState({ confirmSE: false })

  openConfirmEE = () =>
    this.setState({
      confirmEE: true,
      anchorEl2: null
    })

  closeConfirmEE = () => this.setState({ confirmEE: false })

  openConfirmSS = () =>
    this.setState({
      confirmSS: true,
      anchorEl2: null
    })

  closeConfirmSS = () => this.setState({ confirmSS: false })

  openConfirmDS = () =>
    this.setState({
      confirmDS: true,
      anchorEl4: null
    })

  closeConfirmDS = () => this.setState({ confirmDS: false })

  openConfirmRS = () =>
    this.setState({
      confirmRS: true,
      anchorEl4: null
    })

  closeConfirmRS = () => this.setState({ confirmRS: false })

  openConfirmFAE = () => this.setState({ confirmFAE: true })

  closeConfirmFAE = () => this.setState({ confirmFAE: false })

  closeConfirmTE = () => this.setState({ confirmTE: false })

  closeConfirmSVE = () => this.setState({ confirmSVE: false })

  openAboutSE = () => this.setState({ aboutES: true })

  closeAboutSE = () => this.setState({ aboutES: false })

  saveOptions = options => this.setState({ options })

  render() {
    const { loading, mode, mainMode, examMode, reviewMode, reviewType, aboutES } = this.state
    const { confirmRS, confirmFAE, confirmTE, confirmDS, confirmSVE } = this.state
    const { confirmDE, confirmSE, confirmEE, confirmRE, confirmDH, confirmSS } = this.state
    const { anchorEl1, anchorEl2, anchorEl3, anchorEl4, notePrompt, promptLR } = this.state
    const { exams, exam, question, time, answers, explanation, fileData, filepaths } = this.state
    const { report, history, sessions, marked, options, fillIns } = this.state
    if (loading) return <Loading />
    else if (mode === 0) {
      const menuItems1 = [
        { text: 'Start Exam', click: this.enterTestMode },
        { text: 'Delete Exam', click: this.openConfirmDE }
      ]
      const menuItems3 = [
        { text: 'Review History', click: this.enterReviewMode },
        { text: 'Delete History', click: this.openConfirmDH }
      ]
      const menuItems4 = [
        { text: 'Resume Session', click: this.openConfirmRS },
        { text: 'Delete Session', click: this.openConfirmDS }
      ]
      return [
        <MainNav
          key="main-screen"
          mainMode={mainMode}
          setMainMode={this.setMainMode}
          loadLocalExam={this.loadLocalExam}
          openPromptLR={this.openPromptLR}
          openAboutSE={this.openAboutSE}
        >
          <MainScreen
            mainMode={mainMode}
            exams={exams}
            fileData={fileData}
            filepaths={filepaths}
            history={history}
            sessions={sessions}
            options={options}
            onExamClick={this.onExamClick}
            onHistoryClick={this.onHistoryClick}
            onSessionClick={this.onSessionClick}
            setMainMode={this.setMainMode}
            saveOptions={this.saveOptions}
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
          key="schema-validation-error"
          alert={true}
          open={confirmSVE}
          title="Error"
          message="JSON Schema Error"
          detail="Insert link to get more information here."
          icon={<ErrorIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmSVE}
          onOkay={this.closeConfirmSVE}
        />,
        <Confirm
          key="file-already-exists"
          alert={true}
          open={confirmFAE}
          title="Error"
          message="Duplicate File Error"
          detail="Cannot load exam. Filename already exists."
          icon={<ErrorIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmFAE}
          onOkay={this.closeConfirmFAE}
        />,
        <Confirm
          key="delete-exam"
          open={confirmDE}
          title="Delete Exam"
          message="Delete Exam File"
          detail="Do you want to permanently delete this exam?"
          icon={<DeleteIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmDE}
          onOkay={this.deleteExam}
        />,
        <Confirm
          key="delete-history"
          open={confirmDH}
          title="Delete History"
          message="Delete History"
          detail="Do you want to permanently delete this history?"
          icon={<DeleteIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmDH}
          onOkay={this.deleteHistory}
        />,
        <Confirm
          key="resume-session"
          open={confirmRS}
          title="Resume Session"
          message="Resume Session"
          detail="Do you want to resume this exam session?"
          icon={<StartExamIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmRS}
          onOkay={this.resumeSession}
        />,
        <Confirm
          key="delete-session"
          open={confirmDS}
          title="Delete Session"
          message="Delete Session"
          detail="Do you want to permanently delete this session?"
          icon={<DeleteIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmDS}
          onOkay={this.deleteSession}
        />,
        <Popup
          key="popup-1"
          anchorEl={anchorEl1}
          anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
          menuItems={menuItems1}
          onClose={this.closeAnchorEl1}
        />,
        <Popup
          key="popup-3"
          anchorEl={anchorEl3}
          anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
          menuItems={menuItems3}
          onClose={this.closeAnchorEl3}
        />,
        <Popup
          key="popup-4"
          anchorEl={anchorEl4}
          anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
          menuItems={menuItems4}
          onClose={this.closeAnchorEl4}
        />,
        <About
          key="about"
          open={aboutES}
          version={remote.app.getVersion()}
          onClose={this.closeAboutSE}
        />
      ]
    } else if (mode === 1) {
      return [
        <CoverNav
          key="cover-screen"
          title={exam.title}
          code={exam.code}
          passing={exam.pass}
          timeLimit={exam.time}
          total={exam.test.length}
          setMode={this.setMode}
          openConfirmSE={this.openConfirmSE}
        >
          <CoverScreen cover={exam.cover} />
        </CoverNav>,
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
        { text: 'Save Session', click: this.openConfirmSS },
        { text: 'End Exam', click: this.openConfirmEE }
      ]
      return [
        <ExamNav
          key="exam-screen"
          title={exam.code}
          examMode={examMode}
          total={exam.test.length}
          question={question}
          marked={marked}
          answers={answers}
          enterMarkedMode={this.enterMarkedMode}
          setExamMode={this.setExamMode}
          setQuestion={this.setQuestion}
        >
          <ExamScreen
            expRef={this.explanation}
            examMode={examMode}
            exam={exam}
            question={question}
            time={time}
            answers={answers}
            marked={marked}
            fillIns={fillIns}
            explanation={explanation}
            handleSlider={this.handleSlider}
            setQuestion={this.setQuestion}
            markQuestion={this.markQuestion}
            onAnswerCheck={this.onAnswerCheck}
            onAnswerMultiple={this.onAnswerMultiple}
            onAnswerFillIn={this.onAnswerFillIn}
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
          onOkay={this.exitExam}
        />,
        <Confirm
          key="save-session"
          open={confirmSS}
          title="Save Session"
          message="Save Session"
          detail="Do you want to exit exam and save current session?"
          icon={<SaveIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmSS}
          onOkay={this.saveSession}
        />,
        <Confirm
          key="time-expired"
          alert={true}
          open={confirmTE}
          title="Time Expired"
          message="Time Expired"
          detail="Exam time has expired. Click OK to view results."
          icon={<TimeExpiredIcon fontSize="inherit" className="confirm-icon" />}
          onClose={this.closeConfirmTE}
          onOkay={this.exitExam}
        />,
        <Popup
          key="popup-2"
          anchorEl={anchorEl2}
          anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
          menuItems={menuItems2}
          onClose={this.closeAnchorEl2}
        />
      ]
    } else if (mode === 3) {
      return (
        <ReviewNav
          key="review"
          reviewMode={reviewMode}
          reviewType={reviewType}
          title={exam.title}
          code={exam.code}
          total={exam.test.length}
          report={report}
          exit={this.exitReviewMode}
          setReviewMode={this.setReviewMode}
          setReviewType={this.setReviewType}
          openNotePrompt={this.openNotePrompt}
        >
          <ReviewScreen
            reviewMode={reviewMode}
            reviewType={reviewType}
            exam={exam}
            report={report}
            notePrompt={notePrompt}
            closeNotePrompt={this.closeNotePrompt}
            updateExplanation={this.updateExplanation}
          />
        </ReviewNav>
      )
    } else {
      return null
    }
  }
}
