import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import App from './App'
import theme from './styles/theme'
import './styles/index.scss'

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
)
