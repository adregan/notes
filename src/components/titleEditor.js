import React from 'react';

class TitleEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  handleInput(event) {
    event.preventDefault();
    let newText = event.target.value;
    if (newText.length < this.props.limit) {
      this.props.onChange({key: 'title', text: newText})
    }
  }
  render() {
    return (
      <input
        type="text" 
        placeholder={this.props.placeholder}
        className={this.props.className}
        onInput={this.handleInput.bind(this)}
        value={this.props.data}/>
    );
  }
}

export default TitleEditor;