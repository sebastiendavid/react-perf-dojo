import { List, Map } from 'immutable';
import uuid from 'uuid';
import Chance from 'chance';
import { TREE_FILL } from './events';

let chance = new Chance();

function buildTreeList(level = 0,  map = {}) {
  return {
    tree: new List().withMutations(list => {
      const max = chance.integer({ min: 5, max: 20 });
      for (let n = 0; n <= max; n++) {
        let item = buildTreeItem(level, map);
        list.push(item);
        map[item.get('id')] = item;
      }
    }),
    map,
  };
}

function buildTreeItem(level = 0, map = {}) {
  const item = {
    id: uuid.v4(),
    label: chance.name({ prefix: true }),
    level,
  };
  if (chance.bool() && level < 3) {
    item.children = buildTreeList(level + 1, map).tree;
  }
  return new Map(item);
}

export function fillTree() {
  const { tree, map } = buildTreeList();
  return { type: TREE_FILL, tree, map: new Map(map) };
}
