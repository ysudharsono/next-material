import axios from 'axios';

const prefix = 'FOO';
export const UPDATE = `${prefix}-UPDATE`;

export const getPosts = () => (dispatch) =>
  axios({
    method: 'GET',
    url: `https://jsonplaceholder.typicode.com/posts`,
    headers: [],
  }).then((response) => dispatch({ type: UPDATE, payload: response.data }));
