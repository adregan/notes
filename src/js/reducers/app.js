import { combineReducers } from 'redux'
import notes from './notes';
import user from './user';
import searchTerm from './searchTerm';
import currentNote from './currentNote';
import messages from './messages';
import key from './key';

const notesApp = combineReducers({
  notes,
  user,
  searchTerm,
  currentNote,
  messages,
  key
});

export default notesApp;

