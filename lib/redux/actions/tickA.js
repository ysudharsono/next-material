const PREFIX = 'TICK';
export const TICK = `${PREFIX}-TICK`;

export const serverRenderClock = (isServer) => (dispatch) => {
  return dispatch({
    type: TICK,
    light: !isServer,
    ts: Date.now(),
  });
};

export const startClock = () => (dispatch) => {
  return setInterval(() => dispatch({ type: TICK, light: true, ts: Date.now() }), 1000);
};
