import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import mainWinDimens from 'common/mainWinDimens'
import html from 'common/html'
import { MAIN_ICON } from 'common/icons'

let mainWin

const firstInstance = app.requestSingleInstanceLock()
const inDev = process.env.NODE_ENV === 'development'

function createMainWin() {
  autoUpdater.checkForUpdatesAndNotify()
  const [width, height] = mainWinDimens()

  mainWin = new BrowserWindow({
    width,
    height,
    icon: MAIN_ICON,
    title: `Exam Simulator ${app.getVersion()}`
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

if (!firstInstance) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore()
      mainWin.focus()
    }
  })
  app.on('ready', createMainWin)
  app.on('window-all-closed', () => app.quit())
}
