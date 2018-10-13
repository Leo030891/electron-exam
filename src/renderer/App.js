import React, { Component } from 'react'
import { remote } from 'electron'
import MainNav from './components/MainNav/MainNav'
import MainScreen from './components/MainScreen/MainScreen'
import CoverScreen from './components/CoverScreen/CoverScreen'
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

  onSummaryClick = i => {
    let template = [
      { label: 'Open Exam', click: () => this.enterTestMode(i) },
      { label: 'Delete Exam', click: () => {} }
    ]
    let menu = remote.Menu.buildFromTemplate(template)
    menu.popup({ window: mainWin })
  }

  enterTestMode = i => {
    this.setState({ mode: 1, exam: this.state.exams[i] })
  }

  setMainMode = mainMode => this.setState({ mainMode })

  render() {
    const { loading, mode, mainMode, exams, exam, fileData, filepaths } = this.state
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
      return <CoverScreen exam={exam} />
    } else {
      return null
    }
  }
}
