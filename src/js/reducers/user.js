import Immutable from 'immutable';
import {LOGGING_IN, STORE_USER, UPDATE_USER, LOG_OUT} from '../actions/user';

const user = (state = Immutable.Map({loggingIn: false, username: ''}), action) => {
  switch (action.type) {
    case LOGGING_IN:
      return state.set('loggingIn', !state.get('loggingIn'));
    case STORE_USER:
      return state.merge(action.user);
    case UPDATE_USER:
      return state.merge(action.data);
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

export default user;
