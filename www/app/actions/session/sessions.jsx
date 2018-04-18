export const FETCH_SESSIONS = 'FETCH_SESSIONS'
export const SET_ATTENDED_SESSION = 'SET_ATTENDED_SESSION'

export function fetchSessions() {
  return {
    type: FETCH_SESSIONS
  }
}

export function setAttendedSession(id, isAttended) {
  return {
    type: SET_ATTENDED_SESSION,
    id,
    isAttended
  }
}
