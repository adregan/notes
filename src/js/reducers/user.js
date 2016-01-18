import Immutable from 'immutable';
import {STORE_USER, UPDATE_USER, LOG_OUT} from '../actions/user';

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

const user = (state = Immutable.Map(), action) => {
  switch (action.type) {
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
