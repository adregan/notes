import Immutable from 'immutable';

/*ACTION TYPES*/
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';

/*ACTION CREATORS*/
export const addMessage = ({title, body, type, action}) => {
  type = type || 'message';
  action = action || {type: 'dismiss', label: 'OK'};
  const message = Immutable.Map({
    title: title,
    body: body,
    type: type,
    action: Immutable.Map(action)
  })

  return {type: ADD_MESSAGE, message};
}

export const dismissMessage = () => {
  return {type: DISMISS_MESSAGE};
}

