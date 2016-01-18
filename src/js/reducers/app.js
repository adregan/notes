import { combineReducers } from 'redux'
import notes from './notes';
import user from './user';
import search from './search';
import currentNote from './currentNote';
import messages from './messages';
import key from './key';

const notesApp = combineReducers({
  notes,
  user,
  search,
  currentNote,
  messages,
  key
});

export default notesApp;

