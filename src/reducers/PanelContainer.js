import {
  INCREMENT_MODULE,
  DECREMENT_MODULE,
} from '../actions/actionTypes';

const initialState = {
  // index of first panel to be displayed
  activeIndex: 0,
};

function updateActiveIndex(state, newIndex) {
  // pure function that returns state object with updated activeIndex
  return {
    ...state,
    activeIndex: newIndex,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREMENT_MODULE:
    case DECREMENT_MODULE:
      return updateActiveIndex(state, action.index);
    default:
      return state;
  }
}
