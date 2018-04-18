import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Schedule from '../../components/session/schedule.jsx'
import * as SessionsActions from '../../actions/session/sessions.jsx'

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions
      .sort((a, b) => {
        const aStart = a.time.start
        const bStart = b.time.start
        if (aStart.isSame(bStart)) {
          const aId = a.id.split('s')[1]
          const bId = b.id.split('s')[1]
          return aId < bId ? -1 : (aId > bId) ? 1 : 0
        } else {
          return aStart.isBefore(bStart) ? -1 : 1
        }
      })
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SessionsActions, dispatch)

const ScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule)

export default ScheduleContainer
