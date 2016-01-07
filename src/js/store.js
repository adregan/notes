import { createStore } from 'redux'
import { notesApp } from './reducers';

export const store = createStore(notesApp)

import { addNote, updateNote, deleteNote, logIn, logOut} from './actions'

// // Log the initial state
console.log(store.getState())

// // Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// // Dispatch some actions
store.dispatch(logIn({name: 'Duncan', 'publicKey': 'HI', 'apiToken': 'what'}))
store.dispatch(addNote('Note 1', 'blah blah blah'))
store.dispatch(addNote('Note 2', 'blah blah blah'))
store.dispatch(addNote('Note 3', 'blah blah blah'))
store.dispatch(updateNote(0, 'Note 100', 'yo yo yo'))
store.dispatch(updateNote(1, 'Note 23', 'fuck you, love you'))
store.dispatch(deleteNote(2))
store.dispatch(logOut())

// Stop listening to state updates
unsubscribe()
