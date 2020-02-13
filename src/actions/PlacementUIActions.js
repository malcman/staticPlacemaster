import {
  FOCUS_GROUPS,
  FOCUS_MEMBERS,
  SORT_FLAGGED,
  SORT_MEMBERS,
  SORT_GROUPS,
} from './actionTypes';

export function focusGroups() {
  return {
    type: FOCUS_GROUPS,
  };
}

export function focusMembers() {
  return {
    type: FOCUS_MEMBERS,
  };
}

export function sortFlagged(sortFunc) {
  return {
    type: SORT_FLAGGED,
    sortFunc,
  };
}

export function sortMembers(sortFunc) {
  return {
    type: SORT_MEMBERS,
    sortFunc,
  };
}

export function sortGroups(sortFunc) {
  return {
    type: SORT_GROUPS,
    sortFunc,
  };
}
