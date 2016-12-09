import { List, Map } from 'immutable';
import uuid from 'uuid';
import Chance from 'chance';
import { TREE_FILL, TREE_ITEM_SELECT } from './events';

let chance = new Chance();

function buildTreeList(level = 0,  map = {}, path = new List()) {
  return {
    tree: new List().withMutations(list => {
      const max = chance.integer({ min: 5, max: 20 });
      for (let n = 0; n <= max; n++) {
        let item = buildTreeItem(level, map, path.push(n));
        list.push(item);
        map[item.get('id')] = item;
      }
    }),
    map,
  };
}

function buildTreeItem(level = 0, map = {}, path) {
  const item = {
    id: uuid.v4(),
    label: chance.name({ prefix: true }),
    selected: false,
    level,
    path,
  };
  if (chance.bool() && level < 3) {
    item.children = buildTreeList(level + 1, map, path).tree;
  }
  return new Map(item);
}

export function fillTree() {
  const { tree, map } = buildTreeList();
  return { type: TREE_FILL, tree, map: new Map(map) };
}

export function selectItemTree(path, selected) {
  return { type: TREE_ITEM_SELECT, path, selected };
}
