import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#996b3a',
    },
    secondary: {
      main: '#a67e53',
      contrastText: '#fff'
    },
  },
})
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
