import React from 'react'

import {List, ListItem, makeSelectable} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

import LinkWithoutUnderline from '../custom/linkWithoutUnderline.jsx'
import Header from '../header.jsx'

let SelectableList = makeSelectable(List)

/**
 * Component to list the speakers in a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Speakers = React.createClass({

  propTypes: {
    speakers: React.PropTypes.array.isRequired,
    fetchSpeakers: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.props.fetchSpeakers()
  },

  render() {
    const rightArrow = <i className="fa fa-angle-right" aria-hidden="true" />

    const speakersComponent = this.props.speakers.map(speaker => {
      return (
        <LinkWithoutUnderline key={speaker.id} to={`/speakers/${speaker.id}`}>
          <ListItem
            key={speaker.id}
            value={speaker.id}
            primaryText={`${speaker.firstname} ${speaker.lastname}`}
            leftAvatar={<Avatar src={`data/img/speakers/${speaker.image}`} />}
            rightIcon={rightArrow}
          />
          <Divider />
      </LinkWithoutUnderline>
      )
    })


    return (
      <div>
        <Header pageTitle="Speakers" />
        <SelectableList>
          {speakersComponent}
        </SelectableList>

      </div>
    )
  }

})

export default Speakers
