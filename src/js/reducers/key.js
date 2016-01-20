import {STORE_USER, UNLOCK_KEY} from '../actions/user';
import {LOGIN_SUCCESS} from '../actions/login';

/*
=====================================
      DIAGRAM OF THE KEY STORE
=====================================
 Key is a plain JS object/class containing 
 two Classes from the kbpgp package as well 
 as methods for encryption/decryption.

key = {
  manger: <KeyManager>,
  ring: <KeyRing>,
  create: <function>,
  unlock: <function>,
  encrypt: <function>,
  decrypt: <function>
}

*/

const key = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.key;
    case UNLOCK_KEY:
      return action.key;
    default:
      return state;
  }
}

export default key;