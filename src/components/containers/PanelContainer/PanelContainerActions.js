// ModuleContainer Actions
export const INCREMENT_MODULE = 'INCREMENT_MODULE';
export const DECREMENT_MODULE = 'DECREMENT_MODULE';

// action creators
export function incrementModule(index) {
  return { type: INCREMENT_MODULE, index: index + 1 };
}

export function decrementModule(index) {
  return { type: DECREMENT_MODULE, index: index - 1 };
}
