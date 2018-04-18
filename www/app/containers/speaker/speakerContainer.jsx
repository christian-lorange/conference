import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Speaker from '../../components/speaker/speaker.jsx'
import * as SpeakerActions from '../../actions/speaker/speaker.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    speaker: state.speaker,
    speakerId: ownProps.params.id
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SpeakerActions, dispatch)

const SpeakerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Speaker)

export default SpeakerContainer
