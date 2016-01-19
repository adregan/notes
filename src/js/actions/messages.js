import Immutable from 'immutable';

/*ACTION TYPES*/
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';

/*ACTION CREATORS*/
export const addMessage = ({title, body, type, action}) => {
  type = type || 'message';
  action = action || {type: 'dismiss', label: 'OK'};
  let message = {title, body, type, action}

  return {type: ADD_MESSAGE, message};
}

export const dismissMessage = () => {
  return {type: DISMISS_MESSAGE};
}

