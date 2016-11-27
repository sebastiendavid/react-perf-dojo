import { fromJS } from 'immutable';
import uuid from 'uuid';
import Chance from 'chance';
import { TREE_FILL } from './events';

const chance = new Chance();

export function fillTree() {
  const tree = [];
  for (let n = 1; n <= 10; n++) {
    tree.push({ id: uuid.v4(), label: chance.name({ prefix: true }) });
  }
  return { type: TREE_FILL, tree: fromJS(tree) };
}
