import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

import {
  FETCH_SPEAKER
} from '../../actions/speaker/speaker.jsx'

function fetchSpeaker(state, id) {
  const speaker = _.find(conferenceData.speakers, speaker => speaker.id === id)
  speaker.sessions = _.filter(conferenceData.sessions, session => _.includes(session.speakers, id))
  return Object.assign({}, state, speaker)
}

const speaker = (state = {}, action) => {
  switch (action.type) {

  case FETCH_SPEAKER:
    return fetchSpeaker(state, action.id)

  default:
    return state
  }
}

export default speaker
