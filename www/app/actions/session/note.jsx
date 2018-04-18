import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

export const RECEIVE_NOTE = 'RECEIVE_NOTE'
export const SAVE_NOTE = 'SAVE_NOTE'

// Trigger the receive note and fetch the related session
function receiveNote(note) {
  note.session = _.find(conferenceData.sessions, session => session.id === note.sessionId)
  return {
    type: RECEIVE_NOTE,
    note
  }
}

// Save a note in the database
export function saveNote(sessionId, comment, onSuccess, onFailure) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Notes WHERE sessionId = ?', [sessionId], (tx, rs) => {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql('UPDATE Notes SET comment = ? WHERE sessionId = ?', [comment, sessionId], () => {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              comment
            })))
            onSuccess()
          }, () => {
            onFailure()
          })
        } else {
          tx.executeSql('INSERT INTO Notes (comment, sessionId) VALUES (?, ?)', [comment, sessionId], (tx, rs) => {
            const note = {
              id: rs.insertId,
              comment,
              sessionId
            }
            dispatch(receiveNote(note))
            onSuccess()
          }, () => {
            onFailure()
          })
        }
      }, () => {
        onFailure()
      })
    })
  }
}

export function addPhotoToNote(sessionId, image, onSuccess, onFailure) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Notes WHERE sessionId = ?', [sessionId], (tx, rs) => {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql('UPDATE Notes SET image = ? WHERE sessionId = ?', [image, sessionId], () => {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              image
            })))
            onSuccess()
          }, () => {
            onFailure()
          })
        } else {
          tx.executeSql('INSERT INTO Notes (image, sessionId) VALUES (?, ?)', [image, sessionId], () => {
            dispatch(receiveNote({
              sessionId,
              image
            }))
            onSuccess()
          }, () => {
            onFailure()
          })
        }
      }, () => {
        onFailure()
      })
    })
  }
}

export function addAudioToNote(sessionId, audio, onSuccess, onFailure) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Notes WHERE sessionId = ?', [sessionId], (tx, rs) => {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql('UPDATE Notes SET audio = ? WHERE sessionId = ?', [audio, sessionId], () => {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              audio
            })))
            onSuccess()
          }, () => {
            onFailure()
          })
        } else {
          tx.executeSql('INSERT INTO Notes (audio, sessionId) VALUES (?, ?)', [audio, sessionId], () => {
            dispatch(receiveNote({
              sessionId,
              audio
            }))
            onSuccess()
          }, () => {
            onFailure()
          })
        }
      }, () => {
        onFailure()
      })
    })
  }
}

export function addVideoToNote(sessionId, video, onSuccess, onFailure) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Notes WHERE sessionId = ?', [sessionId], (tx, rs) => {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql('UPDATE Notes SET video = ? WHERE sessionId = ?', [video, sessionId], () => {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              video
            })))
            onSuccess()
          }, () => {
            onFailure()
          })
        } else {
          tx.executeSql('INSERT INTO Notes (video, sessionId) VALUES (?, ?)', [video, sessionId], () => {
            dispatch(receiveNote({
              sessionId,
              video
            }))
            onSuccess()
          }, () => {
            onFailure()
          })
        }
      }, () => {
        onFailure()
      })
    })
  }
}

export function deleteImageFromNote(note, onSuccess, onFailure) {
  return dispatch => {
    window.db.transaction(tx => {
      tx.executeSql('UPDATE Notes SET image = null WHERE id = ?', [note.id], () => {
        dispatch(receiveNote(Object.assign({}, note, {
          image: null
        })))
        onSuccess()
      }, onFailure)
    })
  }
}

export function fetchNoteFromSession(sessionId, onFailure) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Notes WHERE sessionId = ?', [sessionId], (tx, rs) => {
        const note = rs.rows.item(0) || {}
        dispatch(receiveNote(note))
      }, onFailure)
    })
  }
}
