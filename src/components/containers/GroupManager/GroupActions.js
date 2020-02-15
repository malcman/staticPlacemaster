// Actions specific to Groups

// UI: group expansion toggling
export const INITIALIZE_GROUP_UI = 'INITIALIZE_GROUP_UI';
export const EXPAND_ALL_GROUPS = 'EXPAND_ALL_GROUPS';
export const HIDE_ALL_GROUPS = 'HIDE_ALL_GROUPS';
export const EXPAND_GROUP = 'EXPAND_GROUP';
export const HIDE_GROUP = 'HIDE_GROUP';

export function initializeGroups(numGroups) {
  return { type: INITIALIZE_GROUP_UI, numGroups };
}

export function expandAllGroups() {
  return { type: EXPAND_ALL_GROUPS, expanded: true };
}

export function hideAllGroups() {
  return { type: HIDE_ALL_GROUPS, expanded: false };
}

export function expandGroup(groupNum) {
  return { type: EXPAND_GROUP, index: groupNum };
}

export function hideGroup(groupNum) {
  return { type: HIDE_GROUP, index: groupNum };
}
