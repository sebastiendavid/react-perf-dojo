import { combineReducers } from 'redux'
import * as treeReducer from '../modules/tree/reducer'

const reducers = {}

function add(module) {
  Object.assign(reducers, {
    [module.key]: module.reducer
  })
}

add(treeReducer)

export default combineReducers(reducers)
