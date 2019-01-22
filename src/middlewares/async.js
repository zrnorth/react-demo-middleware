export default ({ dispatch }) => next => action => {
  // Check if the action has a promise on the payload
  // if it doesn't, pass it to next
  if (!action.payload || !action.payload.then) {
    return next(action);
  }
  // if it does, wait for it to resolve
  action.payload.then(response => {
    dispatch({
      ...action,
      payload: response
    });
  });
};
