import { createMuiTheme } from '@material-ui/core/styles'
import { remote } from 'electron'

function getMainColor() {
  let color = remote.systemPreferences.getAccentColor()
  return `#${color.substr(0, 6)}`
}

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true
    }
  },
  palette: {
    primary: {
      main: getMainColor()
    }
  }
})
