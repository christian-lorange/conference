import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Note from '../../components/session/note.jsx'
import * as NoteActions from '../../actions/session/note.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    note: state.note,
    sessionId: ownProps.params.id
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(NoteActions, dispatch)

const NoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Note)

export default NoteContainer
