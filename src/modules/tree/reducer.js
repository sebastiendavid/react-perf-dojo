import { Map } from 'immutable';

const initialState = new Map();

function treeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export const key = 'tree';
export const reducer = treeReducer;
