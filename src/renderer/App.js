import React, { Component } from 'react'
import { remote } from 'electron'
import MainNav from './components/MainNav/MainNav'
import MainScreen from './components/MainScreen/MainScreen'
import CoverScreen from './components/CoverScreen/CoverScreen'
import ExamNav from './components/ExamNav/ExamNav'
import ExamScreen from './components/ExamScreen/ExamScreen'
import { readDirectory, getFile } from './utils/fileHelpers'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const mainWin = remote.BrowserWindow.fromId(1)

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      mode: 0,
      mainMode: 0,
      exams: null,
      exam: null,
      question: 0,
      answers: null,
      time: null,
      fileData: null,
      filepaths: null
    }
  }

  componentDidMount() {
    this.loadExams()
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
        const { filepaths } = this.state
        if (filepaths.includes(filepath[0])) {
          // already exists overwrite/error message
          return
        } else {
          let file = getFile(filepath[0])
          readFile(filepath[0])
            .then(data => writeFile(path.resolve(__static, 'exams', file), data))
            .then(this.loadExams)
            .catch(console.error)
        }
      }
    )
  }

  setMode = mode => this.setState({ mode })

  setMainMode = mainMode => this.setState({ mainMode })

  onSummaryClick = i => {
    let template = [
      { label: 'Open Exam', click: () => this.enterTestMode(i) },
      { label: 'Delete Exam', click: () => {} }
    ]
    let menu = remote.Menu.buildFromTemplate(template)
    menu.popup({ window: mainWin })
  }

  initTimer = () => {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time - 1 })
    }, 1000)
  }

  enterTestMode = i => {
    let answers = []
    let exam = this.state.exams[i]
    let time = exam.time * 60
    exam.test.forEach(t => answers.push(Array(t.choices.length).fill(false)))
    this.setState({ mode: 1, exam, answers, time })
  }

  setQuestion = question => {
    if (question < 0 || question > this.state.exam.test.length - 1) return
    this.setState({ question })
  }

  onAnswerCheck = (checked, x, y) => {
    let { answers } = this.state
    answers[x][y] = checked
    this.setState({ answers })
  }

  render() {
    const { loading, mode, mainMode, exams, exam, question, time, fileData, filepaths } = this.state
    if (mode === 0) {
      return (
        <MainNav setMainMode={this.setMainMode} loadLocalExam={this.loadLocalExam}>
          <MainScreen
            loading={loading}
            mainMode={mainMode}
            exams={exams}
            fileData={fileData}
            filepaths={filepaths}
            onSummaryClick={this.onSummaryClick}
          />
        </MainNav>
      )
    } else if (mode === 1) {
      return <CoverScreen cover={exam.cover} setMode={this.setMode} initTimer={this.initTimer} />
    } else if (mode === 2) {
      return (
        <ExamNav>
          <ExamScreen
            exam={exam}
            question={question}
            time={time}
            setQuestion={this.setQuestion}
            onAnswerCheck={this.onAnswerCheck}
          />
        </ExamNav>
      )
    } else {
      return null
    }
  }
}
