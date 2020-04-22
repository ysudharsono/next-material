import { UPDATE } from '../actions/snackbarA';

const reducer = (state = { severity: 'error', message: '' }, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
