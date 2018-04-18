import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Speakers from '../../components/speaker/speakers.jsx'
import * as SpeakersActions from '../../actions/speaker/speakers.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    speakers: state.speakers,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SpeakersActions, dispatch)

const SpeakersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Speakers)

export default SpeakersContainer
