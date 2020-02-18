import {
  REGISTER_HEADERS,
  ASCEND_SORT,
  DESCEND_SORT,
  TOGGLE_ASCEND,
  SET_CURRENT_SORT,
  SET_SORT_FUNC,
} from './HeadersManagerActions';


const initialState = {};

const managerState = {
  currentSort: '',
  sortFunc: () => {},
  headersAscending: {},
};

export default function (state = initialState, action) {
  const { list } = action;
  const newState = {
    ...state,
  };
  switch (action.type) {
    // register new HeadersManager container
    case REGISTER_HEADERS: {
      newState[list] = managerState;
      action.sortKeys.forEach((sortKey) => {
        newState[list].headersAscending[sortKey] = true;
      });

      return newState;
    }
    // set sortKey of list to ascend
    case ASCEND_SORT:
      return {
        ...state,
        [list]: {
          ...state[list],
          headersAscending: {
            ...state[list].headersAscending,
            [action.sortKey]: true,
          },
        },
      };
    // set sortKey of list to descend
    case DESCEND_SORT:
      return {
        ...state,
        [list]: {
          ...state[list],
          headersAscending: {
            ...state[list].headersAscending,
            [action.sortKey]: false,
          },
        },
      };
    // toggle ascend of list's sortKey
    case TOGGLE_ASCEND: {
      const { sortKey } = action;
      const currentAscend = state[list].headersAscending[sortKey];
      return {
        ...state,
        [list]: {
          ...state[list],
          headersAscending: {
            ...state[list].headersAscending,
            [sortKey]: !currentAscend,
          },
        },
      };
    }
    // set new sortKey for list
    case SET_CURRENT_SORT:
      return {
        ...state,
        [list]: {
          ...state[list],
          currentSort: action.sortKey,
        },
      };

    // set new sortFunc for list
    case SET_SORT_FUNC:
      return {
        ...state,
        [list]: {
          ...state[list],
          sortFunc: action.sortFunc,
        },
      };
    default:
      return state;
  }
}
