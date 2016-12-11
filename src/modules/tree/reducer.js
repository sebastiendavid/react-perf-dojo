import { List, Map } from 'immutable'
import { TREE_FILL, TREE_ITEM_SELECT } from './events'

const initialState = new Map({
  tree: new List(),
  map: new Map(),
  total: 0,
})

function updateChildren(item, selected) {
  const children = item.get('children')
  if (children && children.size) {
    return children.map(child => {
      if (child.get('selected') !== selected) {
        return child
          .set('selected', selected)
          .set('children', updateChildren(child, selected))
      }
      return child
    })
  }
  return children;
}

function getRealPath(path) {
  return ['tree'].concat(path.join('.children.').split('.'))
}

const eventsMap = {
  [TREE_FILL](state, { tree, map }) {
    return state.withMutations(state => {
      if (List.isList(tree)) {
        state.set('tree', tree)
      }
      if (Map.isMap(map)) {
        state
          .set('map', map)
          .set('total', map.size)
      }
    })
  },
  [TREE_ITEM_SELECT](state, { path, selected }) {
    const pathToItem = getRealPath(path)
    const item = state.getIn(pathToItem)
    return state.withMutations(state => {
      state.setIn(
        pathToItem,
        item
          .set('selected', selected)
          .set('children', updateChildren(item, selected))
      )
      path
        .pop()
        .reduce((list, value, index) => {
          if (index > 0) {
            return list.push(list.get(index - 1).push(value));
          }
          return list.push(new List([value]))
        }, new List())
        .reverse()
        .forEach(path => {
          const pathToParent = getRealPath(path)
          const parent = state.getIn(pathToParent)
          const children = parent.get('children');
          let status = null;
          if (children.every(child => child.get('selected') === true)) status = true
          else if (children.every(child => child.get('selected') === false)) status = false
          state.setIn(pathToParent, parent.set('selected', status))
        })
    })
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
