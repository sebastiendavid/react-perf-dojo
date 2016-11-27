import { List, Map } from 'immutable';
import uuid from 'uuid';
import Chance from 'chance';
import { TREE_FILL } from './events';

const chance = new Chance();

function buildTreeList(level = 0) {
  return new List().withMutations(list => {
    const max = chance.integer({ min: 5, max: 20 });
    for (let n = 0; n <= max; n++) {
      list.push(buildTreeItem(level));
    }
  });
}

function buildTreeItem(level = 0) {
  const item = {
    id: uuid.v4(),
    label: chance.name({ prefix: true }),
    level,
  };
  if (chance.bool() && level < 4) {
    item.children = buildTreeList(level + 1);
  }
  return new Map(item);
}

export function fillTree() {
  return { type: TREE_FILL, tree: buildTreeList() };
}
