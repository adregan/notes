import Immutable from 'immutable';

/*ACTION TYPES*/
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';

/*ACTIONS*/
export const addMessage = ({title, body, type, action}) => {
  type = type || 'message';
  action = action || {type: 'dismiss', label: 'OK'};
  let message = Immutable.Map({title, body, type, action})

  return dispatch => {
    return dispatch({type: ADD_MESSAGE, message: message});
  }
}

export const dismissMessage = () => {
  return {type: DISMISS_MESSAGE};
}

