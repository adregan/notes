import React from 'react';
import TitleEditor from '../components/titleEditor';
import BodyEditor from '../components/bodyEditor'

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      title: '',
      body: ''
    }
  }
  handleChange(options) {
    let key = options.key;
    this.setState({
      [key]: options.text
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log('y\'re cute, Duncan.')
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="editor">
        <div className="editor__header">
          <TitleEditor
            placeholder="Untitled"
            data={this.state.title}
            onChange={this.handleChange} 
            limit={100}
            className="editor__title" />

          <button type="submit" className="editor__button">Save</button>
        </div>
        <BodyEditor
          value={this.state.body}
          onChange={this.handleChange}
          className="editor__body" />
      </form>
    );
  }
}

export default Editor;