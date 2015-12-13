import React from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import FancyInput from './fancyInput';

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
      <section ref="editor">
        <FancyInput
          data={this.state.title}
          onChange={this.handleChange} 
          limit={100} />
        <Codemirror
          value={this.state.body}
          onChange={this.handleChange}
          options={options} />
      </section>
    );
  }
}

export default Editor;