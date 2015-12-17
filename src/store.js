import { Provider } from 'react-redux';
import { createHistory } from 'history';

import notesApp from './reducers';
import { compose, createStore } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';

const store = compose(
  reduxReactRouter({
    routes,
    createHistory
  })
)(createStore)(reducer);

// import { addNote, updateNote, deleteNote } from './actions'

// // Log the initial state
// console.log(store.getState())

// // Every time the state changes, log it
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

// // Dispatch some actions
// store.dispatch(addNote('Note 1', 'blah blah blah'))
// store.dispatch(addNote('Note 2', 'blah blah blah'))
// store.dispatch(addNote('Note 3', 'blah blah blah'))
// store.dispatch(updateNote(0, 'Note 100', 'yo yo yo'))
// store.dispatch(updateNote(1, 'Note 23', 'fuck you, love you'))
// store.dispatch(deleteNote(2))

// // Stop listening to state updates
// unsubscribe()
