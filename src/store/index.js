import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

store.subscribe(() => console.debug('action done'))

export default store
