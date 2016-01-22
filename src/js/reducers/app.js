import { combineReducers } from 'redux'
import { notes, notesStatus, notesStore } from './notes';
import { user, userPanel} from './user';
import search from './search';
import currentNote from './currentNote';
import messages from './messages';
import { key, keyStatus } from './key';
import loginStatus from './login'

const notesApp = combineReducers({
  notes,
  notesStatus,
  notesStore,
  user,
  userPanel,
  search,
  currentNote,
  messages,
  key,
  keyStatus,
  loginStatus
});

export default notesApp;

