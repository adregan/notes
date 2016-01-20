import Immutable from 'immutable';
import {LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESS, LOG_OUT} from '../actions/login';

const loginStatus = (state = 'LOGGED_OUT', action) => {
  switch(action.type) {
    case LOGIN_ATTEMPT:
      return 'LOGGING_IN';
    case LOGIN_FAILED:
      return 'LOGGED_OUT';
    case LOGIN_SUCCESS:
      return 'LOGGED_IN';
    case LOG_OUT:
      return 'LOGGED_OUT';
    default:
      return state;
  }
}

export default loginStatus;