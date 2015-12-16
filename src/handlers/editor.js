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
  render() {
    return (
      <section className="editor">
        <div className="editor__header">
        <TitleEditor
          data={this.state.title}
          onChange={this.handleChange} 
          limit={100}
          className="editor__title" />
        </div>
        <BodyEditor
          value={this.state.body}
          onChange={this.handleChange}
          className="editor__body" />
      </section>
    );
  }
}

export default Editor;