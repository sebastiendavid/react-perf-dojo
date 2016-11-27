import { fromJS, List } from 'immutable';
import { TREE_FILL } from './events';

const initialState = fromJS({
  tree: []
});

function treeReducer(state = initialState, action) {
  switch (action.type) {
    case TREE_FILL:
      if (List.isList(action.tree)) {
        return state.set('tree', action.tree)
      }
      return state;
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
