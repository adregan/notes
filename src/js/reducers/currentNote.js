import Immutable from 'immutable';
import {ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, makeImmutable} from '../actions/notes';
import {LOG_OUT} from '../actions/user';

const currentNote = (state = Immutable.Map(), action) => {
  switch(action.type) {
    case ADD_NOTE:
      let note = makeImmutable(action.note)
      return note;
    case UPDATE_NOTE:
      let changes = makeImmutable(action.changes);
      return state.merge(changes);
    case SELECT_NOTE:
      return action.note;
    case DELETE_NOTE:
      if (state.get('id') === action.id) {
        return Immutable.Map();
      }
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

export default currentNote;