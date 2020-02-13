import {
  REQUEST_PLACEMENT,
  RECEIVE_PLACEMENT,
  INVALIDATE_PLACEMENT,
  LOAD_PLACEMENT,
  UPDATE_TITLE,
} from '../actions/actionTypes';

const initialState = {
  // data pertaining to form
  placementResponse: {},
  isFetching: false,
  didInvalidate: false,
  title: '',

  // application data
  groupIDs: [],
  allGroupsData: {},
  allGroupsUI: {},
  flaggedMembers: [],
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
