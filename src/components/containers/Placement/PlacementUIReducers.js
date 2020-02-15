import {
  FOCUS_GROUPS,
  FOCUS_MEMBERS,
} from './PlacementUIActions';

const initialState = {
  groupFocus: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FOCUS_GROUPS:
      return {
        ...state,
        groupFocus: true,
      };
    case FOCUS_MEMBERS:
      return {
        ...state,
        groupFocus: false,
      };
    default:
      return state;
  }
}
