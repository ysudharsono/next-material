import { UPDATE } from '../actions/fooA';

const reducer = (state = { foo: '' }, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, foo: action.payload };
    default:
      return state;
  }
};

export default reducer;
