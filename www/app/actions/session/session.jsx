export const FETCH_SESSION = 'FETCH_SESSION'

export function fetchSession(id) {
  return {
    type: FETCH_SESSION,
    id
  }
}
