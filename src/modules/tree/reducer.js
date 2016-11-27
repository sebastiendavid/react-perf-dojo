import { List, Map } from 'immutable';
import { TREE_FILL } from './events';

const initialState = new Map({
  tree: new List(),
  map: new Map(),
  total: 0
});

function treeReducer(state = initialState, { type, tree, map }) {
  switch (type) {
    case TREE_FILL:
      return state.withMutations(s => {
        if (List.isList(tree)) {
          s.set('tree', tree)
        }
        if (Map.isMap(map)) {
          s.set('map', map).set('total', map.size);
        }
      });
    default:
      return state
  }
}

export const key = 'tree';
export const reducer = treeReducer;

export function getTreeState(state) {
  return state[key];
}

export function getTree(state) {
  return getTreeState(state).get('tree');
}

export function getTotal(state) {
  return getTreeState(state).get('total');
}
