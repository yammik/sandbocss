import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";

class Controls extends Component {
  render() {
    return (
      <div id="controls">
        <ClassNameForm addDiv={this.props.addDiv} />
        <Properties />
      </div>
    )
  }
}

export default Controls;
