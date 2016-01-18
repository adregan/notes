import Immutable from 'immutable';
import {ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE} from '../actions/notes';
import {LOG_OUT} from '../actions/user';

const currentNote = (state = Immutable.Map(), action) => {
  switch(action.type) {
    case ADD_NOTE:
      return action.note.set('index', 0);
    case UPDATE_NOTE:
      return state.merge(action.note);
    case SELECT_NOTE:
      return action.note;
    case LOG_OUT:
      state.clear();
    default:
      return state;
  }
}

export default currentNote;