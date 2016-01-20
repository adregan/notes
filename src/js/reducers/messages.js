import Immutable from 'immutable';
import {ADD_MESSAGE, DISMISS_MESSAGE} from '../actions/messages';
import {LOG_OUT} from '../actions/user';
import {LOGIN_FAILED} from '../actions/login';

/*
=====================================
    DIAGRAM OF THE MESSAGES STORE
=====================================

messages: [{
  title: <string>,
  body: <string>,
  type: <string>,
  action: {
    type: <string>,
    label: <string>
  }
}...]

*/

const messages = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.push(action.message);
    case DISMISS_MESSAGE:
      return state.shift();
    case LOGIN_FAILED:
      return state.push(action.error);
    case LOG_OUT:
      state.clear();
    default:
      return state;
  }
}

export default messages;
