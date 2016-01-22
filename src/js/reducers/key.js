import {STORE_USER, LOCK_KEY, UNLOCK_KEY, LOG_OUT} from '../actions/user';
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

// TODO: because the state is a plain object, equality checks aren't
// registering changes in the store so components aren't updating
// temporarily adding a keyStatus until we can reevaluate key structure (post tests) 
export const key = (state = {manager: null, ring: null}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.key;
    case UNLOCK_KEY:
      return action.key;
    case LOCK_KEY: 
      return action.key;
    case LOG_OUT:
      return {manager: null, ring: null}
    default:
      return state;
  }
}

export const keyStatus = (state='LOCKED', action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (action.key.ring) {
        return 'UNLOCKED';
      }
      return 'LOCKED';
    case UNLOCK_KEY:
      return 'UNLOCKED';
    case LOCK_KEY: 
      return 'LOCKED';
    case LOG_OUT:
      return 'LOCKED'
    default:
      return state;
  }
}
