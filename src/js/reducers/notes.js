import Immutable from 'immutable';
import {ADD_NOTE, UPDATE_NOTE, DELETE_NOTE} from '../actions/notes';
import {STORE_USER, LOG_OUT} from '../actions/user';

const notes = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ADD_NOTE:
      return state.unshift(action.note);
    case UPDATE_NOTE:
      return state.set(action.index, action.update);
    case DELETE_NOTE:
      return state.delete(action.index);
    case STORE_USER:
      return state.push(...action.notes);
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

export default notes;