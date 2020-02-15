// Reducers specific to groups and group manager
import {
  INITIALIZE_GROUP_UI,
  EXPAND_ALL_GROUPS,
  HIDE_ALL_GROUPS,
  EXPAND_GROUP,
  HIDE_GROUP,
} from './GroupActions';

const initialState = {
  // list of bools indicating whether each group is expanded
  groupsExpanded: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_GROUP_UI:
      return {
        ...state,
        groupsExpanded: state.allGroups.fill(false, 0, action.numGroups),
      };
    case EXPAND_ALL_GROUPS:
    case HIDE_ALL_GROUPS:
      return {
        ...state,
        groupsExpanded: state.allGroups.fill(action.expanded),
      };
    case EXPAND_GROUP:
      return {
        ...state,
        groupsExpanded: state.groupsExpanded.map((expansion, i) => {
          if (i === action.index) {
            return expansion;
          }
          return true;
        }),
      };
    case HIDE_GROUP:
      return {
        ...state,
        groupsExpanded: state.groupsExpanded.map((expansion, i) => {
          if (i === action.index) {
            return expansion;
          }
          return false;
        }),
      };
    default:
      return state;
  }
}
