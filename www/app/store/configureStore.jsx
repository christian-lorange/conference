import { createStore, applyMiddleware, compose } from 'redux'
import handleTransitions from 'redux-history-transitions'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'

export default function configureStore(history) {

  const logger = createLogger()

  const enhancer = compose(
      applyMiddleware(thunkMiddleware, logger),
      handleTransitions(history)
    )

  const store = createStore(
    rootReducer,
    enhancer
  )

  return store
}
