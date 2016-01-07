import React from 'react';

class App extends React.Component {
  render() {
    console.log(this)
    return (
      <div className="app-window">
        {this.props.children}
      </div>
    );
  }
}

export default App;