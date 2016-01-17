import React from 'react';
import classnames from 'classnames';

const Notes = ({ notes, onSelect, onCreate, onSearch, searchTerm}) => {
  return (
    <section className="notes">
      <form className="search" onSubmit={e => {e.preventDefault(); onCreate(searchTerm);}}>
        <input 
          placeholder="Search or Create"
          className="search__input"
          name="search"
          type="text" 
          autoComplete="off"
          value={searchTerm}
          onChange={e => onSearch(e.target.value) }/>
      </form>

      <ul className="notes-list">
        {(!notes.count()) ? 
            <li className="no-results">{!searchTerm.length ? 'No Notes' : 'No Results'}</li> :
            notes.map((note, index) => {
              let title = note.get('title');
              let classes = classnames(
                'notes-list__note',
                {'notes-list__note--unsaved': note.get('unsaved')}
              );
              return (
                <li className={classes} key={index} onClick={() => onSelect(index, title, note.get('body'))} >
                  {title}
                </li>
              )})
        }
      </ul>
    </section>
  );
}

export default Notes;