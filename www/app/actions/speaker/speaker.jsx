export const FETCH_SPEAKER= 'FETCH_SPEAKER'

export function fetchSpeaker(id) {
  return {
    type: FETCH_SPEAKER,
    id
  }
}
