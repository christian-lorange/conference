import {
  RECEIVE_NOTE
} from '../../actions/session/note.jsx'

function receiveNote(note) {
  return Object.assign({}, note)
}

const note = (state = {}, action) => {
  switch (action.type) {

  case RECEIVE_NOTE:
    return receiveNote(action.note)

  default:
    return state
  }
}

export default note
