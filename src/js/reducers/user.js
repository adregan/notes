import Immutable from 'immutable';
import {STORE_USER, UPDATE_USER, USER_PANEL_TOGGLE, LOG_OUT} from '../actions/user';
import {LOGIN_SUCCESS} from '../actions/login';
/*
=====================================
      DIAGRAM OF THE USER STORE
=====================================

user: {
  name: <string>,
  email: <string>,
  apiToken: <string>,
  armoredKey: <string>,
  photoUrl: <string>
}

*/

export const user = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user
    case STORE_USER:
      return state.merge(action.user);
    case UPDATE_USER:
      return state.merge(Immutable.Map(action.data));
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

export const userPanel = (state = false, action) => {
  switch (action.type) {
    case USER_PANEL_TOGGLE:
      return !state
    case LOG_OUT:
      return false
    default:
      return state
  }
}
