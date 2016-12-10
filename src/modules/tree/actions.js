import { fromJS } from 'immutable'
import uuid from 'uuid'
import Chance from 'chance'
import { TREE_FILL, TREE_ITEM_SELECT } from './events'

const limit = 4000 - 1
let chance = new Chance()
let count = 0

function buildTreeList(level = 0,  map = {}, path = []) {
  const max = chance.integer({ min: 5, max: 20 })
  let tree = []
  for (let n = 0; n <= max && count <= limit; n++) {
    let item = buildTreeItem(level, map, [...path, n])
    tree.push(item)
    map[item.id] = item
  }
  const data = { tree, map }
  return data
}

function buildTreeItem(level = 0, map = {}, path) {
  const item = {
    id: uuid.v4(),
    label: chance.name({ prefix: true }),
    selected: false,
    level,
    path,
  }
  count += 1
  if (chance.bool() && level < 3) {
    item.children = buildTreeList(level + 1, map, path).tree
  }
  return item
}

function getDataFromStorage() {
  if (global.localStorage.data) {
    return JSON.parse(global.localStorage.data)
  }
  return false
}

export function fillTree({ force } = {}) {
  count = 0
  const { tree, map } = force ? buildTreeList() : (getDataFromStorage() || buildTreeList())
  global.localStorage.data = JSON.stringify({ tree, map })
  return { type: TREE_FILL, tree: fromJS(tree), map: fromJS(map) }
}

export function selectItemTree(path, selected) {
  return { type: TREE_ITEM_SELECT, path, selected }
}
