import React from 'react';
import classnames from 'classnames';

const Notes = ({ notes, onSelect, onSearch, searchTerm}) => {
  return (
    <section className="notes">
      <input 
        placeholder="Search"
        className="search__input"
        name="search"
        type="text"
        autoComplete="off"
        value={searchTerm}
        onChange={e => onSearch(e.target.value) }/>

      <ul className="notes-list">
        {(!notes.count()) ? 
            <li className="no-results">{!searchTerm.length ? 'No Notes' : 'No Results'}</li> :
            notes.map((note, index) => {
              let title = note.get('decrypted').get('title');
              let classes = classnames(
                'notes-list__note',
                {'notes-list__note--unsaved': !note.get('saved')}
              );
              return (
                <li className={classes} key={index} onClick={() => onSelect(index, note)} >
                  {title}
                </li>
              )})
        }
      </ul>
    </section>
  );
}

export default Notes;