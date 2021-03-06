import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(1, 139, 244)'
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
      main: 'rgb(1, 139, 244)'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiDialog: {
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
        color: theme.palette.grey[800],
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiListItemIcon: {
      root: {
        color: theme.palette.grey[800]
      }
    },
    MuiDialogTitle: {
      root: {
        height: 25,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
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
        borderTop: theme.palette.grey[600]
      }
    }
  }
})
