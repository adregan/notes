import React from 'react';
import NotesList from './notes';
import Header from './header';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section ref="sidebar" className="sidebar">
        <Header 
          onSearch={this.props.onSearch} 
          onCreate={this.props.onCreate} />
        <NotesList data={this.props.notes} />
      </section>
    );
  }
}

export default Sidebar;