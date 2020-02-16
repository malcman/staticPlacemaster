import {
  REQUEST_PLACEMENT,
  RECEIVE_PLACEMENT,
  INVALIDATE_PLACEMENT,
  LOAD_PLACEMENT,
  UPDATE_TITLE,
} from './PlacementActions';
import JSONData from '../../../../content/placement.json';

// development convenience
let defaultMembers = [];
let defaultFlagged = [];
let defaultGroups = [];

function getGroupAttendance(placedMembers) {
  const memberIndicesByGroup = {};
  placedMembers.forEach((member, index) => {
    const group = member.group_id;
    if (!(group in memberIndicesByGroup)) {
      memberIndicesByGroup[group] = [];
    }
    memberIndicesByGroup[group].push(index);
  });
  return memberIndicesByGroup;
}

// development convenience to bypass server populating data
if (process.env.NODE_ENV === 'development') {
  const attendance = getGroupAttendance(JSONData.placed);
  defaultMembers = JSONData.placed;
  defaultFlagged = JSONData.unplaced;
  defaultGroups = JSONData.groups.map((group) => ({
    ...group,
    members: attendance[group.group_id],
  }));
}


const initialState = {
  // data pertaining to form
  placementResponse: {},
  isFetching: false,
  didInvalidate: false,
  title: '',

  // application data
  members: defaultMembers,
  flaggedMembers: defaultFlagged,
  groups: defaultGroups,
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
    case RECEIVE_PLACEMENT: {
      // list track member indices for each group
      const attendance = getGroupAttendance(action.data.placed);
      return {
        ...state,
        placementResponse: action.data,
        isFetching: false,
        didInvalidate: false,
        members: action.data.placed,
        flaggedMembers: action.data.unplaced,
        groups: action.data.groups.map((group) => ({
          ...group,
          members: attendance[group.group_id],
        })),
      };
    }
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
