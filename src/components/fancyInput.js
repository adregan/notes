import React from 'react';

class FancyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handlePaste(event) {
    event.preventDefault();
    let newText = event.clipboardData.getData('text')
                        .replace(/(\r\n|\n|\r)/gm, '')
                        .substring(0, this.props.limit);

    this.props.onChange(newText, {type: 'title'})
  }
  handleInput(event) {
    event.preventDefault();
    let newText = event.target.textContent;
    if (newText.length < this.props.limit) {
      this.props.onChange(newText, {type: 'title'})
    }
  }
  render() {
    return (
      <h2 
        className="title"
        contentEditable="true"
        onPaste={this.handlePaste}
        onInput={this.handleInput}
        dangerouslySetInnerHTML={{__html: this.props.data}}/>
    );
  }
}

export default FancyInput;