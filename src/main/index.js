import { app, BrowserWindow } from 'electron'
import mainWinDimens from 'common/mainWinDimens'
import html from 'common/html'

let mainWin

const inDev = process.env.NODE_ENV === 'development'

function createMainWin() {
  const [width, height] = mainWinDimens()

  mainWin = new BrowserWindow({
    width,
    height
  })

  mainWin.setMenu(null)

  mainWin.loadURL(html())

  inDev && setupDevtools()

  mainWin.on('close', () => {
    mainWin = null
  })
}

function setupDevtools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer')
  mainWin.webContents.openDevTools({ mode: 'detach' })

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Installed -->  ${name}`))
    .catch(console.log)
}

app.on('ready', createMainWin)
app.on('window-all-closed', () => app.quit())
