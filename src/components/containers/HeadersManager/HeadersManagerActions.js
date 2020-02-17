export const REGISTER_HEADERS = 'REGISTER_HEADERS';
export const ASCEND_SORT = 'ASCEND_SORT';
export const DESCEND_SORT = 'DESCEND_SORT';
export const TOGGLE_ASCEND = 'TOGGLE_ASCEND';
export const SET_CURRENT_SORT = 'SET_CURRENT_SORT';


export function registerHeaders(list, sortKeys) {
  // list: string, name of list being sorted
  // sortKeys: list of strings, keys that this list can be sorted by

  // Registers new HeaderManager data with associated list name and sortKeys
  return {
    type: REGISTER_HEADERS,
    list,
    sortKeys,
  };
}

export function ascendSort(list, sortKey) {
  // list: string, name of list being sorted
  // sortKey: string, key/prop being set to ascend = true
  return {
    type: ASCEND_SORT,
    list,
    sortKey,
  };
}

export function descendSort(list, sortKey) {
  // list: string, name of list being sorted
  // sortKey: string, key/prop being set to ascend = false
  return {
    type: DESCEND_SORT,
    list,
    sortKey,
  };
}

export function toggleListAscend(list, sortKey) {
  // list: string, name of list being sorted
  // sortKey: string, key/prop being toggled
  return {
    type: TOGGLE_ASCEND,
    list,
    sortKey,
  };
}

export function setCurrentSort(list, sortKey) {
  // list: string, name of list being sorted
  // // sortKey: string, key/prop being set as currentSort
  return {
    type: SET_CURRENT_SORT,
    list,
    sortKey,
  };
}
