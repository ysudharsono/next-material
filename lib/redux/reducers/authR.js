import { UPDATE } from '../actions/authA';

const reducer = (state = { user: null, token: null }, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
