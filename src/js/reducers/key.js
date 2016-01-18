import {STORE_USER} from '../actions/user';


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
    case STORE_USER:
      return action.key;
    default:
      return state;
  }
}

export default key;