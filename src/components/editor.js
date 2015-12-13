import React from 'react';
import Codemirror from 'react-codemirror';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: 'Hello'
    }
  }
  handleChange(newText) {
    this.setState({
      text: newText
    });
  }
  render() {
    let options = {}
    return (
      <Codemirror
        value={this.state.text}
        onChange={this.handleChange}
        options={options} />
    );
  }
}

export default Editor;