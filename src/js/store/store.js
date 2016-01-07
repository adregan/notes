import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { notesApp } from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk)(createStore);

export const store = createStoreWithMiddleware(notesApp);
