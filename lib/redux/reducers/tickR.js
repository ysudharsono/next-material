import { TICK } from '../actions/tickA';

export const tickInitialState = {
  lastUpdate: 0,
  light: false,
};

export default (state = tickInitialState, action) => {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    default:
      return state;
  }
};
