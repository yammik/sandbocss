import React, { Component } from 'react';

class Controls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="controls">
        <button onClick={this.props.addDiv}>add div</button>
      </div>
    )
  }
}

export default Controls;
