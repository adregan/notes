/* These are synchronous action creators without side effects
*/

import expect from 'expect';
import Immutable from 'immutable';
import uuid from 'node-uuid';
import jsdom from 'jsdom-global';

import * as search from '../src/js/actions/search';
import * as messages from '../src/js/actions/messages';
import * as notes from '../src/js/actions/notes';
import * as date from '../src/js/utils/date';

describe('Action Creators', () => {
  describe('search', () => {
    describe('createSearch()', () => {
      it('should create an action to add search term', () => {
        const term = 'note 23'
        const expectedAction = {type: search.SEARCH, term}
        expect(search.createSearch(term)).toEqual(expectedAction)
      })
    })
  })
  describe('messages', () => {
    describe('addMessage()', () => {
      it('should create an action to add a message', () => {
        const title = 'greeting'
        const body = 'yo'
        const type = 'error'
        const action = {type: 'dismiss', label: 'wowow'}

        const expectedAction1 = {
          type: messages.ADD_MESSAGE,
          message: Immutable.Map({
            title: title,
            body: body,
            type: 'message',
            action: Immutable.Map({type: 'dismiss', label: 'OK'})
          })
        }
        const expectedAction2 = {
          type: messages.ADD_MESSAGE,
          message: Immutable.Map({
            title: title,
            body: body,
            type: type,
            action: Immutable.Map({type: 'dismiss', label: 'OK'})
          })
        }
        const expectedAction3 = {
          type: messages.ADD_MESSAGE, 
          message: Immutable.Map({
            title: title,
            body: body,
            type: type,
            action: Immutable.Map(action)
          })
        }

        expect(messages.addMessage({title, body})).toEqual(expectedAction1)
        expect(messages.addMessage({title, body, type})).toEqual(expectedAction2)
        expect(messages.addMessage({title, body, type, action})).toEqual(expectedAction3)
      })
    })
    describe('dismissMessage()', () => {
      it('should create an action to dismiss a message', () => {
        expect(messages.dismissMessage()).toEqual({'type': messages.DISMISS_MESSAGE})
      })
    })
  })
  describe('notes', () => {
    before(function() {
      expect.spyOn(uuid, 'v4').andReturn(123456789);
      expect.spyOn(date, 'now').andReturn('1984-10-04T11:54:19.937Z')
    });
    after(function() {
      expect.restoreSpies();
    });
    describe('addNote()', () => {
      it('should create an action to add a note', () => {
        const now = date.now();

        const note = Immutable.Map({
          id: uuid.v4(),
          saved: false,
          content: '',
          decrypted: Immutable.Map({
            title: 'Untitled',
            body: '',
            created: now,
            updated: now
          })
        })

        expect(notes.addNote()).toEqual({'type': notes.ADD_NOTE, note})
      })
    })
  })
  describe('user', () => {
    describe('updateUser()', () => {
      let UPDATE_USER;
      let updateUser;
      jsdom(() => {
        UPDATE_USER = require('../src/js/actions/user').UPDATE_USER;
        updateUser = require('../src/js/actions/user').updateUser;
      })
      it('should create an action to update a user', () => {
        const data = {username: 'hello', photoUrl: 'http://greatphoto.com/great.jpg'}
        expect(updateUser(data)).toEqual({type: UPDATE_USER, data})
      })
    })
  })
})