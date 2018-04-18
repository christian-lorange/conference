import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sessions from '../../components/session/sessions.jsx'
import * as SessionsActions from '../../actions/session/sessions.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    sessions: state.sessions,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SessionsActions, dispatch)

const SessionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sessions)

export default SessionsContainer
