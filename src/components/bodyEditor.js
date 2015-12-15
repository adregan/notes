import React from 'react';

class SimpleEditor extends React.Component {
  handleChange(event) {
    this.props.onChange({key: 'body', value: event.target.value});
  }
  render() {
    return (
      <textarea
        value={this.props.value}
        onChange={this.handleChange.bind(this)}
        className={this.props.className} />
    );
  }
}

export default SimpleEditor;