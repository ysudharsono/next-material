const prefix = 'SNACKBAR';
export const UPDATE = `${prefix}-UPDATE`;

const proxy = ({ severity, message }) => (dispatch) => {
  dispatch({ type: UPDATE, payload: { severity, message } });
};

export default {
  success: (message) => (dispatch) => dispatch(proxy({ severity: 'success', message })),
  info: (message) => (dispatch) => dispatch(proxy({ severity: 'info', message })),
  error: (message) => (dispatch) => dispatch(proxy({ severity: 'error', message })),
  warning: (message) => (dispatch) => dispatch(proxy({ severity: 'warning', message })),
};
