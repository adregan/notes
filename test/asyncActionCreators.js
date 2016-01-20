import Immutable from 'immutable';
import expect from 'expect';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import uuid from 'node-uuid';
import * as notes from '../src/js/actions/notes';
import kbpgp from 'kbpgp';
import * as date from '../src/js/utils/date';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const PGPMessage = '-----BEGIN PGP MESSAGE-----\
BlahblahblahblahblahBlahblahblahblahblahBlahblahblahblahblahBlah\
-----END PGP MESSAGE-----'
let key;

describe('Async Action Creators', () => {
  describe('notes', () => {
    expect.spyOn(date, 'now').andReturn('1984-10-04T11:54:19.937Z')

    const now = date.now();
    const mockIds = (new Array(20)).join(',').split(',').map((_, i) => uuid.v4());
    const mockNotes = Immutable.List(mockIds.map((id, i) => Immutable.Map({
      id: id,
      content: '',
      saved: false,
      decrypted: Immutable.Map({
        title: `Note ${i + 1}`,
        body: 'WOWOWOWOWOWOWWOWOOW',
        created: now,
        updated: now
      })
    })));

    expect.restoreSpies();
    const mockKey = {
      encrypt: function() {return new Promise((resolve, reject) => {
        return resolve(PGPMessage)
      })}
    }

    describe('selectNote()', (done) => {
      it('should create an action with the selected note', () => {
        const note = mockNotes.get(16);
        const id = note.get('id');
        const expectedActions = [{type: notes.SELECT_NOTE, note}];

        const store = mockStore({notes: mockNotes}, expectedActions, done);
        
        store.dispatch(notes.selectNote(id));
      })
    })
    describe('updateNote()', (done) => {
      it('should create an action to update a note', () => {
        const index = 8;
        const note = mockNotes.get(index);
        const id = note.get('id');

        const title = 'WOW Great Note';
        const updated = date.now();
        const changes = {title, updated};
        const update = note.setIn(['decrypted', 'title'], title)
                           .setIn(['decrypted', 'updated'], updated)

        const expectedActions = [{type: notes.UPDATE_NOTE, index, update}]

        const store = mockStore({notes: mockNotes}, expectedActions, done);

        store.dispatch(notes.updateNote(id, changes));
      })
    })
    describe('saveNote()', (done) => {
      it('should create an action to update a note after creating encrypted version', () => {
        expect.spyOn(date, 'now').andReturn('1984-10-04T11:54:19.937Z')

        const index = 7;
        const note = mockNotes.get(index);
        const id = note.get('id');

        const update = note.set('content', PGPMessage).set('saved', true)

        const expectedActions = [{ type: notes.UPDATE_NOTE, index, update }]
        const store = mockStore({notes: mockNotes, key: mockKey}, expectedActions, done);

        store.dispatch(notes.saveNote(id));
      })
    })
    describe('deleteNote()', (done) => {
      it('should create an action to delete a note', () => {
        const index = 13;
        const note = mockNotes.get(index);
        const id = note.get('id');

        const expected = [{ type: notes.DELETE_NOTE, index }]
        const store = mockStore({notes: mockNotes}, expected, done);

        store.dispatch(notes.deleteNote(id))
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

