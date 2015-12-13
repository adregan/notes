import React from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import FancyInput from './fancyInput';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      title: '',
      body: ''
    }
  }
  handleChange(newText, title) {
    let key = title ? 'title' : 'body';
    this.setState({
      [key]: newText
    });
  }
  render() {
    let options = {
      readOnly: false,
      mode: 'markdown',
      indentUnit: 10
    };
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