import {
  REQUEST_PLACEMENT,
  RECEIVE_PLACEMENT,
  INVALIDATE_PLACEMENT,
  LOAD_PLACEMENT,
  UPDATE_TITLE,
} from './PlacementActions';

const initialState = {
  // data pertaining to form
  placementResponse: {},
  isFetching: false,
  didInvalidate: false,
  title: '',

  // application data
  members: [],
  flaggedMembers: [],
  groups: [],
};

// placement data reducer
function placement(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case INVALIDATE_PLACEMENT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
      };
    case REQUEST_PLACEMENT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_PLACEMENT:
      return {
        ...state,
        placementResponse: action.data,
        isFetching: false,
        didInvalidate: false,
        members: action.data.placed,
        flaggedMembers: action.data.unplaced,
        groups: action.data.groups,
      };
    case LOAD_PLACEMENT:
      return {
        ...state,
        allGroupsData: action.allGroups,
        flaggedMembers: action.flaggedMembers,
      };
    default:
      return state;
  }
}


export default placement;
