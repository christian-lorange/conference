import React from 'react'

import {List, ListItem, makeSelectable} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import LinkWithoutUnderline from '../custom/linkWithoutUnderline.jsx'
import Header from '../header.jsx'

let SelectableList = makeSelectable(List)

/**
 * Component to list the sessions in a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Sessions = React.createClass({

  propTypes: {
    sessions: React.PropTypes.array.isRequired,
    fetchSessions: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.props.fetchSessions()
  },

  render() {
    const rightArrow = <i className="fa fa-angle-right" aria-hidden="true" />

    const sessionsComponent = this.props.sessions.map(session => {
      return (
        <LinkWithoutUnderline key={session.id} to={`/sessions/${session.id}`}>
          <ListItem
            value={session.id}
            primaryText={session.title}
            rightIcon={rightArrow}
          />
          <Divider />
        </LinkWithoutUnderline>
      )
    })

    return (
      <div>
        <Header pageTitle="Sessions" />
        <SelectableList>
          {sessionsComponent}
        </SelectableList>

      </div>
    )
  }

})

export default Sessions
