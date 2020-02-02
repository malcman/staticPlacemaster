import {
  INCREMENT_MODULE,
  DECREMENT_MODULE,
} from './actionTypes';

// action creators
export function incrementModule(index) {
  return { type: INCREMENT_MODULE, index: index + 1 };
}

export function decrementModule(index) {
  return { type: DECREMENT_MODULE, index: index - 1 };
}
