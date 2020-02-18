export const REGISTER_HEADERS = 'REGISTER_HEADERS';
export const ASCEND_SORT = 'ASCEND_SORT';
export const DESCEND_SORT = 'DESCEND_SORT';
export const TOGGLE_ASCEND = 'TOGGLE_ASCEND';
export const SET_CURRENT_SORT = 'SET_CURRENT_SORT';
export const SET_SORT_FUNC = 'SET_SORT_FUNC';


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

export function toggleListAscend(list, sortKey) {
  // list: string, name of list being sorted
  // sortKey: string, key/prop being toggled
  return {
    type: TOGGLE_ASCEND,
    list,
    sortKey,
  };
}

export function setListSortKey(list, sortKey) {
  // list: string, name of list being sorted
  // // sortKey: string, key/prop being set as currentSort
  return {
    type: SET_CURRENT_SORT,
    list,
    sortKey,
  };
}


export function setListSortFunc(list, sortFunc) {
  // list: string, name of list being sorted
  // // sortFunc: function used to sort list
  return {
    type: SET_SORT_FUNC,
    list,
    sortFunc,
  };
}
