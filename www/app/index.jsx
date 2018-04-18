import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {lightBlueA700} from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store/configureStore.jsx'
import Home from './components/home.jsx'
import AboutPhone from './components/aboutPhone.jsx'
import SessionsContainer from './containers/session/sessionsContainer.jsx'
import SessionContainer from './containers/session/sessionContainer.jsx'
import NoteContainer from './containers/session/noteContainer.jsx'
import ScheduleContainer from './containers/session/scheduleContainer.jsx'
import SpeakersContainer from './containers/speaker/speakersContainer.jsx'
import SpeakerContainer from './containers/speaker/speakerContainer.jsx'

const App = React.createClass({

  render() {
    // Create an enhanced history that syncs navigation events with the store
    const store = configureStore(hashHistory)
    const history = syncHistoryWithStore(hashHistory, store)

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: lightBlueA700,
      },
      appBar: {
        height: 60,
      }
    })

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/">
              <IndexRoute component={Home} />
              <Route path="sessions" component={SessionsContainer} />
              <Route path="sessions/:id" component={SessionContainer} />
              <Route path="sessions/:id/note" component={NoteContainer} />
              <Route path="speakers" component={SpeakersContainer} />
              <Route path="speakers/:id" component={SpeakerContainer} />
              <Route path="schedule" component={ScheduleContainer} />
              <Route path="aboutPhone" component={AboutPhone} />
            </Route>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
})

function startApp() {
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin()

  window.db = window.sqlitePlugin.openDatabase({
    name: 'conference.db',
    location: 'default'
  })

  window.db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS Notes (
      id integer primary key,
      comment text,
      sessionId text,
      image text,
      audio text,
      video text)`)
  }, (error => {
    console.log(`Transaction ERROR: ${error.message}`)
  }), () => {
    console.log('Populated database OK')
  })

  render(<App/>, document.getElementById('app'))
}

document.addEventListener('deviceready', startApp, false)
