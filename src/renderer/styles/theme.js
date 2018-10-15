import { createMuiTheme } from '@material-ui/core/styles'
import { remote } from 'electron'

function getMainColor() {
  let color = remote.systemPreferences.getAccentColor()
  return `#${color.substr(0, 6)}`
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: getMainColor()
    }
  }
})

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  palette: {
    primary: {
      main: theme.palette.primary.main
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiDialog: {
      BackdropProps: {
        invisible: true
      },
      disableBackdropClick: true,
      disableEscapeKeyDown: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.background.default,
        color: theme.palette.common.black,
        outline: '1px outset rgb(206, 206, 206)',
        fontSize: '.75rem',
        '&:hover': {
          backgroundColor: 'rgb(225, 242, 255)',
          outline: '2px outset rgb(1, 139, 244)'
        }
      }
    },
    MuiIconButton: {
      root: {
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'none'
        }
      }
    },
    MuiDialog: {
      paper: {
        width: '50%',
        borderRadius: 0,
        boxShadow: theme.shadows[3],
        border: `1px solid ${theme.palette.primary.main}`
      }
    },
    MuiDialogTitle: {
      root: {
        height: 25,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        padding: 0
      }
    },
    MuiDialogContent: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing.unit * 3,
        paddingTop: 10
      }
    },
    MuiDialogActions: {
      root: {
        margin: 0,
        padding: '8px 4px',
        backgroundColor: theme.palette.grey[200],
        borderTop: theme.palette.grey[400]
      }
    }
  }
})
