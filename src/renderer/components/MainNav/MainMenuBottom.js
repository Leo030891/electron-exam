import React from 'react'
import { shell } from 'electron'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SettingsIcon from '@material-ui/icons/SettingsSharp'
import InfoIcon from '@material-ui/icons/InfoSharp'
import HelpIcon from '@material-ui/icons/HelpSharp'
import MakerIcon from '@material-ui/icons/OpenInNewSharp'
import BugIcon from '@material-ui/icons/BugReportSharp'

const styles = theme => ({
  listItem: {
    '&:hover': {
      backgroundColor: 'rgb(225, 242, 255)',
      outline: '2px solid rgb(1, 139, 244)',
      color: 'rgb(1, 139, 244)'
    }
  }
})

function MainMenuBottom({ setMainMode, openAboutSE, classes }) {
  const list = [
    {
      text: 'Exam Maker',
      icon: <MakerIcon />,
      click: () => shell.openExternal('https://exam-maker.herokuapp.com/')
    },
    { text: 'About', icon: <InfoIcon />, click: openAboutSE },
    {
      text: 'Documentation',
      icon: <HelpIcon />,
      click: () => shell.openExternal('https://github.com/benjaminadk/electron-exam/wiki')
    },
    {
      text: 'Report Bug',
      icon: <BugIcon />,
      click: () =>
        shell.openExternal(
          'https://github.com/benjaminadk/electron-exam/issues/new?template=bug_report.md'
        )
    },
    { text: 'Settings', icon: <SettingsIcon />, click: () => setMainMode(3) }
  ]
  return (
    <div style={{ position: 'absolute', bottom: 0, width: 240, overflow: 'hidden' }}>
      <Divider />
      <List disablePadding>
        {list.map((l, i) => (
          <ListItem key={l.text} onClick={l.click} classes={{ button: classes.listItem }} button>
            <ListItemIcon>{l.icon}</ListItemIcon>
            <ListItemText primary={l.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )
}

export default withStyles(styles)(MainMenuBottom)
