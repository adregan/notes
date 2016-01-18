import {STORE_USER} from '../actions/user';

const key = (state = {}, action) => {
  switch (action.type) {
    case STORE_USER:
      return action.key;
    default:
      return state;
  }
}

export default key;