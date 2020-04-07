import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
// This provides support for Internet Explorer 11

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { SearchContextProvider } from './searchContext'
import { JournalContextProvider } from './journalContext'
import './normalize.css'

ReactDOM.render(
    <JournalContextProvider>
        <SearchContextProvider>
                <Router>
                    <App />
                </Router>
        </SearchContextProvider>
    </JournalContextProvider>
    , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
