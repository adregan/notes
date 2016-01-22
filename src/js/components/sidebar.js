import React from 'react';
import Notes from './notes';
import { createSearch } from '../actions/search';
import { addNote } from '../actions/notes';
import { connect } from 'react-redux';
import KeyManager from './keyManager';
import Logo from './logo';
import history from '../routes/history';

const Sidebar = ({ dispatch, notesStatus, search, keyStatus}) => {
  let searchTerm = search.get('term');

  return (
    <aside className="sidebar">
      <header className="header">
        <KeyManager dispatch={dispatch} keyStatus={keyStatus} />
        <Logo color="dark" className="header__logo" />
        <button 
          className="header__button header__button--create" 
          onClick={e => dispatch(addNote('Untitled'))}>Create</button>
      </header>
      <section className="notes">
        <input className="search__input"
          placeholder="Search"
          autoComplete="off"
          value={searchTerm}
          onChange={e => dispatch(createSearch(e.target.value))} />
        {(notesStatus === 'FETCHING_NOTES') ?
          <p>Loading</p> : 
          <Notes searchTerm={searchTerm} />}
      </section>     
    </aside>
  );
}

function select(state) {
  return {
    notesStatus: state.notesStatus,
    search: state.search,
    keyStatus: state.keyStatus
  };
}

export default connect(select)(Sidebar);
