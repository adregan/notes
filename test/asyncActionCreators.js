import Immutable from 'immutable';
import expect from 'expect';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import uuid from 'node-uuid';
import * as notes from '../src/js/actions/notes';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Async Action Creators', () => {
  describe('notes', () => {
    const mockIds = (new Array(20)).join(',').split(',').map((_, i) => uuid.v4());
    const mockNotes = Immutable.List(mockIds.map((id, i) => Immutable.Map({
      id: id,
      content: '',
      saved: false,
      decrypted: {
        title: `Note ${i + 1}`,
        body: 'WOWOWOWOWOWOWWOWOOW'
      }
    })));

    describe('selectNote()', (done) => {
      it('should create an action with the selected note', () => {
        const note = mockNotes.get(16);
        const theID = note.get('id');

        const expectedActions = [{type: notes.SELECT_NOTE, note}];

        const store = mockStore(
          { notes: mockNotes },
          expectedActions,
          done
        );
        
        store.dispatch(notes.selectNote(theID));
      })
    })
    describe('updateNote()', (done) => {
      it('should create an action to update a note', () => {

      })
    })
    describe('saveNote()', (done) => {
      it('should create an action to save a note', () => {

      })
    })
    describe('deleteNote()', (done) => {
      it('should create an action to delete a note', () => {

      })
    })
  })

  describe('users', () => {
    describe('logIn()', () => {
      it('should create an action to log a user in', () => {

      })
    })
    describe('checkForCurrentSession()', () => {
      it('should create an action to check for a current session', () => {

      })
    })
    describe('storeUser()', () => {
      it('should create an action to store a user', () => {

      })
    })
    describe('unlock()', () => {
      it('should create an action to unlock a user\'s key', () => {

      })
    })
    describe('disconnect()', () => {
      it('should create an action to disconnect a user', () => {

      })
    })

  })
})

