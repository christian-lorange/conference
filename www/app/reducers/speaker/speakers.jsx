import conferenceData from '../../../data/devfest-2015.json'

import {
  FETCH_SPEAKERS
} from '../../actions/speaker/speakers.jsx'

function fetchSpeakers() {
  return conferenceData.speakers
}

const speakers = (state = [], action) => {
  switch (action.type) {

  case FETCH_SPEAKERS:
    return fetchSpeakers()

  default:
    return state
  }
}

export default speakers
