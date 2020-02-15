// Placement UI Actions

// UI: focus tabs
export const FOCUS_GROUPS = 'FOCUS_GROUP';
export const FOCUS_MEMBERS = 'FOCUS_MEMBERS';

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
