import { UPDATE } from '../actions/authA';

const reducer = (state = { token: null }, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default reducer;
