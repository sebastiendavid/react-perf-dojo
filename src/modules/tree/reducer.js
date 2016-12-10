import { List, Map } from 'immutable'
import { TREE_FILL, TREE_ITEM_SELECT } from './events'

const initialState = new Map({
  tree: new List(),
  map: new Map(),
  total: 0,
})

const eventsMap = {
  [TREE_FILL](state, { tree, map }) {
    return state.withMutations(s => {
      if (List.isList(tree)) {
        s.set('tree', tree)
      }
      if (Map.isMap(map)) {
        s.set('map', map).set('total', map.size)
      }
    })
  },
  [TREE_ITEM_SELECT](state, { path, selected }) {
    const pathToItem = ['tree'].concat(path.toJS().join('.children.').split('.'))
    return state.setIn(pathToItem, state.getIn(pathToItem).set('selected', selected))
  },
}

function treeReducer(state = initialState, { type, ...opts }) {
  if (eventsMap.hasOwnProperty(type)) {
    return eventsMap[type](state, opts)
  }
  return state
}

export const key = 'tree'
export const reducer = treeReducer

export function selectTreeState(state) {
  return state[key]
}

export function selectTree(state) {
  return selectTreeState(state).get('tree')
}

export function selectTotal(state) {
  return selectTreeState(state).get('total')
}
