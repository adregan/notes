import Immutable from 'immutable';
import {ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, makeImmutable} from '../actions/notes';
import {STORE_USER, LOG_OUT} from '../actions/user';

const notes = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ADD_NOTE:
      var note = makeImmutable(action.note);
      return state.unshift(note);
    case UPDATE_NOTE:
      var note = makeImmutable(action.note);
      return state.set(action.index, state.get(action.index).merge(note));
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