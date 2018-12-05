import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";

class Controls extends Component {
  render() {
    return (
      <div id="controls">
        <ClassNameForm addDiv={this.props.addDiv} />
        <button onClick={this.props.removeDiv}>remove selected div</button>
        <Properties addStyle={this.props.addStyle} />
      </div>
    )
  }
}

export default Controls;
