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
        {/* CHANGE TO NORMAL INPUT */}
        <TitleEditor
          data={this.state.title}
          onChange={this.handleChange} 
          limit={100}
          className="title-editor" />
        <BodyEditor
          value={this.state.body}
          onChange={this.handleChange}
          className="body-editor" />
      </section>
    );
  }
}

export default Editor;