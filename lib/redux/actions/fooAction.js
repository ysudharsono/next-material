// actions/fooActions.js
import axios from 'axios';

export const getPosts = () => (dispatch) =>
  axios({
    method: 'GET',
    url: `https://jsonplaceholder.typicode.com/posts`,
    headers: [],
  }).then((response) => dispatch({ type: 'FOO', payload: response.data }));
