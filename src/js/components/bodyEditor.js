import React from 'react';
import ReactDom from 'react-dom';

class SimpleEditor extends React.Component {
  handleChange(event) {
    this.props.onChange({key: 'body', value: event.target.value});
  }
  componentDidMount() {
    ReactDom.findDOMNode(this).focus();
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