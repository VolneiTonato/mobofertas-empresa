import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import theme from './theme'
import CssBaseLine from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'


const node = document.getElementById('root')

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseLine />
        <App />
    </ThemeProvider>
    , node)


