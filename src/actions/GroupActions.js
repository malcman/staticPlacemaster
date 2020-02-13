import {
  EXPAND_GROUP,
  HIDE_GROUP,
} from './actionTypes';

export function hideGroup(groupNum) {
  return { type: HIDE_GROUP, groupNum };
}

export function expandGroup(groupNum) {
  return { type: EXPAND_GROUP, groupNum };
}
