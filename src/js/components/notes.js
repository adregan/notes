import React from 'react';
import classnames from 'classnames';
import { selectNote } from '../actions/notes';
import { createSearch } from '../actions/search';
import { connect } from 'react-redux';

const filterSearch = (note, searchTerm) => {
  let title = note.get('decrypted').get('title');
  if (!title) {return false;}
  return title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

const Notes = ({ notes, notesStatus, dispatch, search}) => {  
  let searchTerm = search.get('term');
  return (
    <section className="notes">
      <input 
        placeholder="Search"
        className="search__input"
        name="search"
        type="text"
        autoComplete="off"
        value={searchTerm}
        onChange={e => dispatch(createSearch(e.target.value)) }/>

      {(notesStatus === 'FETCHING_NOTES') ? <p>LOADING</p> :
      <ul className="notes-list">
        {(!notes.count()) ? 
            <li className="no-results">{!searchTerm.length ? 'No Notes' : 'No Results'}</li> :
            notes.filter(note => filterSearch(note, searchTerm)).map((note, index) => {
              let title = note.getIn(['decrypted', 'title'], 'Encrypted');
              let classes = classnames(
                'notes-list__note',
                {'notes-list__note--unsaved': !note.get('saved')}
              );
              return (
                <li className={classes} key={index} onClick={() => dispatch(selectNote(note.get('id')))} >
                  {title}
                </li>
              )})
        }
      </ul>
      }
    </section>
  );
}

function select(state) {
  return {
    notesStatus: state.notesStatus,
    notes: state.notes,
    search: state.search
  };
}

export default connect(select)(Notes);
