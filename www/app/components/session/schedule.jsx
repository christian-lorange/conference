import React from 'react'
import renderHTML from 'react-render-html'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import moment from 'moment'

import Toggle from 'material-ui/Toggle'
import Snackbar from 'material-ui/Snackbar'
import {lightBlueA700} from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import Header from '../header.jsx'

/**
 * Component to schedule events for a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Schedule = React.createClass({

  getInitialState() {
    return {
      openSuccessCreatedEvent: false,
      openFailCreatedEvent: false,
      openSuccessDeletedEvent: false,
      openFailDeletedEvent: false,
      isAttendingToggle: false,
      conflictingSession: false
    }
  },

  propTypes: {
    sessions: React.PropTypes.array.isRequired,
    fetchSessions: React.PropTypes.func.isRequired,
    setAttendedSession: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.props.fetchSessions()
    this._listExistingEvents(this._refreshSessionAttendedState)
  },

  render() {
    const snackbarAutoHideDuration = 4000

    const sessionsAttended = this.state.isAttendingToggle ?
      this.props.sessions.filter(session => session.isAttended) : this.props.sessions
    const sessionsComponent = sessionsAttended.map(session => {
      const iconCalendar = session.isAttended ? 'fa-calendar-check-o' : 'fa-calendar-o'

      return (
        <TimelineEvent key={session.id}
                       title={session.title}
                       createdAt={`${session.time.start.format('HH:mm')} - ${session.time.end.format('HH:mm')} (${session.time.end.diff(session.time.start, 'minutes')} minutes)`}
                       icon={<i className={`fa ${iconCalendar}`} style={{marginTop: '2px', marginLeft: '2px'}} aria-hidden='true'/>}
                       iconColor={session.isAttended ? '#000000' : '#7bb1ea'}
                       contentStyle={{color: '#000000'}}
                       container='card'
                       onTouchTap={() => this._onTouchEvent(session)}
                      >
          {renderHTML(`<div style='max-height:100px; text-overflow: ellipsis; overflow: hidden'>${session.desc || ''}</div>`)}
        </TimelineEvent>
      )
    })

    const noAttendingEventMessage =
      <div style={{backgroundColor: lightBlueA700, height: '100%', width: '100%', textAlign: 'center'}}>
        <div style={{paddingTop: '30%', color: 'white'}}>
          <img src='data/img/calendar.png' width='50%'/>
          <h2>No events in your calendar</h2>
          <p>The events you add are displayed here so it's easier for you to track them.</p>
        </div>
      </div>

    const timelineOrMessage = (this.state.isAttendingToggle && !this.props.sessions.filter(session => session.isAttended).length) ?
      noAttendingEventMessage :
      <Timeline>
        {sessionsComponent}
      </Timeline>

    const conflictModalActions = [
      <FlatButton
        label="Attend anyway !"
        secondary={true}
        onTouchTap={() => {
          this._createEvent(this.state.conflictingSession)
          this.setState({openConflictDialog: false})
        }}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setState({openConflictDialog: false})}
      />
    ]

    return (
      <div>
        <Header pageTitle='Schedule'
          iconElementRight={
            <Toggle onToggle={this._onAttendingToggle}
                    style={{marginTop: '14px', marginRight: '14px'}}
                    thumbStyle={{backgroundColor: '#211f1f'}}
                    trackStyle={{backgroundColor: '#ffffff'}}
                    thumbSwitchedStyle={{backgroundColor: '#7bb1ea'}}
                    trackSwitchedStyle={{backgroundColor: '#ffffff'}}
            />
          }
        />
        {timelineOrMessage}
        <Snackbar
          open={this.state.openSuccessCreatedEvent}
          message='This event has been added to your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openSuccessCreatedEvent: false})}
        />
        <Snackbar
          open={this.state.openFailCreatedEvent}
          message='Sorry, we were unable to add this event in your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openFailCreatedEvent: false})}
        />
        <Snackbar
          open={this.state.openSuccessDeletedEvent}
          message='This event has been deleted from your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openSuccessDeletedEvent: false})}
        />
        <Snackbar
          open={this.state.openFailDeletedEvent}
          message='Sorry, we were unable to delete this event from your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openFailDeletedEvent: false})}
        />
        <Dialog
            title='Conflict'
            actions={conflictModalActions}
            modal={false}
            open={this.state.openConflictDialog}
            onRequestClose={() => this.setState({openConflictDialog: false})}
          >
            You selected an event happening at the same time as one you're attending
          </Dialog>
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _onAttendingToggle(e, isToggled) {
    this.setState({isAttendingToggle: isToggled})
  },

  _onTouchEvent(session) {
    if (session.isAttended) {
      // delete the event
      const onSuccessDeletedEvent = () => {
        this.setState({openSuccessDeletedEvent: true})
        this.props.setAttendedSession(session.id, false)
      }
      const onFailDeletedEvent = () => this.setState({openFailDeletedEvent: true})

      window.plugins.calendar.deleteEvent(session.title, session.confRoom,
        session.desc, session.time.start.toDate(), session.time.end.toDate(),
        onSuccessDeletedEvent, onFailDeletedEvent)

    } else {
      // create the event
      this._listExistingEvents(events => {
        const sessionStart = session.time.start
        const sessionEnd = session.time.end
        const overlappingEvents = events.filter(event => {
          const sessionFromEvent = this.props.sessions.filter(session => session.title === event.title)[0]
          if (sessionFromEvent) {
            const otherSessionStart = sessionFromEvent.time.start
            const otherSessionEnd = sessionFromEvent.time.end
            return ((sessionStart.isSameOrAfter(otherSessionStart) && sessionStart.isBefore(otherSessionEnd)) ||
            (sessionEnd.isAfter(otherSessionStart) && sessionEnd.isSameOrBefore(otherSessionEnd)))
          } else {
            return false
          }
        })

        // conflicts detected
        if (overlappingEvents && overlappingEvents.length) {
          this.setState({conflictingSession: session, openConflictDialog: true})
        } else {
          this._createEvent(session)
        }
      })
    }
  },

  _createEvent(session) {
    const onSuccessCreatedEvent = () => {
      this.setState({openSuccessCreatedEvent: true})
      this.props.setAttendedSession(session.id, true)
    }
    const onFailCreatedEvent = () => this.setState({openFailCreatedEvent: true})

    window.plugins.calendar.createEvent(session.title, session.confRoom,
      session.desc, session.time.start.toDate(), session.time.end.toDate(),
      onSuccessCreatedEvent, onFailCreatedEvent)
  },

  _listExistingEvents(onSuccess) {
    const now = moment().hours(0).minutes(0).seconds(0).milliseconds(0)
    window.plugins.calendar.listEventsInRange(now.toDate(), now.add(1, 'days').toDate(),
        onSuccess)
  },

  _refreshSessionAttendedState(events) {
    events.forEach(event => {
      const sessionFromEvent = this.props.sessions.filter(session => session.title === event.title)[0]
      if (sessionFromEvent) {
        this.props.setAttendedSession(sessionFromEvent.id, true)
      }
    })
  }

})

export default Schedule
