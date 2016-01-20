import { combineReducers } from 'redux'
import { notes, notesStatus, notesStore } from './notes';
import user from './user';
import search from './search';
import currentNote from './currentNote';
import messages from './messages';
import key from './key';
import loginStatus from './login'

const notesApp = combineReducers({
  notes,
  notesStatus,
  notesStore,
  user,
  search,
  currentNote,
  messages,
  key,
  loginStatus
});

export default notesApp;

